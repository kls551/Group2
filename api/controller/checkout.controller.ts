import DefaultController from "./default.controller";

import { NextFunction, Request, Response, Router } from "express";
import express from "express";

import { Session, Order, User } from "../entity";

import { getRepository } from "typeorm";

export class OrderController extends DefaultController {
  protected initializeRoutes(): express.Router {
    const router = express.Router();

    router.route("/checkout")
    // .get((req: Request, res: Response) => {
    //   const checkoutRepo = getRepository(Order);
    //   const sessionRepo = getRepository(Session);
    //   const token = req.get("token");
    //   sessionRepo.findOne(token, {relations: ["user", "user.todos"]}).then((foundSession: Session | undefined) => {
    //     if (foundSession) {
    //       const user = foundSession!.user;
    //       res.status(200).send(user.todos);
    //     }
    //   });
    // })
    .post((req: Request, res: Response) => {
      const token = req.get("token");
      const sessionRepo = getRepository(Session);
      const orderRepo = getRepository(Order);
      const order = new Order();
      sessionRepo.findOne(token).then((foundSession: Session | undefined) => {
        const user = foundSession!.user;
        order.userId = req.body.user;
        order.fn = req.body.firstName;
        order.ln = req.body.lastName;
        order.Address = req.body.address;
        order.City = req.body.city;
        order.cnum = req.body.cnum;
        order.pickup = req.body.Pickup;
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
