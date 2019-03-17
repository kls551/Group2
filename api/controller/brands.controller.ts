import DefaultController from "./default.controller";

import { NextFunction, Request, Response, Router } from "express";
import express from "express";

import { Session, Brands } from "../entity";

import { getRepository } from "typeorm";

export class BrandsController extends DefaultController {
  protected initializeRoutes(): express.Router {
    const router = express.Router();

    router.route("/brands")
    .get((req: Request, res: Response) => {
        const brandstRepo = getRepository(Brands);
        brandstRepo.find().then((brands: Brands[]) => {
          res.status(200).send(brands);
        });
      })
    
    .post((req: Request, res: Response) => {
        const brandstRepo = getRepository(Brands);
        const brand = new Brands();
        brand.name = req.body.name;
        brandstRepo.save(brand)
        .then((savedBrand: Brands | undefined) => {
          if (savedBrand) {
            res.status(200).send({ brand });
          } 
        },
        (err : any) => {
           res.status(400).send({ message: "duplicate brand"})
        });
      });

      router.route("/brands/:id")
      .delete((req: Request, res: Response) => {
        const brandsRepo = getRepository(Brands);
        brandsRepo.findOneOrFail(req.params.id).then((foundBrand: Brands | undefined) => {
          if (foundBrand) {
            brandsRepo.delete(foundBrand).then(result => {
              res.status(200).send({ deleted: true });
            });
          } else {
            res.status(404).send({ deleted: false});
          }
        });
      })

      .put((req: Request, res: Response) => {
        const brandsRepo = getRepository(Brands);
        brandsRepo.findOneOrFail(req.params.id).then((foundBrand: Brands | undefined) => {
          if (foundBrand) {
            foundBrand.name = req.body.name;
            brandsRepo.save(foundBrand).then(result => {
              res.status(200).send({ updated: true });
            });
          } else {
            res.status(404).send({ updated: false });
          }
        });
      });
    
    return router;
  }
}