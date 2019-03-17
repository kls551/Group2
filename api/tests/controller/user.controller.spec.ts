import express from "express";
import request from "supertest";
import { Connection } from "typeorm";
import { DBConnection } from "../../connection";
import { User } from "../../entity";
import { Server } from "../../server";
import DBUtils from "../util/database";

describe("/users", () => {
  let myApp: express.Application;
  let connection: Connection;

  const createUser = (
    emailAddress: string,
    conn: Connection
  ): Promise<User> => {
    const user = new User();
    user.emailAddress = emailAddress;
    user.firstName = "testUser";
    user.lastName = "testUser";
    user.password = "password";
    user.isAdmin = 0;
    return conn.getRepository(User).save(user);
  };

  beforeAll(async () => {
    myApp = await new Server().getMyApp();
    connection = await DBConnection.getConnection();
    await connection.synchronize();
    // await DBUtils.clearDB();
  });

  beforeEach(async () => {
    await DBUtils.clearDB();
  });

  afterAll(async () => {
    // await DBUtils.clearDB();
    DBConnection.closeConnection();
  });

  describe("GET '/'", () => {
    test("should return an empty list because there isn't anything in the database", done => {
      request(myApp)
        .get("/users")
        .then((response: request.Response) => {
          expect(response.body).toEqual([]);
          done();
        });
    });
    test("should return one user", done => {
      const email = "test@test.com";
      return createUser(email, connection).then((createdUser: User) => {
        return request(myApp)
          .get("/users")
          .expect(200)
          .then((response: request.Response) => {
            console.log("user ", response.body);
            expect(
              response.body.length
            ).toEqual(1);
            //  response.body && response.body.length
            //).toEqual(1);
            //expect(response.body[0].emailAddress).toEqual(email);

            done();
          });
      });
    });
  });

  describe("POST '/'", () => {
    test("should create a user", done => {
      return request(myApp)
        .post("/users")
        .send({
          emailAddress: "email",
          firstName: "test",
          lastName: "test",
          password: "password",
          isAdmin: 0,
        })
        .then((response: request.Response) => {
          expect(response.body.emailAddress).toEqual("email");
          done();
        });
    });
    test("should fail because user with this id does not exist", done => {
      return request(myApp)
        .post("/users/" + 85)
        .expect(500);
        done();
    });
  });
});
