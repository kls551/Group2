import DefaultController from "./default.controller";

import { NextFunction, Request, Response, Router } from "express";
import express from "express";
import multer from "multer";
import Path from "path";

import { ShopItem,Imgs } from "../entity";

import { getRepository, getConnection, Connection } from "typeorm";

export class ShopItemController extends DefaultController {
  protected initializeRoutes(): express.Router {
    const router = express.Router();
    const shopItemRepo = getRepository(ShopItem);
    const itemImgRepo = getRepository(Imgs);

    router.route("/shopitems/:id")
      .delete((req: Request, res: Response) => {
          shopItemRepo.findOneOrFail(req.params.id).then((foundItem: ShopItem) => {
            shopItemRepo.delete(foundItem).then(result => {
              res.send(200);
            });
          });
      })
      .get((req: Request, res: Response) => {
        shopItemRepo.findOneOrFail(req.params.id, {relations: ["images"]}).then((foundItem: ShopItem) => {
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
    router.route("/itemimages/:id")
      .post((req: Request, res: Response) => {
          shopItemRepo.findOneOrFail(req.params.id).then((savedShopItem: ShopItem) => {
              const img = new Imgs();
              img.img = req.body.img;
              img.ShopItem = savedShopItem;
              itemImgRepo.save(img);
              res.status(200).send({ id : savedShopItem.id })});
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
          shopitem.subcategories = req.body.subcategories;
          shopitem.postedDate = req.body.postedDate;
          shopitem.brand = req.body.brand;
          shopItemRepo.save(shopitem).then((savedShopItem: ShopItem) => {
              const img = new Imgs();
              img.img = req.body.imageUrl;
              img.ShopItem = savedShopItem;
              itemImgRepo.save(img);
              res.status(200).send({ id : savedShopItem.id});
          });
      })
      .get((req: Request, res: Response) => {
          const users =  getConnection()
          .getRepository(ShopItem)
          .createQueryBuilder("shopitem")
          .leftJoinAndSelect("shopitem.images", "imgs")
          .getMany().then(obj => {console.log(obj)
              res.status(200).send(obj);
          });
      });

    //router.route("/shopitems/:brand")
    //  .get((req: Request, res: Response) => {
    //    shopItemRepo
    //      .createQueryBuilder("shopitem")
    //      .where("brand = :abrand", { abrand: req.params.brand })
    //      .getMany().then((shopitems: ShopItem) => {
    //        res.status(200).send(shopitems);
    //      });
    //  });

    return router;
  }
}
