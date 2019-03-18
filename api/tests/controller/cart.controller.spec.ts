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
let user1 : User;
let user2 : User;
let user3 : User;
let item1 : ShopItem;
let item2 : ShopItem;
let item3 : ShopItem;
const email1 = "test@test.com";
const email2 = "test2@test.com";
const email3 = "test3@test.com";
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


// create shopitems 
const createItem = (
    name: string,
    price: number,
    quantity: number,
    conn: Connection
    ) => {

    const item = new ShopItem();

    item.name = "bike";
    item.price = price;
    item.details = "some bikes";
    item.quantity = quantity;
    item.inStorePickup = true;
    item.postedDate = new Date();
    
    return conn.getRepository(ShopItem).save(item);
};

const createCart = (user: User, item: ShopItem, conn: Connection): Promise<Cart> => {
    const cart = new Cart();
    cart.user = user;
    cart.items= [item];
    return conn.getRepository(Cart).save(cart);
};


beforeAll(async () => {
    myApp = await new Server().getMyApp();
    connection = await DBConnection.getConnection();
    await connection.synchronize();
    await DBUtils.clearDB();
    await createUser(email3, connection).then((user) => {user3 = user});
    await createItem("bike", 4444, 70, connection).then((item) => {item3 = item});
});

beforeEach(async () => {   
    // subCatId = [];
    await DBUtils.clearDB();
    await createUser(email1, connection).then((user) => {user1 = user});
    await createUser(email2, connection).then((user) => {user2 = user});
    await createItem("Just Bike", 1000, 20, connection).then((item) => {item1 = item});
    await createItem("Another bike", 4444, 70, connection).then((item) => {item2 = item});
    await createCart(user1, item1, connection);
    await createCart(user2, item2, connection);

});

afterAll(async () => {
    console.log("start clearing");
    DBConnection.closeConnection();
});


describe("POST '/'", () => {
    test("should not have any cart in DB", done => {
        return request(myApp)
        .get("/cart")
        .then((response: request.Response) => {
            expect(response.body.length).toEqual(2);
            done();
        });
    });

    test("return with 1 added cart ", done => {
        console.log(user3, item3);
        return request(myApp)
                .post("/cart")
                .send({
                    userId: user3.id,
                    itemId: item3.id
                })
                .expect(200)
                .then((response: request.Response) => {
                    done();
                }).catch(err => console.log(err));
            });
});


describe("GET '/'", () => {
    test("should not have any cart in DB", done => {
        request(myApp)
        .get("/cart")
        .then((response: request.Response) => {
            expect(response.body.length).toEqual(2);
            done();
        })
    }) 

    test("should return 2 cart ", done => {
        return request(myApp)
        .get("/cart")
        .expect(200)
        .then((response: request.Response) => {
            console.log("get 2 cart res ------------ ", response.body);
            expect(
            response.body && response.body.length
            ).toEqual(2);
            done();
        });
    });
});

})