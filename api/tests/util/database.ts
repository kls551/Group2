import { Connection, createQueryBuilder, getConnection } from "typeorm";
import { Session, User, Order } from "../../entity";

export default class DatabaseUtils {
  public static clearDB(): Promise<any> {
    const connection: Connection = getConnection();
    if (connection && connection.isConnected) {
      return Promise.all([Session, User, Order].map((entity) => {
        return createQueryBuilder().delete().from(entity).execute();
      }));
    }
    return Promise.resolve();
  }
}
