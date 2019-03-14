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

    afterAll(async () => {
        DBConnection.closeConnection();
    });

    // create order 
    test("should create order" done => {
        
    })

})