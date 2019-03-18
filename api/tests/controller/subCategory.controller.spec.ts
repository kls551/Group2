import express from "express";
import request from "supertest";
import { Connection } from "typeorm";
import { DBConnection } from "../../connection";
import { SubCategory, MainCategory } from "../../entity";
import { Server } from "../../server";
import DBUtils from "../util/database";

import { getConnection } from "typeorm";
import { create } from "domain";

describe("/subcategory", () => {
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

  describe("POST ", () => {
    var subid = 0;
    // post subcategory
    test("should get empty", done => {
      return request(app)
        .get("/subcategory")
        .expect(200)
        .then((response: request.Response) => {
          console.log(response.body);
          expect(response.body).toEqual([]);
          done();
        });
    });

    test("posting", done => {
      return createMainCat("hello", connection).then((create : MainCategory) => {
        return request(app)
        .post("/subcategory")
        .send({name: "hello",
          mainCategoryId: create.id})
        .expect(200)
        .then((response: request.Response) => {
          console.log(response.body);
          subid = response.body.id;
          expect(response.body.name).toEqual("hello");
          done();
        });
      });
    });

    test("should get one successfully", done => {
      return request(app)
        .get("/subcategory")
        .expect(200)
        .then((response: request.Response) => {
          console.log(response.body);
          expect(response.body[0].name).toEqual("hello");
          done();
        });
    });

    test("should put one successfully", done => {
      return request(app)
        .put("/subcategory/"+subid)
        .send({name: "holaaaaa"})
        .expect(200)
        .then(() => {
          done();
        });
    });

    test("should put one successfully", done => {
      return request(app)
        .put("/subcategory/"+4000)
        .send({name: "holaaaaa"})
        .expect(404)
        .then((res : request.Response) => {
          expect(res.body).toBeDefined();
          done();
        });
    });

    test("should delete one successfully", done => {
      return request(app)
        .delete("/subcategory/"+ subid)
        .expect(200)
        .then((response: request.Response) => {
          console.log(response.body);
          expect(response.body.deleted).toEqual(true);
          done();
        });
    });

    test("error delete", done => {
      return request(app)
        .delete("/subcategory/"+ subid)
        .expect(404)
        .then((response: request.Response) => {
          console.log(response.body);
          expect(response.body.deleted).toEqual(false);
          done();
        });
    });
  });

});