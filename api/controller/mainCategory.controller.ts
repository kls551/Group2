import DefaultController from "./default.controller";

import { NextFunction, Request, Response, Router } from "express";
import express from "express";

import { Session, MainCategory } from "../entity";

import { getRepository } from "typeorm";

export class MainCategoryController extends DefaultController {
  protected initializeRoutes(): express.Router {
    const router = express.Router();

    router.route("/maincategory")
    .get((req: Request, res: Response) => {
        const mainCatRepo = getRepository(MainCategory);
        mainCatRepo.find().then((categories: MainCategory[]) => {
          res.status(200).send(categories);
        });
      })
    
    .post((req: Request, res: Response) => {
      const mainCatRepo = getRepository(MainCategory);
      const mainCat = new MainCategory();
      mainCat.name = req.body.name;
      mainCatRepo.save(mainCat).then((savedCategory: MainCategory) => {
          res.status(200).send({ mainCat });
        });
      });
    
    return router;
  }
}