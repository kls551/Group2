import express from "express";
import request from "supertest";
import { Connection } from "typeorm";
import { DBConnection } from "../../connection";
import { Announcement } from "../../entity";
import { Server } from "../../server";
import DBUtils from "../util/database";

import { getConnection } from "typeorm";

describe("/announcement", () => {
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

  // get an empty list of announcements
  test("should return an empty list because there isn't anything in the database", done => {
    request(app)
      .get("/announcement")
      .then((response: request.Response) => {
        expect(response.body).toEqual([]);
        done();
      });
  });

  // post announcement
  test("should post announcement successfully", done => {
    return request(app)
      .post("/announcement")
      .send({
        title: "Sale items",
        body: "something in the body"
      })
      .expect(200)
      .then((response: request.Response) => {
        done();
      });
  });

  // update announcement
  test("should update announcement successfully", done => {
    connection.manager.insert(Announcement, {
      title: "Sale items",
      body: "something in the body"
    }).then(() => {
      request(app)
        .put("/announcement/1")
        .send({ title: "new", body: "new body" })
        .expect(200)
        done();
    });
  });

  // update should fail because entry with this id does not exist
  test("should fail because announcement with this id does not exist", done => {
    return request(app)
      .put("/announcement/" + 85)
      .expect(404)
      .then(() => {
        done();
      }
      );
  });

  // get one announcement
  test("should return one announcement", done => {
    connection.manager.insert(Announcement, {
        title: "test title",
        body: "test body"
      }).then(() => {
      request(app)
        .get("/announcement")
        .expect(200)
        .then((response: request.Response) => {
          expect(response.body && response.body.length).toEqual(3);
          expect(response.body[0].title).toEqual("test title");
          expect(response.body[0].body).toEqual("test body");
          done();
        });
    });
  });

  // delete one announcement
  test("should delete one announcement", done => {
    connection.manager.insert(Announcement, {
        id: 100,
        title: "test title",
        body: "test body"
      }).then(() => {
      request(app)
        .delete("/announcement/100")
        .expect(200)
        .then((response: request.Response) => {
          // expect(response.body && response.body.length).toEqual(1);
          // expect(response.body.deleted.title).toEqual("test title");
          // expect(response.body.deleted.body).toEqual("test body");
          done();
        });
    });
  });

});