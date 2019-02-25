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
      orderRepo.findOneOrFail({trackingNum:req.params.id}).then(
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

    router.route("/checkout")
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
        orderRepo.save(order).then((savedOrder: Order) => {
          res.status(200).send({ order });
        });
      });
    });
    // router.route("/todos/:id")
    // .put((req: Request, res: Response) => {
    //   const todoRepo = getRepository(ToDo);
    //   todoRepo.findOneOrFail(req.params.id).then((foundToDo: ToDo) => {
    //     // save updates here
    //     foundToDo.complete = req.body.complete;
    //     todoRepo.save(foundToDo).then((updatedTodo: ToDo) => {
    //       res.send(200).send({todo: updatedTodo});
    //     });
    //   });
    // })
    // .delete((req: Request, res: Response) => {
    //   const todoRepo = getRepository(ToDo);
    //   todoRepo.findOneOrFail(req.params.id).then((foundToDo: ToDo) => {
    //     todoRepo.delete(foundToDo).then(result => {
    //       res.send(200);
    //     });
    //   });
    // });
    return router;
  }
}
