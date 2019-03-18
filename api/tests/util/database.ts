import { Connection, createQueryBuilder, getConnection } from "typeorm";
import { Session, User, Announcement, MainCategory, Order, Brands, Cart, ShopItem, About, Service, Imgs } from "../../entity";

export default class DatabaseUtils {
  public static clearDB(): Promise<any> {
    const connection: Connection = getConnection();
    if (connection && connection.isConnected) {
      return Promise.all([Session, User, Announcement, MainCategory, Order, Brands, Cart, ShopItem, About, Service].map((entity) => {
        return createQueryBuilder().delete().from(entity).execute();
      }));
    }
    return Promise.resolve();
  }
}
