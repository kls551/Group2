import express from "express";
import request from "supertest";
import { Connection } from "typeorm";
import { DBConnection } from "../../connection";
import { Brands, User, MainCategory, SubCategory, ShopItem, Cart} from "../../entity";
import { Server } from "../../server";
import DBUtils from "../util/database";
import { getConnection } from "typeorm";
import { create } from "domain";

describe("/cart", () => {
    let myApp: express.Application;
    let connection: Connection;
    let user1 = 1;
    let user2 = 1;
    let item1 : ShopItem;
    let item2 : ShopItem;
    const email1 = "test@test.com";
    const email2 = "test2@test.com";
    // let brand : Brands = null;
    // let mainCat : MainCategory = undefined;
    // let subCat : SubCategory[] = [];

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
        const item = new ShopItem();
        item.name = name;
        item.price = price;
        item.details = "some bikes";
        item.quantity = quantity;
        item.inStorePickup = true;
        item.postedDate = new Date();
        
        return conn.getRepository(ShopItem).save(item);
    };

    const createBrand = (name: string, conn: Connection): Promise<Brands> => {
        const brand = new Brands();
        brand.name = name;
        return conn.getRepository(Brands).save(brand);
    };

    // const createCart = (name: string, conn: Connection): Promise<Brands> => {
    //     const cart = new Cart();
    //     cart.userId =
    //     brand.name = name;
    //     return conn.getRepository(Brands).save(brand);
    // };


    beforeAll(async () => {
        myApp = await new Server().getMyApp();
        connection = await DBConnection.getConnection();
        await connection.synchronize();
        await DBUtils.clearDB();
    });

    beforeEach(async () => {   
        // subCatId = [];
        await DBUtils.clearDB();
        await createUser(email1, connection).then((user) => {user1 = user.id});
        await createUser(email2, connection).then((user) => {user2 = user.id});
        // await createBrand("Trek", connection).then((brand) => {brandId = brand.id});
        // await createMainCat("Hybird", connection).then((mainCat) => {mainCatId = mainCat.id});
        // await createSubCat("Sport Bike", connection).then((subCat) => {subCatId.push(subCat.id)});
        await createItem("Test Bike", 1000, 20, connection).then((item) => {item1 = item});
        await createItem("Bike 2", 4444, 70, connection).then((item) => {item2 = item});
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
      
        test("return with 1 added cart ", done => {
            return createItem("Test Bike", 1000, 20, connection)
                    .then((item : ShopItem | any) => {
                        request(myApp)
                        .post("/cart")
                        .send({
                            userId: user1,
                            itemId: item.id,
                        })
                        .expect(200)
                        .then ((response: request.Response) => {
                            console.log("cart res ---------------" , response.body);
                            expect(response.body.newCart.items.length).toEqual(1);
                            expect(response.body.newCart.items[0].id).toEqual(item.id);
                            expect(response.body.newCart.user.emailAddress).toEqual(email1);
                            done();
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


    describe("GET '/'", () => {
        test("should not have any cart in DB", done => {
            request(myApp)
            .get("/cart")
            .then((response: request.Response) => {
                expect(response.body).toEqual([]);
                done();
            })
        })

        test("added cart 1", done => {
            return  request(myApp)
                        .post("/cart")
                        .send({
                            userId: user1,
                            itemId: item1.id,
                        })
                        .expect(200)
                        .then ((response: request.Response) => {
                            expect(response.body.newCart.items.length).toEqual(1);
                            expect(response.body.newCart.items[0].id).toEqual(item1.id);
                            expect(response.body.newCart.user.emailAddress).toEqual(email1);
                            done();
                        })
                    });         

        test("added cart 2", done => {
            return  request(myApp)
                        .post("/cart")
                        .send({
                            userId: user2,
                            itemId: item2.id,
                        })
                        .expect(200)
                        .then ((response: request.Response) => {
                            expect(response.body.newCart.items.length).toEqual(1);
                            expect(response.body.newCart.items[0].id).toEqual(item2.id);
                            expect(response.body.newCart.user.emailAddress).toEqual(email2);
                            done();
                        })
                    });         

        test("should return 2 cart ", done => {
            return request(myApp)
            .get("/cart")
            .expect(200)
            .then((response: request.Response) => {
                expect(
                response.body && response.body.length
                ).toEqual(2);
                // expect(response.body[0].name).toEqual(brand);
                done();
            });
        });
    });

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