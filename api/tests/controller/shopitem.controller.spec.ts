import express from "express";
import request from "supertest";
import { Connection } from "typeorm";
import { DBConnection } from "../../connection";
import { ShopItem, MainCategory } from "../../entity";
import { Server } from "../../server";
import DBUtils from "../util/database";

import { getConnection } from "typeorm";

describe("/shopitems", () => {
  let app: express.Application;
  let connection: Connection;

  const createShopItem = (
    name: string,
    conn: Connection
  ): Promise<ShopItem> => {
    const item = new ShopItem();
    item.id = 1;
    item.name = name;
    item.details = "test";
    item.price = 1;
    item.quantity = 1;
    item.inStorePickup = true;
    item.postedDate = new Date();
    return conn.getRepository(ShopItem).save(item);
  };

  beforeAll(async () => {
    app = await new Server().getMyApp();
    connection = getConnection();
    await connection.synchronize();
  });

  beforeEach(async () => {
    await DBUtils.clearDB();
  });

  afterAll(async () => {
    await DBConnection.closeConnection();
  });

  describe("GET '/'", () => {
    test("should return an empty list because there isn't anything in the database", done => {
      request(app)
        .get("/shopitems")
        .then((response: request.Response) => {
          expect(response.body).toEqual([]);
          done();
        });
    });
    test("should return one shop item", done => {
      const name = "testbike";
      return createShopItem(name, connection).then((createdShopItem: ShopItem) => {
        return request(app)
          .get("/shopitems")
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
    test("should return one shop item by id", done => {
      const name = "testgetbyid";
      return createShopItem(name, connection).then(() => {
        request(app)
          .get("/shopitems/1")
          .then((response: request.Response) => {
            expect(response.body.name).toEqual("testgetbyid");
            done();
          });
      });
    });
    // Test get with category or brand id query

  });

  describe("POST '/'", () => {
  
  });
});
