import DefaultController from "./default.controller";

import { NextFunction, Request, Response, Router } from "express";
import express from "express";

import { Announcement } from "../entity";

import { getRepository } from "typeorm";

export class AnnouncementController extends DefaultController {
  protected initializeRoutes(): express.Router {
    const router = express.Router();
    const announcementRepo = getRepository(Announcement);
    router.route("/announcement")
    .post((req: Request, res: Response) => {
        const announcement = new Announcement();
        announcement.title = req.body.title;
        announcement.body = req.body.body;
        announcementRepo.save(announcement).then((savedAnnouncement: Announcement) => {
            res.status(200).send({ announcement });
        });
    })
    .get((req: Request, res: Response) => {
        announcementRepo.find().then((announcements: Announcement[]) => {
          announcements = announcements.reverse();
          res.status(200).send(announcements);
        })
    });

    router.route("/announcement/:id")
    .delete((req: Request, res: Response) => {
      announcementRepo.findOneOrFail(req.params.id).then((foundAnn: Announcement) => {
        announcementRepo.delete(foundAnn).then(result => {
          res.send(200);
        });
      });
    });
    return router;
}
}
