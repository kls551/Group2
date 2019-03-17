import DefaultController from "./default.controller";

import { NextFunction, Request, Response, Router } from "express";
import express from "express";

import { Session, ShopItem, User, Cart } from "../entity";

import { getRepository, Connection } from "typeorm";
import { readSync } from "fs";

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
  
            cartRepo
            .save(newCart)
            .then((savedcart : Cart | any) => {
                console.log("saved Cart ", savedcart);
                res.status(200).send({newCart : savedcart});
            });
          });
        }
      });
    })
    .get((req: Request, res: Response) => {
      const userId = req.params.userId;
      const userRepo = getRepository(User);    
      const cartRepo = getRepository(Cart);

      userRepo
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.cart", "cart")
      .getOne()
      .then((user: User | any) => { 
        console.log("user --------- ", user);
        console.log("cart --------- ", user.cart);
        if (user) {
          cartRepo.findOne(user.cart.id)
          .then((cart : Cart | any) => {
            console.log("found cart ---------- ", cart);
            if (cart)
              res.status(200).send(cart);
          });
        }
      });
    });

    router.route("/cart/:userId")
    .delete((req: Request, res: Response) => {
      const userId = req.params.userId;
      const userRepo = getRepository(User);    
      const cartRepo = getRepository(Cart);
      console.log("userId -----------", userId);
      userRepo.findOne(userId, {relations: ["cart"]}).then((user: User | any) => { 
        if (user) {
          const cartId = user.cartId;
          
          cartRepo
          .findOne(cartId)
          .then((foundCart : Cart | any) => {
            if (foundCart) {
              cartRepo.delete(foundCart)
              .then((result) => res.status(200).send("cart deleted"))
              .catch(err => res.status(400).send("cannot delete cart"))
            }
            else {
              res.status(404).send("cart not found");
            }
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
     
      cartRepo
      .findOneOrFail(cartId, {relations: ["items", "user"]})
      .then((foundCart : Cart) => {
        if (foundCart && foundCart.items) {
          foundCart.items.forEach(item => {
            itemRepo.findOneOrFail(item.id, {relations: ["images"]})
            .then(foundItem => {
              item = foundItem;
            })

          })
          console.log("foundCart ", foundCart);
          res.status(200).send(foundCart);
        }



        // if (foundCart) {
        //   res.status(200).send(foundCart.items);
        // }
        // else 
        //   res.status(404).send("Cart not found");


      });
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
    });

    return router;
    }
}
            
        
