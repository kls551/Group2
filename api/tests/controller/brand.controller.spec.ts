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

    beforeAll(async () => {
        myApp = await new Server().getMyApp();
        connection = await DBConnection.getConnection();
        await connection.synchronize();
    });

    beforeEach(async () => {
        await DBUtils.clearDB();
    });

    afterAll(async () => {
        console.log("start clearing");
        await DBUtils.clearDB();
        DBConnection.closeConnection();
    });


    describe("POST '/'", () => {
        test("should not have any brands in DB", done => {
            request(myApp)
            .get("/brands")
            .then((response: request.Response) => {
                expect(response.body).toEqual([]);
                done();
            })
        })

        test("return with the added brand", done => {
            const brand = "Scott";
            return request(myApp)
            .post("/brands")
            .send( {name: brand})
            .expect(200)
            .then((response: request.Response) => {
                expect(response.body.brand.name).toEqual(brand);
                done();
            });
        });

        test("should be duplicate brand ", done => {
            const brand = "Scott";
            return createBrand(brand, connection).then((createBrand: Brands) => {
                return request(myApp)
                  .post("/brands")
                  .send( {name: brand})
                  .expect(400)
                  .then((response: request.Response) => {
                    console.log("dup brands ", response.body);
                    // expect(
                    //   response.body && response.body.length
                    // ).toEqual(1);
                    expect(response.body.message).toEqual("duplicate brand");
                    done();
                  });
              });
        });

    });


    describe("GET '/'", () => {
        test("should not have any brands in DB", done => {
            request(myApp)
            .get("/brands")
            .then((response: request.Response) => {
                expect(response.body).toEqual([]);
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
                    console.log("all brands ", response.body);
                //   expect(
                //     response.body && response.body.length
                //   ).toEqual(1);
                  expect(response.body[0].name).toEqual(brand);
                  done();
                });
            });
        });
    });

    describe("PUT '/'", () => {
        test("should not have any brands in DB", done => {
            request(myApp)
            .get("/brands")
            .then((response: request.Response) => {
                expect(response.body).toEqual([]);
                done();
            })
        })

        test("should get 200 updated brand name ", done => {
            const brand = "BMC";
            return createBrand(brand, connection).then((createBrand: Brands) => {
                const brandId = createBrand.id;
              return request(myApp)
                .put("/brands/" + brandId)
                .expect(200)
                .then((response: request.Response) => {
                    
                  expect(response.body.updated).toEqual(true);
                  done();
                });
            });
        });
    });

    describe("DELETE '/'", () => {
        test("should not have any brands in DB", done => {
            request(myApp)
            .get("/brands")
            .then((response: request.Response) => {
                expect(response.body).toEqual([]);
                done();
            })
        })

        test("should get 200 and deleted true ", done => {
            const brand = "BMC";
            return createBrand(brand, connection).then((createBrand: Brands) => {
                const brandId = createBrand.id;
              return request(myApp)
                .delete("/brands/" + brandId)
                .expect(200)
                .then((response: request.Response) => {
                    console.log("del res ", response.body);
                  expect(response.body.deleted).toEqual(true);
                  done();
                });
            });
        });

    });
})