import DefaultController from "./default.controller";

import { NextFunction, Request, Response, Router } from "express";
import express from "express";

import { ShopItem } from "../entity";

import { getRepository } from "typeorm";

export class ShopItemController extends DefaultController {
  protected initializeRoutes(): express.Router {
    const router = express.Router();
    const shopItemRepo = getRepository(ShopItem);

    router.route("/shopitems/:id")
      .delete((req: Request, res: Response) => {
          shopItemRepo.findOneOrFail(req.params.id).then((foundItem: ShopItem) => {
            shopItemRepo.delete(foundItem).then(result => {
              res.send(200);
            });
          });
      })
      .get((req: Request, res: Response) => {
        shopItemRepo.findOneOrFail(req.params.id).then((foundItem: ShopItem) => {
          res.status(200).send(foundItem);
        });
      });

    router.route("/shopitems/:id/:qty")
        .put((req: Request, res: Response) => {
            shopItemRepo.findOneOrFail(req.params.id).then((foundItem: ShopItem) => {
                if (foundItem == undefined) {
                    return;
                }
                foundItem.quantity = req.params.qty;
                shopItemRepo.save(foundItem).then((updatedItem: ShopItem) => {
                    res.status(200).send(updatedItem);
                });
            });
        });

    router.route("/shopitems")
    .post((req: Request, res: Response) => {
        const shopitem = new ShopItem();
        shopitem.name = req.body.name;
        shopitem.details = req.body.details;
        shopitem.price = req.body.price;
        shopitem.quantity = req.body.quantity;
        shopitem.category = req.body.category;
        shopitem.inStorePickup = req.body.inStorePickup;
        shopitem.postedDate = req.body.postedDate;
        shopitem.imageUrl = req.body.imageUrl;
        shopitem.brand = req.body.brand;
        shopItemRepo.save(shopitem).then((savedShopItem: ShopItem) => {
            res.status(200).send({ shopitem });
        });
    })
    .get((req: Request, res: Response) => {
        shopItemRepo.find().then((shopitems: ShopItem[]) => {
          res.status(200).send(shopitems);
        })
    });

    return router;
}
}
