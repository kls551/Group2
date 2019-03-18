import { Connection, createQueryBuilder, getConnection } from "typeorm";
<<<<<<< HEAD
import { Session, User, Announcement, MainCategory, Order, Brands, Cart, ShopItem, Imgs } from "../../entity";
=======
import { Session, User, Announcement, MainCategory, Order, Brands, Cart, ShopItem, About, Service } from "../../entity";
>>>>>>> f7181deea53f0cb94c0c6a693f686a1dd52a19b0

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
