import express from "express";
import request from "supertest";
import { Connection } from "typeorm";
import { DBConnection } from "../../connection";
import { Order } from "../../entity";
import { Server } from "../../server";
import DBUtils from "../util/database";
import { getConnection } from "typeorm";
import { doesNotReject } from "assert";

describe("/trackorder", () => {
    let app: express.Application;
    let connection: Connection;

    beforeAll(async () => {
        app = await new Server().getMyApp();
        connection = getConnection();
        await connection.synchronize();
        await DBUtils.clearDB();
    });

    beforeEach(async () => {
        await DBUtils.clearDB();
    });

    afterAll(async done => {
        DBConnection.closeConnection();
        done();
    });

    // should get an order 
    test("gets order of specific tracking number", done => {
        connection.manager.insert(Order, {
            id: 1,
            status: 0,
            pickup: true,
            address: "address",
            city: "city"
        }).then(() => {
            request(app)
                .get("/trackorder/" + 1)
                .expect(200)
                .then((response: request.Response) => {
                    expect(response.body.address).toEqual("address");
                    done();
                });
        });
    });

    // should fail to get an order
    test("should fail because announcement with this id does not exist", done => {
        return request(app)
          .get("/trackorder/" + 50)
          .expect(404, done)
    });

    // should delete an order
    test("should delete an order", done => {
        connection.manager.insert(Order, {
            id: 1,
            status: 0,
            pickup: true,
            address: "address",
            city: "city"
        })
        .then(() => {
            request(app)
                .delete("/trackorder/" + 1)
                .expect(200)
                .then(() => {
                    done();
                });
        });
    });
})