import DefaultController from "./default.controller";

import { NextFunction, Request, Response, Router } from "express";
import express from "express";

import { Session, SubCategory, MainCategory } from "../entity";

import { getRepository } from "typeorm";

export class SubCategoryController extends DefaultController {
  protected initializeRoutes(): express.Router {
    const router = express.Router();

    router.route("/subcategory")
    .get((req: Request, res: Response) => {
        const subCatRepo = getRepository(SubCategory);
        const mainCatRepo = getRepository(MainCategory);
        const mainCategoryId:number = parseInt(req.query.main_id, 10);
        if (mainCategoryId) {
          mainCatRepo.findOne(mainCategoryId, {relations: ["subCategories"]}).then((mainCategory: MainCategory | undefined) => {
            if (mainCategory) {
              res.status(200).send(mainCategory.subCategories);
            } else {
              res.sendStatus(404);
            }
          })
        } else {
          subCatRepo.find().then((categories: SubCategory[]) => {
            res.status(200).send(categories);
          });
        }
      })

      .post((req: Request, res: Response) => {
        const subCatRepo = getRepository(SubCategory);
        const subCat = new SubCategory();
        subCat.name = req.body.name;
        subCat.mainCategory = req.body.mainCategoryId;
        // subCat.shopitem = req.body.shopItemId;
        subCatRepo.save(subCat).then((savedCategory: SubCategory) => {
            res.status(200).send({ subCat });
          });
        })

        router.route("/subcategory/:id")
        .get((req: Request, res: Response) => {
          const subCatRepo = getRepository(SubCategory);
          subCatRepo.find({where:{ mainCategoryId: req.params.id }}).then((categories: SubCategory[]) => {
            console.log(categories);
            res.status(200).send(categories);
          });
        })

        .delete((req: Request, res: Response) => {
          const subCat = getRepository(SubCategory);
          subCat.findOneOrFail(req.params.id).then((foundCategory: SubCategory) => {
            subCat.delete(foundCategory).then(result => {
              res.send(200);
            });
          });
        })

        .put((req: Request, res: Response) => {
          const subCat = getRepository(SubCategory);
          subCat.findOneOrFail(req.params.id).then((foundCategory: SubCategory) => {
            foundCategory.name = req.body.name;
            subCat.save(foundCategory).then(result => {
              res.send(200);
            });
          });
        });

      return router;

    }
}