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
            expect(response.body[0].isAdmin).toEqual(0);
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
          id: 20,
          emailAddress: "email",
          firstName: "test",
          lastName: "test",
          password: "password",
          isAdmin: 0,
        })
        .expect(200)
        .then((response: request.Response) => {
          expect(response.body.emailAddress).toEqual("email");
          done();
        });
    });
    test("should fail because user with this id does not exist", done => {
      return request(myApp)
        .post("/users/" + 85)
        .expect(401)
        .then(() => {
          done();
        });
    });
  });
  var tokentest = 0;
  describe("Auth ", () => {
    test("should login successfully", done => {
      connection.manager.insert(User, {
        emailAddress: "testlogin@test.com",
        firstName: "testl",
        lastName: "testl",
        password: "password"
      }).then(() => {
        request(myApp)
          .post("/login")
          .send({ emailAddress: "testlogin@test.com", password: "password" })
          .expect(200)
          .then((res: request.Response) => {
            expect(res.body.token).toBeDefined();
            tokentest = res.body.token;
            done();
          });
      });
    });
  });

  describe("PUT '/'", () => {
    test("should update a user", done => {
     return createUser("emailpul", connection).then((createdUsr: User) =>{
      return request(myApp)
      .put("/users/"+ createdUsr.id)
      .send({firstName: "haha"})
      .expect(200)
      .then(() => {
        done();
      });
    });
  });

  test("should get 404 a user", done => {
    return createUser("emailput1", connection).then((createdUsr: User) =>{
     return request(myApp)
     .put("/users/"+ 3000)
     .send({firstName: "haha"})
     .expect(404)
     .then((res: request.Response)  => {
       expect(res.text).toEqual("user not found");
       done();
     });
   });
 });

  test("should get 403 token not match", done => {
    return createUser("emailpul1", connection).then((createdUsr: User) =>{
     return request(myApp)
     .post("/users/"+ createdUsr.id)
     .set("token", "3000")
     .expect(403)
     .then(() => {
       done();
     });
   });
 });

 test("should get 401 no login", done => {
  return createUser("emailpul11", connection).then((createdUsr: User) =>{
   return request(myApp)
   .post("/users/"+ createdUsr.id)
   .expect(401)
   .then(() => {
     done();
   });
 });
});
});

describe("GET USR", () => {
  test("should get a user", done => {
    return createUser("emailgetuser", connection).then((createdUsr: User) =>{
     return request(myApp)
     .get("/users/"+ createdUsr.id)
     .expect(200)
     .then((response: request.Response) => {
       expect(response.body).toBeDefined();
       done();
     });
   });
  });
  test("should get 404 from user getting", done => {
    return createUser("emailgetuser1", connection).then((createdUsr: User) =>{
     return request(myApp)
     .get("/users/"+ 2000)
     .expect(404)
     .then((response: request.Response) => {
       done();
     });
   });
  });
})
      

  describe("DELETE '/'", () => {
    test("should delete a user", done => {
      connection.manager.insert(User, {
        id: 10,
        emailAddress: "test1@test.com",
        firstName: "test",
        lastName: "test",
        password: "password1"
      }).then(() => {
        request(myApp)
          .delete("/users/"+ 10)
          .expect(200)
          .then((res: request.Response) => {
            done();
          });
      });
    });

    test("should fail because user with this id does not exist", done => {
      return request(myApp)
        .delete("/users/" + 85)
        .expect(404)
        .then((response: request.Response) => {
          expect(response.body.name).toEqual("EntityNotFound");
          done();
        });
    });
  });
});
