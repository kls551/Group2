import { Connection, createQueryBuilder, getConnection } from "typeorm";
import { Session, User, Announcement, MainCategory, SubCategory, Order, Brands, Cart, ShopItem, About, Service } from "../../entity";

export default class DatabaseUtils {
  public static clearDB(): Promise<any> {
    const connection: Connection = getConnection();
    if (connection && connection.isConnected) {
      return Promise.all([Session,  Announcement, MainCategory, Order, Brands, Cart, User, ShopItem, About, Service].map((entity) => {
        return createQueryBuilder().delete().from(entity).execute();
      }));
    }
    return Promise.resolve();
  }
}
