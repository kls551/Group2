import express from "express";
import request from "supertest";
import { Connection } from "typeorm";
import { DBConnection } from "../../connection";
import { SubCategory, MainCategory } from "../../entity";
import { Server } from "../../server";
import DBUtils from "../util/database";

import { getConnection } from "typeorm";

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
    await createMainCat("this is main", connection);
  });

  afterAll(async () => {
    await DBUtils.clearDB();
    await DBConnection.closeConnection();
  });

  describe("POST ", () => {
    // post subcategory
    test("should post subcategory successfully", done => {
      return request(app)
        .get("/subcategory")
        .expect(200)
        .then((response: request.Response) => {
          console.log(response.body);
          done();
        });
    });
  });

});