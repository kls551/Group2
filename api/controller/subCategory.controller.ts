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
        subCatRepo.save(subCat).then(
          (savedCategory: SubCategory) => {
            res.status(200).send({ subCat });
          },
          (reason: any) => {
            res.status(500);
          });
        });

        router.route("/subcategory/:id")
        // .get((req: Request, res: Response) => {
        //   const subCatRepo = getRepository(SubCategory);
        //   subCatRepo.find({where:{ mainCategoryId: req.params.id }}).then((categories: SubCategory[] | undefined) => {
        //     if (categories){
        //       res.status(200).send(categories);
        //     } else {
        //       res.status(404);
        //     }    
        //   });
        // })

        .delete((req: Request, res: Response) => {
          const subCat = getRepository(SubCategory);
          subCat.findOneOrFail(req.params.id).then((foundCategory: SubCategory | undefined) => {
            if (foundCategory){
              subCat.delete(foundCategory).then(result => {
                res.status(200).send({ deleted: true});
              })
            } else {
              res.status(404).send({ deleted: false});
            }
          });
        })

        .put((req: Request, res: Response) => {
          const subCat = getRepository(SubCategory);
          subCat.findOneOrFail(req.params.id).then((foundCategory: SubCategory | undefined) => {
            if (foundCategory){
              foundCategory.name = req.body.name;
              subCat.save(foundCategory).then(result => {
              res.send(200);
            })
            } else {
              res.sendStatus(404).send("subcat not found");
            }
          });
        });

      return router;

    }
}
