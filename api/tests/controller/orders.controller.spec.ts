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

    describe("GET '/'", () => {
        test("should return an empty list because there isn't anything in the database", done => {
          request(app)
            .get("/orders")
            .then((response: request.Response) => {
              expect(response.body).toEqual([]);
              done();
            });
        });
    
    // create order 
    test("should create order", done => {
        return request(app)
            .post("/orders")
            .send({
                userId: null,
                complete: true,
                status: 0, 
                pickup: true, 
                processing: true,
                trackingNum: "123",
                address: "addr",
                city: "cty",
            })
            .then((response: request.Response) => {
                expect(response.body.trackingNum).toEqual(123);
                done();
            });
        });
    });

    // get list of orders - should have one
    test("should get list of (one) orders", done => {
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
            return  request(app)
                .get("/orders")
                .expect(200)
                .then((response: request.Response) => {
                    console.log("order ", response.body);
                    expect(
                        response.body.order && response.body.order.length
                    ).toEqual(1)
                    expect(response.body.user[0].address).toEqual("adddress");
                    done();
                });
        });
    });

    // should update the status of an order
    test("should update order status", done => {
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
                .put("orders/0/1")
                .expect(200)
                .then((response: request.Response) => {
                    expect(response.body.status).toEqual(1);
                    done();
                });
        });
    });
})