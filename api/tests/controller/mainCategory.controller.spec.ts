import express from "express";
import request from "supertest";
import { Connection } from "typeorm";
import { DBConnection } from "../../connection";
import { MainCategory } from "../../entity";
import { Server } from "../../server";
import DBUtils from "../util/database";
import { getConnection } from "typeorm";

describe("/maincategory", () => {
    let app: express.Application;
    let connection: Connection;
  
    const createMainCat = (
      name: string,
      conn: Connection
    ): Promise<MainCategory> => {
      const maincat = new MainCategory();
      maincat.name = name;
      return conn.getRepository(MainCategory).save(maincat);
    };
  
    beforeAll(async () => {
      app = await new Server().getMyApp();
      connection = getConnection();
      await connection.synchronize();
      await DBUtils.clearDB();
    });
  
    afterAll(async () => {
      await DBUtils.clearDB();
      await DBConnection.closeConnection();
    });
  
    describe("GET '/'", () => {
      test("should return an empty list because there isn't anything in the database", done => {
        request(app)
          .get("/maincategory")
          .then((response: request.Response) => {
            expect(response.body).toEqual([]);
            done();
          });
      });
      test("should return one category", done => {
        const name = "Bikes";
        return createMainCat(name, connection).then((createdMainCat: MainCategory) => {
          return request(app)
            .get("/maincategory")
            .expect(200)
            .then((response: request.Response) => {
              expect(
                response.body && response.body.length
              ).toEqual(1);
              expect(response.body[0].name).toEqual(name);
              done();
            });
        });
      });
    });
    describe("POST '/'", () => {
      test("should create a category", done => {
        const mainCatName = "Clothes";
        return request(app)
          .post("/maincategory")
          .send({
            name: mainCatName,
          })
          .expect(200)
          .then((response: request.Response) => {
            expect(response.body.name).toEqual(mainCatName);
            done();
          });
      });
    });

    test("should update category successfully", done => {
      connection.manager.insert(MainCategory, {
        id: 30,
        name: "Sale items",
        show: false
      }).then(() => {
        request(app)
          .put("/maincategory/30")
          .send({ name: "Sale"})
          .expect(200)
          .then((response: request.Response) => {
            // expect(response.body.name).toEqual("Sale");
            done();
          });
      });
    });

    test("should delete category successfully", done => {
      connection.manager.insert(MainCategory, {
        id: 31,
        name: "Sale items",
        show: false
      }).then(() => {
        request(app)
          .delete("/maincategory/31")
          .expect(200)
          .then(() => {
            // expect(response.body.name).toEqual("Sale");
            done();
          });
      });
    });
  });
