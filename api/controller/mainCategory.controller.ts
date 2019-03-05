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

      router.route("/maincategory/:id")
      .delete((req: Request, res: Response) => {
        const mainCat = getRepository(MainCategory);
        mainCat.findOneOrFail(req.params.id).then((foundCategory: MainCategory) => {
          mainCat.delete(foundCategory).then(result => {
            res.send(200);
          });
        });
      })

      .get((req: Request, res: Response) => {
        const mainCat = getRepository(MainCategory);
        mainCat.findOneOrFail(req.params.id).then((foundCategory: MainCategory) => {
            res.status(200).send(foundCategory);
          })
        })

      .put((req: Request, res: Response) => {
        const mainCat = getRepository(MainCategory);
        mainCat.findOneOrFail(req.params.id).then((foundCategory: MainCategory) => {
          foundCategory.name = req.body.name;
          mainCat.save(foundCategory).then(result => {
            res.send(200);
          });
        });
      });
    
    return router;
  }
}