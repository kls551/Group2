import DefaultController from "./default.controller";

import { NextFunction, Request, Response, Router } from "express";
import express from "express";

import { Session, ShopItem, User, Cart } from "../entity";

import { getRepository, Connection } from "typeorm";

export class CartController extends DefaultController {
  protected initializeRoutes(): express.Router {
    const router = express.Router();

    router.route("/cart")
    .post((req: Request, res: Response) => {
      const userId = req.body.userId;
      const itemId = req.body.itemId;
      const userRepo = getRepository(User);    
      const itemRepo = getRepository(ShopItem); 
      const sessionRepo = getRepository(Session);
      const cartRepo = getRepository(Cart);
      const newCart = new Cart();

      userRepo.findOne(userId).then((user: User | any) => { 
        if (user) {
          itemRepo.findOne(itemId).then((item : ShopItem | any) => {
            const newCart = new Cart();
            newCart.items = [item]; 
            newCart.user = user;
            // newCart.items = null;
            // Connection.manager.save(newCart);
            console.log("new Cart ", newCart);
            cartRepo
            .save(newCart)
            .then((savedcart : Cart | any) => {
                console.log("saved Cart ", savedcart);
                res.status(200).send({newCart : savedcart});
            });
          });
        }
      });
    });

    router.route("/cart/:id")
    .get((req: Request, res: Response) => {
      const token = req.get("token");
      const sessionRepo = getRepository(Session);
      const itemRepo = getRepository(ShopItem);
      const userRepo = getRepository(User);        
      const userId = req.query.userId;
      const cartId = req.params.cartId;
      const cartRepo = getRepository(Cart);
     
      // check for the right user 
      // cartRepo
      //   .findOneOrFail(cartId, {relations: ["user"]})
      //   .then((foundCart : Cart) => {
      //     console.log("query id  ", userId);
      //     console.log(" ----- user ", foundCart.user);
      //     console.log(" ----- id ", foundCart.user.id);
      //     if (foundCart.user.id === userId) {
            cartRepo
            .findOneOrFail(cartId, {relations: ["items"]})
            .then((foundCart : Cart) => {
              if (foundCart) {
                console.log("found cart ", foundCart);
                res.status(200).send(foundCart.items);
              }
              else 
                res.status(404).send("Cart not found");
            });
          // }
        //   else {
        //     res.status(403).send("Permission denied");
        //   }
        // })

    })
    .put((req: Request, res: Response) => {
      // checking for the right user 
      const itemRepo = getRepository(ShopItem);
      const userRepo = getRepository(User);    
      const cartRepo = getRepository(Cart);
      const userId = req.body.userId;
      const cartId = req.params.cartId;
      const itemId = req.body.itemId;

      cartRepo
      .findOneOrFail(cartId, {relations: ["items"]})
      .then((foundCart : Cart) => {
        if (foundCart) {
          itemRepo.findOne(itemId)
          .then((item) => {
             if (foundCart && foundCart.items && item) {
              console.log("before ", foundCart.items);
              foundCart.items.push(item);
              console.log("after ", foundCart.items );
              cartRepo.save(foundCart);
              res.status(200).send(foundCart);
             }
             else {
               res.status(404).send("Item not found");
             }
          })
        }
        else 
          res.status(404).send("Cart not found");
      }); 
    })
    .delete((req: Request, res: Response) => {
      const cartRepo = getRepository(Cart);
      const itemRepo = getRepository(ShopItem);
      const cartId = req.params.cartId;

      cartRepo
      .findOneOrFail(cartId, {relations: ["items"]})
      .then((foundCart : Cart) => {
          cartRepo
          .delete(foundCart)
          .then((result) => { res.status(200).send("sucess deleted cart ") });
      });
    });

    return router;
    }
}
            
        
