import DefaultController from "./default.controller";

import { NextFunction, Request, Response, Router } from "express";
import express from "express";

import { Session, SubCategory } from "../entity";

import { getRepository } from "typeorm";

export class SubCategoryController extends DefaultController {
  protected initializeRoutes(): express.Router {
    const router = express.Router();

    router.route("/subcategory")
    .get((req: Request, res: Response) => {
        const subCatRepo = getRepository(SubCategory);
        subCatRepo.find().then((categories: SubCategory[]) => {
          res.status(200).send(categories);
        });
      })

      .post((req: Request, res: Response) => {
        const subCatRepo = getRepository(SubCategory);
        const subCat = new SubCategory();
        subCat.name = req.body.name;
        subCat.mainCategory = req.body.mainCategory;
        subCatRepo.save(subCat).then((savedCategory: SubCategory) => {
            res.status(200).send({ subCat });
          });
        });

      return router;

    }
}