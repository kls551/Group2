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

        router.route("/owner/edit-services").post((req: Request, res: Response) => {
            const {serviceName, description, price } = req.body;
            const serviceRepo = getRepository(Service);
            console.log("posting service ", serviceName, "\n ", description, " ", price);
            serviceRepo
                .findOne({ where : { serviceName } })
                .then((service: Service | undefined) => {
                    console.log("service ", service);
                    if (!service) {
                        const newService = new Service();
                        newService.serviceName = serviceName;
                        newService.description = description;
                        newService.price = price;
                        serviceRepo.
                        save(newService)
                        .then(
                            (createdService : Service) => {
                                res.status(200).send({createdService});
                            },
                            (reson: any)  => {
                                res.status(500).send({ reason: "Database error" });
                            }
                        );
                    }
                    // else {
                    //     res.sendStatus(400).send({ error : true });
                    // }
                });
            });
        router.route("/owner/edit-services").get((req: Request, res: Response) => {
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
        
        router.route("/owner/edit-services/:id").delete((req: Request, res: Response) => {
            const serviceRepo = getRepository(Service);
            const srvId = req.params.id;

            serviceRepo
                .findOne({where : { srvId }})
                .then( (service : Service | undefined)  => {
                    if (service) {
                        serviceRepo.delete({id : srvId})
                        .then( (result => {
                            res.status(200).end();
                        }))
                    }
                    else {
                        res.status(400).send("service not found");
                    }
                });
        }); 


        router.route("/owner/edit-services/:id").put((req: Request, res: Response) => {
            const serviceRepo = getRepository(Service);
            const srvId = req.params.id;
            const serviceName = req.body.serviceName;
            const description = req.body.description;
            const price = req.body.price;

            serviceRepo
                .findOne({where : { id : srvId }})
                .then( (service : Service | undefined)  => {

                    if (service) {
                        serviceRepo.save({id : srvId, 
                                        serviceName: serviceName,
                                        description: description,
                                        price: price})
                        .then( (result => {
                            res.status(200).end();
                        }))
                    }
                    else {
                        res.status(400).send("service not found");
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