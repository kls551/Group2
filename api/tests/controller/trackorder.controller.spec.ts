import express from "express";
import request from "supertest";
import { Connection } from "typeorm";
import { DBConnection } from "../../connection";
import { Order } from "../../entity";
import { Server } from "../../server";
import DBUtils from "../util/database";
import { getConnection } from "typeorm";

describe("/orders", () => {
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

    afterAll(async () => {
        DBConnection.closeConnection();
    });

    // should get an order 
    test("gets order at specific index", done => {
        connection.manager.insert(Order, {
            complete: true,
            status: 0,
            pickup: true,
            processing: true, 
            trackingNum: "456",
            address: "address",
            city: "city"
        })
        .then(() => {
            return request(app)
                .get("/trackorder/1")
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
          .get("/announcement/" + 50)
          .expect(404)
    });

    // should delete an order
    test("should delete an order", done =>{
        connection.manager.insert(Order, {
            complete: true,
            status: 0,
            pickup: true,
            processing: true, 
            trackingNum: "456",
            address: "address",
            city: "city"
        })
        .then(() => {
            request(app)
                .delete("trackorder/1")
                .expect(200)
                done();
        });
    });
})