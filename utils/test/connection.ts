import path from "path";
import { createConnection, getConnection } from "typeorm";
import { AccessorySet } from "../../entities/AccessorySet";
import { Merchant } from "../../entities/Merchant";
import { Product } from "../../entities/Product";
import { StoreEvent } from "../../entities/StoreEvent";

const connection = {
  async create() {
    const __root_dir = __dirname.split("/").slice(0, -2).join("/");
    await createConnection({
      type: "postgres",
      host: "localhost",
      username: "postgres",
      password: "1234",
      port: 5432,
      database: "shopifytest",
      synchronize: false,
      entities: [Merchant, AccessorySet, Product, StoreEvent],
      migrations: [path.join(__root_dir, "./migration/*")],
    });
    console.log("Root: ", __root_dir);
    await getConnection().runMigrations();
  },

  async close() {
    await getConnection().close();
  },

  async clear() {
    const connection = getConnection();
    const entities = connection.entityMetadatas;

    entities.forEach(async (entity) => {
      const repository = connection.getRepository(entity.name);
      await repository.query(`DELETE FROM ${entity.tableName}`);
    });
  },
};

export default connection;
