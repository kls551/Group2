import express from "express";
import request from "supertest";
import { Connection } from "typeorm";
import { DBConnection } from "../../connection";
import { Brands } from "../../entity";
import { Server } from "../../server";
import DBUtils from "../util/database";
import { getConnection } from "typeorm";
import { create } from "domain";

describe("/brands", () => {
    let myApp: express.Application;
    let connection: Connection;

    const createBrand = (name: string, conn: Connection): Promise<Brands> => {
        const brand = new Brands();
        brand.name = name;
        return conn.getRepository(Brands).save(brand);
    };
    
    // beforeAll(async () => {
    //     myApp = await new Server().getMyApp();
    //     connection = await DBConnection.getConnection();
    //     await connection.synchronize();
    //     await DBUtils.clearDB();
    // });

    // beforeEach(async () => {
    //     await DBUtils.clearDB();
    // });

    // afterAll(async () => {
    //     console.log("start clearing");
    //     // await DBUtils.clearDB();
    //     DBConnection.closeConnection();
    // });



    // beforeAll(async () => {
    //     myApp = await new Server().getMyApp();
    //     connection = await DBConnection.getConnection();
    //     await connection.synchronize();
    //     await DBUtils.clearDB();
    // });

    // // beforeEach(async () => {
        
    // // });

    // afterAll(async () => {
    //     await DBUtils.clearDB();
    //     DBConnection.closeConnection();
        
    // });

    describe("GET '/'", () => {

        beforeAll(async () => {
            myApp = await new Server().getMyApp();
            connection = await DBConnection.getConnection();
            await connection.synchronize();
            await DBUtils.clearDB();
        });
    
        // beforeEach(async () => {
        //     await DBUtils.clearDB();
        // });
    
        afterAll(async () => {
            console.log("start clearing");
            // await DBUtils.clearDB();
            DBConnection.closeConnection();
        });

        test("should not have any brands in DB", done => {
            request(myApp)
            .get("/brands")
            .then((response: request.Response) => {
                expect(response.body).toEqual({ brands: []});
                done();
            })
        })
        
        test("should return one brand", done => {
            const brand = "Trek";
            return createBrand(brand, connection).then((createBrand: Brands) => {
              return request(myApp)
                .get("/brands")
                .expect(200)
                .then((response: request.Response) => {
                  expect(
                    response.body && response.body.brands.length
                  ).toEqual(1);
                  expect(response.body.brands[0].name).toEqual(brand);
                  done();
                });
            });
        });
    });

    
})
