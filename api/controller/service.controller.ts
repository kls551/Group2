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

        router.route("/owner/edit-services")
        .post((req: Request, res: Response) => {
            console.log(req.body);
            const {serviceName, description, price, imgURL } = req.body;
            const serviceRepo = getRepository(Service);
            serviceRepo
                .findOne({ where : { serviceName } })
                .then((service: Service | undefined) => {
                    if (!service) {
                        const newService = new Service();
                        newService.serviceName = serviceName;
                        newService.description = description;
                        newService.price = price;
                        newService.imgURL = imgURL;
                        serviceRepo.
                        save(newService)
                        .then(
                            (createdService : Service) => {
                                console.log(createdService);
                                res.status(200).send({createdService});
                            },
                            (reson: any)  => {
                                res.status(500).send({ reason: "Database error" });
                            }
                        );
                    }
                });
        })
        .get((req: Request, res: Response) => {
            const serviceRepo = getRepository(Service);
            const token = req.get("token");
            serviceRepo
                .find()
                .then((service: Service[] | undefined) => {
                    if (service) {
                        console.log(service);
                        res.status(200).send(service);
                    }
                    else {
                        res.sendStatus(400).send({ error : true });
                    }
                });
            });
        
        router.route("/owner/edit-services/:id")
        .delete((req: Request, res: Response) => {
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
        })
        .put((req: Request, res: Response) => {
            const serviceRepo = getRepository(Service);
            const srvId = req.params.id;
            const serviceName = req.body.serviceName;
            const description = req.body.description;
            const price = req.body.price;

            serviceRepo
                .findOne({where : { id : srvId }})
                .then( (service : Service | undefined)  => {

                    if (service) {
                        service.serviceName = serviceName;
                        service.description = description;
                        service.price = price;
                        service.imgURL = req.body.imgURL;
                        serviceRepo.save(service)
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
}

export default ServiceController;