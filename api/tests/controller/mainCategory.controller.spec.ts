import express from "express";
import request from "supertest";
import { Connection } from "typeorm";
import { DBConnection } from "../../connection";
import { MainCategory } from "../../entity";
import { Server } from "../../server";
import DBUtils from "../util/database";

import { getConnection } from "typeorm";

describe("/maincategory", () => {
    let myApp: express.Application;
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
      myApp = await new Server().getMyApp();
      connection = await DBConnection.getConnection();
      await connection.synchronize();
      await DBUtils.clearDB();
    });
  
    beforeEach(async () => {
      await DBUtils.clearDB();
    });
  
    afterAll(async () => {
      DBConnection.closeConnection();
    });
  
    describe("GET '/'", () => {
      test("should return an empty list because there isn't anything in the database", done => {
        request(myApp)
          .get("/maincategory")
          .then((response: request.Response) => {
            expect(response.body).toEqual([]);
            done();
          });
      });
      test("should return one category", done => {
        const name = "Bikes";
        return createMainCat(name, connection).then((createdMainCat: MainCategory) => {
          return request(myApp)
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
        return request(myApp)
          .post("/maincategory")
          .send({
            name: mainCatName,
          })
          .then((response: request.Response) => {
            expect(response.body.mainCat.name).toEqual(mainCatName);
            done();
          });
      });
    });
  });
  