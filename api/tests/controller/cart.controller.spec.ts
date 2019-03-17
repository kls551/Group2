import express from "express";
import request from "supertest";
import { Connection } from "typeorm";
import { DBConnection } from "../../connection";
import { Brands, User, MainCategory, SubCategory, ShopItem} from "../../entity";
import { Server } from "../../server";
import DBUtils from "../util/database";
import { getConnection } from "typeorm";
import { create } from "domain";

describe("/cart", () => {
    let myApp: express.Application;
    let connection: Connection;
    let userId = 1;
    const email = "test@test.com";
    let brandId = -1;
    let mainCatId = -1;
    let subCatId : number[] = [];

    // create a test user 
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

    // create main categories 
    const createMainCat = (
        name: string,
        conn: Connection
        ): Promise<MainCategory> => {
        const maincat = new MainCategory();
        maincat.name = name;
        return conn.getRepository(MainCategory).save(maincat);
    };

    // create sub categories 
    const createSubCat = (
        name: string,
        conn: Connection
        ): Promise<SubCategory> => {
        const subcat = new SubCategory();
        subcat.name = name;
        return conn.getRepository(SubCategory).save(subcat);
    };

    // create shopitems 
    const createItem = (
        name: string,
        price: number,
        quantity: number,
        conn: Connection
        ) => {
        return request(myApp)
                .post("/shopitems")
                .send({
                    name :  name,
                    price : price,
                    details: "some bikes",
                    inStorePickup : true,
                    postedDate: new Date(),
                })
    };

    const createBrand = (name: string, conn: Connection): Promise<Brands> => {
        const brand = new Brands();
        brand.name = name;
        return conn.getRepository(Brands).save(brand);
    };

    beforeAll(async () => {
        myApp = await new Server().getMyApp();
        connection = await DBConnection.getConnection();
        await connection.synchronize();
        await DBUtils.clearDB();
    });

    beforeEach(async () => {   
        await DBUtils.clearDB();
        await createUser(email, connection).then((user) => {userId = user.id});
        await createBrand("Trek", connection).then((brand) => {brandId = brand.id});
        await createMainCat("Hybird", connection).then((mainCat) => {mainCatId = mainCat.id});
        await createSubCat("Sport Bike", connection).then((subCat) => {subCatId.push(subCat.id)});
        await createItem("Test Bike", 1000, 20, connection);
    });

    afterAll(async () => {
        console.log("start clearing");
        DBConnection.closeConnection();
    });


    describe("POST '/'", () => {
        test("should not have any cart in DB", done => {
            request(myApp)
            .get("/cart")
            .then((response: request.Response) => {
                expect(response.body).toEqual([]);
                done();
            })
        })
        test("create a user ", done => {
            const email = "test@test.com";
            return createUser(email, connection).then((createdUser: User) => {
              return request(myApp)
                .get("/users")
                .expect(200)
                .then((response: request.Response) => {
                  console.log("user ", response.body);
                  expect(
                    response.body.length
                  ).toEqual(1);
                  expect(response.body.emailAddress).toEqual(email);
                  done();
                });
            });
        });


        
        test("return with 1 added cart ", done => {
            // const brand = "Scott";
            // const email = "testing@gmail.com";
            // const mainCat = "moutain bike";
            // const subCat = "hybird";
            return createItem("Test Bike", 1000, 20, connection)
                    .then((item : ShopItem | any) => {
                        request(myApp)
                        .post("/cart")
                        .send({
                            userId: userId,
                            itemId: item.id,
                        })
                        .expect(200)
                        .then ((response: request.Response) => {
                            console.log("cart res " , response.body);
                            expect(response.body.newCart.id).toEqual(1);
                            expect(response.body.newCart.user.id).toEqual(1);
                        })

                    });         
        });

        // test("should be duplicate brand ", done => {
        //     const brand = "Scott";
        //     return createBrand(brand, connection).then((createBrand: Brands) => {
        //         return request(myApp)
        //           .post("/brands")
        //           .send( {name: brand})
        //           .expect(400)
        //           .then((response: request.Response) => {
        //             console.log("dup brands ", response.body);
        //             // expect(
        //             //   response.body && response.body.length
        //             // ).toEqual(1);
        //             expect(response.body.message).toEqual("duplicate brand");
        //             done();
        //           });
        //       });
        // });

    });


    // describe("GET '/'", () => {
    //     test("should not have any brands in DB", done => {
    //         request(myApp)
    //         .get("/brands")
    //         .then((response: request.Response) => {
    //             expect(response.body).toEqual([]);
    //             done();
    //         })
    //     })

    //     test("should return one brand", done => {
    //         const brand = "Trek";
    //         return createBrand(brand, connection).then((createBrand: Brands) => {
    //           return request(myApp)
    //             .get("/brands")
    //             .expect(200)
    //             .then((response: request.Response) => {
                    
    //               expect(
    //                 response.body && response.body.length
    //               ).toEqual(1);
    //               expect(response.body[0].name).toEqual(brand);
    //               done();
    //             });
    //         });
    //     });
    // });

    // describe("PUT '/'", () => {
    //     test("should not have any brands in DB", done => {
    //         request(myApp)
    //         .get("/brands")
    //         .then((response: request.Response) => {
    //             expect(response.body).toEqual([]);
    //             done();
    //         })
    //     })

    //     test("should get 200 updated brand name ", done => {
    //         const brand = "BMC";
    //         return createBrand(brand, connection).then((createBrand: Brands) => {
    //             const brandId = createBrand.id;
    //           return request(myApp)
    //             .put("/brands/" + brandId)
    //             .expect(200)
    //             .then((response: request.Response) => {
                    
    //               expect(response.body.updated).toEqual(true);
    //               done();
    //             });
    //         });
    //     });
    // });

    // describe("DELETE '/'", () => {
    //     test("should not have any brands in DB", done => {
    //         request(myApp)
    //         .get("/brands")
    //         .then((response: request.Response) => {
    //             expect(response.body).toEqual([]);
    //             done();
    //         })
    //     })

    //     test("should get 200 and deleted true ", done => {
    //         const brand = "BMC";
    //         return createBrand(brand, connection).then((createBrand: Brands) => {
    //             const brandId = createBrand.id;
    //           return request(myApp)
    //             .delete("/brands/" + brandId)
    //             .expect(200)
    //             .then((response: request.Response) => {
    //                 console.log("del res ", response.body);
    //               expect(response.body.deleted).toEqual(true);
    //               done();
    //             });
    //         });
    //     });

    // });
})