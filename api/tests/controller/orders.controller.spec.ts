import express from "express";
import request from "supertest";
import { Connection } from "typeorm";
import { DBConnection } from "../../connection";
import { Order, User, Session } from "../../entity";
import { Server } from "../../server";
import DBUtils from "../util/database";
import { getConnection } from "typeorm";

describe("/orders", () => {
    let app: express.Application;
    let connection: Connection;

    const createUser = (
        emailAddress: string,
        conn: Connection
      ): Promise<User> => {
        const user = new User();
        user.emailAddress = emailAddress;
        user.firstName = "testUser";
        user.lastName = "testUser";
        user.password = "password";
        user.isAdmin = 0;
        return conn.getRepository(User).save(user);
      };
    

    const createSession = (
        conn: Connection
      ): Promise<Session> => {
        const user = createUser("test@test.com", connection);
        const session = new Session();
        session.expiresAt = new Date("2020-04-03");
        createUser("test@hi.com", connection).then(res => {
            session.user = res;
        });
        return conn.getRepository(Session).save(session);
      };

    beforeAll(async () => {
        app = await new Server().getMyApp();
        connection = getConnection();
        await connection.synchronize();
        await DBUtils.clearDB();
    });

    beforeEach(async () => {
        await DBUtils.clearDB();
        createSession(connection);
    });

    afterAll(async () => {
        DBConnection.closeConnection();
    });

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
                userId: 1,
                pickup: null,
                orderedDate: new Date("2020-01-01"),
                address: "addr",
                city: "cty",
                complete: true,
                status: 0, 
                processing: true,
                shipped: null,
                trackingNum: "123"
            })
            .then((response: request.Response) => {
                console.log("order ", response.body);
                expect(response.body.savedOrder.address).toEqual("addr");
                done();
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
            request(app)
                .get("/orders")
                .expect(200)
                .then((response: request.Response) => {
                    console.log("order ", response.body);
                    expect(
                        response.body && response.body.length
                    ).toEqual(1)
                    expect(response.body[0].address).toEqual("address");
                    done();
                });
        });
    });

    // should update the status of an order
    test("should update order status", done => {
        connection.manager.insert(Order, {
            id: 1,
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
                .put("/orders/1/2")
                .expect(200)
                .then((response: request.Response) => {
                    console.log("order ", response.body);
                    expect(response.body.status).toEqual("1");
                    done();
                });
        });
    });

     // should fail to update the status of an order
     test("tries to update status of nonexistent order", done => {
        connection.manager.insert(Order, {
            id: 1,
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
                .put("/orders/12/1")
                .expect(404, done)
        });
    });
})