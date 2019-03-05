import DefaultController from "./default.controller";

import { NextFunction, Request, Response, Router } from "express";
import express from "express";

import { Session, ShopItem, User } from "../entity";

import { getRepository } from "typeorm";

export class CartController extends DefaultController {
  protected initializeRoutes(): express.Router {
    const router = express.Router();

    router.route("/cart")
    .get((req: Request, res: Response) => {
      const token = req.get("token");
      const sessionRepo = getRepository(Session);
      const items = getRepository(ShopItem);
      const users = getRepository(User);    
      const userId:User = req.query.user_id
      if(userId) {
        users.findOne(userId.id, {relations: ["cart"]}).then((user: User | undefined) => {
          if(user) {
            res.status(200).send(user.cart);
          } else {
            res.sendStatus(404);
          }
        })
      } else {
        res.sendStatus(404);
      }
    //   sessionRepo.findOne(token).then((foundSession: Session | undefined) => {
    //     const user = foundSession!.user;
    //     items.find({ where: { userId: user.id}}).then(
    //         (cart_items: ShopItem[] | undefined) => {
    //           if (cart_items) {
    //             res.status(200).send(cart_items);
    //           } else {
    //             res.sendStatus(404);
    //           }
    //         },
    //         () => {
    //           res.sendStatus(404);
    //         })
    //     })
    });

    return router;
    }
}
            
        
