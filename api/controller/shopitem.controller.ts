import DefaultController from "./default.controller";

import { NextFunction, Request, Response, Router } from "express";
import express from "express";
import multer from "multer";
import Path from "path";

import { ShopItem, MainCategory, Brands, Imgs, SubCategory } from "../entity";

import { getRepository, getConnection, Connection } from "typeorm";

export class ShopItemController extends DefaultController {
  protected initializeRoutes(): express.Router {
    const router = express.Router();
    const shopItemRepo = getRepository(ShopItem);
    const brandRepo = getRepository(Brands);
    const itemImgRepo = getRepository(Imgs);
    const subCatRepo = getRepository(SubCategory);

    router.route("/shopitems/:id")
      .delete((req: Request, res: Response) => {
          shopItemRepo.findOneOrFail(req.params.id).then((foundItem: ShopItem) => {
            shopItemRepo.delete(foundItem).then(result => {
              if (foundItem) {
                res.send(200);
              } else {
                res.status(404).send({ message: "item not found" });
              }
            });
          });
      })
      .get((req: Request, res: Response) => {
        shopItemRepo.findOneOrFail(req.params.id, {relations: ["images", "category", "subcategories", "brand"]}).then((foundItem: ShopItem | undefined) => {
          if (foundItem) {
            res.status(200).send(foundItem);
          } else {
            res.status(404).send({ message: "item not found" });
          }
        });
      })

      .put((req: Request, res: Response) => {
        const item = getRepository(ShopItem);
        item.findOneOrFail(req.params.id).then(async (foundItem: ShopItem) => {
          if (foundItem) {
            foundItem.name = req.body.name;
            foundItem.details = req.body.details;
            foundItem.price = req.body.price;
            foundItem.quantity = req.body.quantity;
            foundItem.category = req.body.category;
            foundItem.inStorePickup = req.body.inStorePickup;
            // foundItem.subcategories = await subCatRepo.findByIds(req.body.subcategories);
            foundItem.subcategories = req.body.subcategories;
            foundItem.postedDate = req.body.postedDate;
            foundItem.brand = req.body.brand;
            item.save(foundItem).then((savedShopItem: ShopItem) => {
                const img = new Imgs();
                img.img = req.body.imageUrl;
                img.ShopItem = savedShopItem;
                itemImgRepo.save(img);
                res.status(200).send({ id : savedShopItem.id});
          })
          } else {
            res.status(404).send({ message: "item not found"});
          }
        });
      });

    router.route("/shopitems/:id/:qty")
        .put((req: Request, res: Response) => {
            shopItemRepo.findOneOrFail(req.params.id).then((foundItem: ShopItem) => {
                if (foundItem == undefined) {
                    res.status(404).send({ message: "item not found" });
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
      .post(async (req: Request, res: Response) => {
          const shopitem = new ShopItem();
          shopitem.name = req.body.name;
          shopitem.details = req.body.details;
          shopitem.price = req.body.price;
          shopitem.quantity = req.body.quantity;
          shopitem.category = req.body.category;
          shopitem.inStorePickup = req.body.inStorePickup;
          // shopitem.subcategories = await subCatRepo.findByIds(req.body.subcategories);
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
        const shopItemRepo = getRepository(ShopItem);
        let query = shopItemRepo;
        if (req.query.cat_ids || req.query.brand_ids) {
          query
            .createQueryBuilder("shopitem")
            .leftJoinAndSelect("shopitem.images", "imgs")
            .innerJoinAndSelect("shopitem.brand", "brand")
            .innerJoinAndSelect("shopitem.category", "category")
            .where("category.id IN (:...cid)", { cid: req.query.cat_ids })
            .orWhere("brand.id IN (:...bid)", { bid: req.query.brand_ids })
            .getMany().then((shopitems: ShopItem[]) => {
              res.status(200).send(shopitems);
            });
        }
        else {
          const users = getConnection()
            .getRepository(ShopItem)
            .createQueryBuilder("shopitem")
            .leftJoinAndSelect("shopitem.images", "imgs")
            .leftJoinAndSelect("shopitem.brand", "brand")
            .getMany().then(obj => {console.log(obj)
                res.status(200).send(obj);
            });
        }
      });

    return router;
  }
}
