import cors from "cors";
import express from "express";
import { LoginController, UserController, OrderController, AnnouncementController, MainCategoryController, ShopItemController, SubCategoryController  } from "./controller";

import { DBConnection } from "./connection";

export class Server {
  private myApp: Promise<express.Application>;
  constructor() {
    this.myApp = this.buildServer();
  }
  public getMyApp(): Promise<express.Application> {
    return this.myApp;
  }
  protected buildServer(): Promise<express.Application> {
    return DBConnection.getConnection().then(() => {
      const app: express.Application = express();

      app.use(cors());
      app.use(express.json());
      app.use(express.static("public"));

      app.use("/", new UserController().router);
      app.use("/", new LoginController().router);
      app.use("/", new OrderController().router);
      app.use("/", new MainCategoryController().router);
      app.use("/", new SubCategoryController().router);
      app.use("/", new AnnouncementController().router);
      app.use("/", new ShopItemController().router);

      return app;
    });
  }

}

export default Server;
