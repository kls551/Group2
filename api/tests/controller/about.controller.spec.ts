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

    // get hours should fail because database empty
    test("should return an empty list because there isn't anything in the database", done => {
    request(app)
        .get("/about")
        .then((response: request.Response) => {
        expect(response.body).toEqual([]);
        done();
        });
    });

    // create about 
    test("should create an about entry", done => {
    return request(app)
        .post("/about")
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
        sunday: "sun"
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
})
