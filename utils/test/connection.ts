import path from "path";
import { createConnection, getConnection } from "typeorm";
import { AccessorySet } from "../../entities/AccessorySet";
import { CustomizationOptions } from "../../entities/CustomizationOptions";
import { Merchant } from "../../entities/Merchant";
import { Product } from "../../entities/Product";
import { StoreEvent } from "../../entities/StoreEvent";

const connection = {
  async create() {
    const __root_dir = __dirname.split("/").slice(0, -2).join("/");
    await createConnection({
      type: "postgres",
      host:
        "ls-cf2c99af9c14c9362a9ef3c25ed8575a9f53e78c.cjynhwfinaps.us-east-2.rds.amazonaws.com",
      username: "dbmasteruser",
      password: "^97)lUpysjse*A}c}:lc}$,0cl&8s4g<",
      port: 5432,
      database: "testing_db",
      synchronize: false,
      entities: [
        Merchant,
        AccessorySet,
        Product,
        StoreEvent,
        CustomizationOptions,
      ],
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
