import express from "express";
import request from "supertest";
import { Connection } from "typeorm";
import { DBConnection } from "../../connection";
import { About } from "../../entity";
import { Server } from "../../server";
import DBUtils from "../util/database";
import { getConnection } from "typeorm";

describe("/about", () => {
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
        // get hours should fail because database empty
        test("should return an error because there isn't anything in the database", done => {
            request(app)
                .get("/about")
                .expect(404, done)
                
        });

        // should get hours
        test("should get hours", done => {
            connection.manager.insert(About, {
                address: "addr",
                email: "em",
                phone: "phone",
                monday: "mon",
                tuesday: "tues",
                wednesday: "wed",
                thursday: "ths",
                friday: "fri",
                saturday: "sat",
                sunday: "sun",
                profileUrl: "pic"
            })
            .then(() => {
            return request(app)
                .get("/about")
                .expect(200)
                .then((response: request.Response) => {
                    expect(response.body.address).toEqual("addr");
                    done();
                });
            });
        });
    });
    
    describe("PUT '/'", () => {
        // fail to update about 
        test("should fail to update an about entry", done => {
            return request(app)
                .put("/about")
                .send({
                    address: "addr",
                    email: "em",
                    phone: "phone",
                    monday: "mon",
                    tuesday: "tues",
                    wednesday: "wed",
                    thursday: "ths",
                    friday: "fri",
                    saturday: "sat",
                    sunday: "sun"
                })
                .expect(404, done)
        });

        // update about 
        test("should update an about entry", done => {
            connection.manager.insert(About, {
                id: 1,
                address: "ad",
                email: "e",
                phone: "ph",
                monday: "mn",
                tuesday: "ts",
                wednesday: "wd",
                thursday: "th",
                friday: "fr",
                saturday: "st",
                sunday: "sn",
                profileUrl: "pic"
            })
            .then(() => {
                request(app)
                    .put("/about")
                    .send({
                        address: "addr",
                        email: "em",
                        phone: "phone",
                        monday: "mon",
                        tuesday: "tues",
                        wednesday: "wed",
                        thursday: "ths",
                        friday: "fri",
                        saturday: "sat",
                        sunday: "sun"
                    })
                    .expect(200)
                    .then(() => {
                        done();
                    });
            });
        });

    });

    describe("POST '/'", () => {
        test("should fail to post image", done => {
            request(app)
                .post("/about")
                .expect(500)
                .then(() => {
                    done();
                });
        });
    });
   
})
