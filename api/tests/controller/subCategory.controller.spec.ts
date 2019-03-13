import express from "express";
import request from "supertest";
import { Connection } from "typeorm";
import { DBConnection } from "../../connection";
import { SubCategory } from "../../entity";
import { Server } from "../../server";
import DBUtils from "../util/database";

import { getConnection } from "typeorm";

describe("/subcategory", () => {
  let app: express.Application;
  let connection: Connection;

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

  // post subcategory
  test("should post subcategory successfully", done => {
    return request(app)
      .post("/subcategory")
      .send({
        name: "mountain",
        mainCategoryId: 1
      })
      .expect(200)
      .then((response: request.Response) => {
        expect(response.body.name).toEqual("mountain");
        done();
      });
  });

});