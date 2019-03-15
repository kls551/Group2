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
        mainCatRepo.find({relations: ["subCategories"]}).then((categories: MainCategory[]) => {
          res.status(200).send(categories);
        });
      })

    .post((req: Request, res: Response) => {
      const mainCatRepo = getRepository(MainCategory);
      const mainCat = new MainCategory();
      mainCat.name = req.body.name;
      mainCat.show = false;
      mainCatRepo.save(mainCat).then((savedCategory: MainCategory) => {
          res.status(200).send( savedCategory );
        });
      });

      router.route("/maincategory/:id")
      .delete((req: Request, res: Response) => {
        const mainCat = getRepository(MainCategory);
        mainCat.findOneOrFail(req.params.id).then((foundCategory: MainCategory) => {
          if (foundCategory){
            mainCat.delete(foundCategory).then(result => {
              res.status(200).send({ deleted: true});
            })
          } else {
            res.status(404).send({ deleted: false });
          }
          
        });
      })

      .get((req: Request, res: Response) => {
        const mainCat = getRepository(MainCategory);
        mainCat.findOneOrFail(req.params.id).then((foundCategory: MainCategory | undefined) => {
          if (foundCategory){
            res.status(200).send(foundCategory);
          } else {
            res.status(404).send({ message: "category not found"});
          } 
          })
        })

      .put((req: Request, res: Response) => {
        const mainCat = getRepository(MainCategory);
        mainCat.findOneOrFail(req.params.id).then((foundCategory: MainCategory) => {
          if (foundCategory) {
            foundCategory.name = req.body.name;
            mainCat.save(foundCategory).then(result => {
            res.send(200);
          })
          } else {
            res.status(404).send({ message: "category not found"});
          }
        });
      });

    return router;
  }
}
