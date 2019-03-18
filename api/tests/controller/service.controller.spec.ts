import express from "express";
import request from "supertest";
import { Connection } from "typeorm";
import { DBConnection } from "../../connection";
import { Service } from "../../entity";
import { Server } from "../../server";
import DBUtils from "../util/database";
import { getConnection } from "typeorm";

describe("/owner/edit-services", () => {
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
        // get service should fail because database empty
        test("should fail to get service", done => {
            request(app)
                .get("/owner/edit-services")
                .then((response: request.Response) => {
                    expect(response.body).toEqual([]);
                    done();
                });      
        });

        // get list of services - should have one
        test("should get list of (one) services", done => {
            connection.manager.insert(Service, {
                serviceName: "serv",
                description: "desc",
                price: 200
            })
            .then(() => {
                request(app)
                    .get("/owner/edit-services")
                    .expect(200)
                    .then((response: request.Response) => {
                        console.log("order ", response.body);
                        expect(
                            response.body && response.body.length
                        ).toEqual(1)
                        expect(response.body[0].serviceName).toEqual("serv");
                        done();
                    });
            });
        });

    });
    
    describe("PUT '/'", () => {
        // fail to edit service
        test("should fail to update a service because none in database", done => {
            return request(app)
                .put("/owner/edit-services/50")
                .send({ price: 300})
                .expect(400)
                .then(() => {
                    done();
                });
        });

        // edit service
        test("should update a service", done => {
            connection.manager.insert(Service, {
                id: 1,
                serviceName: "serv",
                description: "desc",
                price: 200
            })
            .then(() => {
                request(app)
                    .put("/owner/edit-services/1")
                    .send({ price: 300})
                    .expect(200)
                    .then(() => {
                        done();
                    });
            });
        });

    });

    describe("DELETE '/'", () => {
        // should fail to delete an order
        test("should delete an order", done => {
            return request(app)
                    .delete("/owner/edit-services/" + 20)
                    .expect(400)
                    .then(() => {
                        done();
                    });
        });

        // should delete an order
        test("should delete an order", done => {
            connection.manager.insert(Service, {
                id: 1,
                serviceName: "serv",
                description: "desc",
                price: 200
            })
            .then(() => {
                request(app)
                    .delete("/owner/edit-services/" + 1)
                    .expect(200)
                    .then(() => {
                        done();
                    });
            });
        });
    });
   
    describe("POST '/'", () => {
        // create service
        test("should create service", done => {
            return request(app)
                .post("/owner/edit-services")
                .send({
                    id: 1,
                    serviceName: "service",
                    description: "descrip",
                    price: 200
                })
                .expect(200)
                .then((response: request.Response) => {
                    console.log("order ", response.body);
                    expect(response.body.createdService.description).toEqual("descrip");
                    done();
                });
        });

        // fail to create service
        test("should fail to create service", done => {
            return request(app)
                .post("/owner/edit-services")
                .send({
                    id: 1,
                    price: 200
                })
                .expect(500)
                .then(() => {
                    done();
                });
        });
    });
})
