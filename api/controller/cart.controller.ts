import DefaultController from "./default.controller";

import { NextFunction, Request, Response, Router } from "express";
import express from "express";

import { Session, ShopItem, User, Cart } from "../entity";

import { getRepository, Connection } from "typeorm";
import { readSync } from "fs";
import { resolveSoa } from "dns";

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
                res.status(200).send({newCart : savedcart});
            });
          });
        }
      });
    })
    .get((req: Request, res: Response) => {
      const cartRepo = getRepository(Cart);
      cartRepo
      .find()
      .then((carts : Cart[]) => {
        res.status(200).send(carts);
      })
      .catch((err: any) => {
        res.status(500).send(err);
      })
    })

    router.route("/cart/:id")
    .get((req: Request, res: Response) => {
      const itemRepo = getRepository(ShopItem);
      const cartId = req.params.id;
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
          res.status(200).send(foundCart);
        }
      });
    })
    .put((req: Request, res: Response) => {
      const itemRepo = getRepository(ShopItem);
      const cartRepo = getRepository(Cart);
      const cartId = req.params.cartId;
      const itemId = req.body.itemId;

      cartRepo
      .findOneOrFail(cartId, {relations: ["items"]})
      .then((foundCart : Cart) => {
        if (foundCart) {
          itemRepo.findOne(itemId)
          .then((item) => {
             if (foundCart && foundCart.items && item) {
              foundCart.items.push(item);
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
      const cartId = req.params.id;
      const cartRepo = getRepository(Cart);

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

    });

    return router;
    }
}
            
        
