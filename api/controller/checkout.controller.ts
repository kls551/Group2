import DefaultController from "./default.controller";

import { NextFunction, Request, Response, Router } from "express";
import express from "express";

import { Session, Order, User } from "../entity";

import { getRepository } from "typeorm";

export class OrderController extends DefaultController {
  protected initializeRoutes(): express.Router {
    const router = express.Router();

    router.route("/trackorder/:id")
    .get((req: Request, res: Response) => {
      const orderRepo = getRepository(Order);
      orderRepo.findOneOrFail({ trackingNum: req.params.id }).then(
        (order: Order | undefined) => {
          if (order) {
            res.status(200).send(order);
          } else {
            res.sendStatus(404);
          }
        },
        () => {
          res.sendStatus(404);
        }
      );
    })
    .delete((req: Request, res: Response) => {
      const orderRepo = getRepository(Order);
      orderRepo.findOneOrFail(req.params.id).then((foundOrd: Order) => {
        orderRepo.delete(foundOrd).then(result => {
          res.send(200);
        });
      });
    });
  

    router.route("/orders")
    .get((req: Request, res: Response) => {
      const orderRepo = getRepository(Order);
      orderRepo.find().then((orders: Order[]) => {
        res.status(200).send(orders);
      });
    })

    .post((req: Request, res: Response) => {
      const token = req.get("token");
      const sessionRepo = getRepository(Session);
      const orderRepo = getRepository(Order);
      const order = new Order();
      sessionRepo.findOne(token).then((foundSession: Session | undefined) => {
        const user = foundSession!.user;
        order.userId = req.body.user;
        order.pickup = req.body.Pickup;
        order.orderedDate = req.body.orderedDate;
        order.address = req.body.address;
        order.city = req.body.city;
        order.items = req.body.items;
        orderRepo.save(order).then((savedOrder: Order) => {
            res.status(200).send({ savedOrder });
        });
      });
    });

    router.route("/orders/:id/:stat")
        .put((req: Request, res: Response) => {
            const orderRepo = getRepository(Order);
            orderRepo.findOneOrFail(req.params.id).then((orderItem: Order | undefined) => {
                if (orderItem) {         
                  orderItem.status = req.params.stat;
                  if(req.params.stat == 2){
                    orderItem.shipped = new Date();
                  }
                  orderRepo.save(orderItem).then((updatedItem: Order) => {
                      res.status(200).send(updatedItem);
                  });
                }
                else{
                  res.sendStatus(404);
                }
              },
              () => {
                res.sendStatus(404);
              });
        });
    return router;
  }
}
