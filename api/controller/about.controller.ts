import DefaultController from "./default.controller";

import { NextFunction, Request, Response, Router } from "express";
import express from "express";

import { About } from "../entity";

import { getRepository } from "typeorm";

export class AboutController extends DefaultController {
  protected initializeRoutes(): express.Router {
    const router = express.Router();
    const aboutRepo = getRepository(About);
    router.route("/about")
    // .post((req: Request, res: Response) => {
    //     const announcement = new Announcement();
    //     announcement.title = req.body.title;
    //     announcement.body = req.body.body;
    //     announcementRepo.save(announcement).then((savedAnnouncement: Announcement) => {
    //         res.status(200).send({ announcement });
    //     });
    // })
    .get((req: Request, res: Response) => {
        aboutRepo.findOneOrFail().then((about: About) => {
          res.status(200).send(about);
        })
    })
    .put((req: Request, res: Response) => {
        aboutRepo.findOne(1).then(
        (about: About | undefined) => {
          if (about) {
            aboutRepo.update( about.id,
              {address: req.body.address,
               email: req.body.email,
               phone: req.body.phone,
               monday: req.body.monday,
               tuesday: req.body.tuesday,
               wednesday: req.body.wednesday,
               thursday: req.body.thursday,
               friday: req.body.friday,
               saturday: req.body.saturday,
               sunday: req.body.sunday
            }
            ).then(() => res.sendStatus(200));
          }
          else {
            res.sendStatus(404);
          }
        }
      )
    });
    // .delete((req: Request, res: Response) => {
    //   announcementRepo.findOneOrFail(req.params.id).then((foundAnn: Announcement) => {
    //     announcementRepo.delete(foundAnn).then(result => {
    //       res.send(200);
    //     });
    //   });
    // });
    return router;
}
}
