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
        brandstRepo.save(brand).then((savedBrand: Brands) => {
          res.status(200).send({ brand });
        });
      });

      router.route("/brands/:id")
      .delete((req: Request, res: Response) => {
        const brandsRepo = getRepository(Brands);
        brandsRepo.findOneOrFail(req.params.id).then((foundBrand: Brands) => {
          brandsRepo.delete(foundBrand).then(result => {
            res.send(200);
          });
        });
      })

      .put((req: Request, res: Response) => {
        const brandsRepo = getRepository(Brands);
        brandsRepo.findOneOrFail(req.params.id).then((foundBrand: Brands) => {
          foundBrand.name = req.body.name;
          brandsRepo.save(foundBrand).then(result => {
            res.send(200);
          });
        });
      });
    
    return router;
  }
}