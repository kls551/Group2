import express from "express";
import request from "supertest";
import { Connection } from "typeorm";
import { DBConnection } from "../../connection";
import { ShopItem, MainCategory, SubCategory, Brands, Imgs } from "../../entity";
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

  // const createItemImage = (
  //   imgurl: string,
  //   conn: Connection
  // ): Promise<Imgs> => {
  //   const image = new Imgs();
  //   image.id = 9;
  //   image.img = imgurl;
  //   return conn.getRepository(Imgs).save(image);
  // };

  const createMainCat = (
    name: string,
    conn: Connection
  ): Promise<MainCategory> => {
    const cat = new MainCategory();
    cat.id = 2;
    cat.name = name;
    cat.show = false;
    return conn.getRepository(MainCategory).save(cat);
  };

  const createSubCat = (
    name: string,
    conn: Connection
  ): Promise<SubCategory> => {
    const subcat = new SubCategory();
    subcat.id = 3;
    subcat.name = name;
    return conn.getRepository(SubCategory).save(subcat);
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
  });

  describe("POST '/'", () => {
    // Testing post a shop item
    test("should create a shop item", done => {
      //createSubCat("Mountain", connection);
      const itemname = "testpostshopitem";
      return request(app)
        .post("/shopitems")
        .send({
          id: 500,
          name: "testpostshopitem",
          details: "details",
          price: 200,
          quantity: 30,
          inStorePickup: true,
          postedDate: new Date()
        })
        .expect(200)
        .then((response: request.Response) => {
          done();
        });
      done();
    });

    // Testing post an item image
    test("should add an item image", done => {
      return request(app)
        .post("/itemimages/9")
        .send({
          id: 9,
          img: "testpostitemimage",
          ShopItem: new ShopItem()
        })
        .expect(200)
        .then((response: request.Response) => {
          done();
        });
    });
  });

  describe("PUT '/'", () => {
    // Testing update shop item
    test("should update shop item", done => {
      connection.manager.insert(ShopItem, {
        id: 20,
        name: "testputitem",
        details: "details",
        price: 200,
        quantity: 30,
        inStorePickup: true,
        postedDate: new Date()
      }).then(() => {
        request(app)
          .put("/shopitems/20")
          .send({ name: "altered" })
          .expect(200)
          .then((response: request.Response) => {
            expect(response.body.id).toEqual(20);
            done();
          });
      });
    });

    // Testing update shop item quantity
    test("should update shop item quantity", done => {
      connection.manager.insert(ShopItem, {
        id: 20,
        name: "testputitemquantity",
        details: "details",
        price: 200,
        quantity: 30,
        inStorePickup: true,
        postedDate: new Date()
      }).then(() => {
        request(app)
          .put("/shopitems/20/2")
          .send({ quantity: 2 })
          .expect(200)
          .then((response: request.Response) => {
            expect(response.body.quantity).toEqual("2");
            done();
          });
      });
    });
  });

  describe("DELETE '/'", () => {
    test("should delete shop item successfully", done => {
      connection.manager.insert(ShopItem, {
        id: 500,
        name: "testdeleteitem",
        details: "details",
        price: 200,
        quantity: 30,
        inStorePickup: true,
        postedDate: new Date(),
        images: []
      }).then(() => {
        request(app)
          .delete("/shopitems/500")
          .expect(200)
          .then(() => {
            done();
          });
      });
    });
  });
});
