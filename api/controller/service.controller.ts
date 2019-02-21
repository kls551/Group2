import { Router } from "express";
import { Connection } from "typeorm";
import { DBConnection } from "../connection";
import DefaultController from "./default.controller";
import express, { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Service } from "../entity";

export class ServiceController extends DefaultController {
    protected initializeRoutes(): express.Router {
        const router = express.Router();

        router.route("/owner/services").post((req: Request, res: Response) => {
            const {serviceName, description } = req.body;
            const serviceRepo = getRepository(Service);
            serviceRepo
                .findOne({where : { serviceName } })
                .then((service: Service | undefined) => {
                    if (!service) {
                        const newService = new Service();
                        newService.serviceName = serviceName;
                        newService.description = description;
                        serviceRepo.save(newService).then(
                            createdService => {
                                res.status(200).send({ createdService});
                            },
                            (reson: any)  => {
                                res.status(500).send({ reason: "Database error" });
                            }
                        );
                    }
                    else {
                        res.sendStatus(400).send({ error : true });
                    }
                });
            });
        router.route("/owner/services").get((req: Request, res: Response) => {
            const serviceRepo = getRepository(Service);
            const token = req.get("token");
            serviceRepo
                .find()
                .then((service: Service[] | undefined) => {
                    console.log("getiing services");
                    if (service) {
                        res.status(200).send(service);
                    }
                    else {
                        res.sendStatus(400).send({ error : true });
                    }
                });
            });

        return router;
    }
    // public router: Router;

    // constructor() {
    // this.router = this.initializeRoutes();
    // }

    // protected abstract initializeRoutes(): Router;
}

export default ServiceController;