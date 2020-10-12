import "reflect-metadata";
import { Connection, createConnection, getConnection } from "typeorm";
import { Accessory } from "../entities/Accessory";
import { AccessorySet } from "../entities/AccessorySet";
import { Merchant } from "../entities/Merchant";

var initDB = (function () {
  let instance: Connection | null;

  async function createInstance() {
    // close any existing connections from hot reload
    try {
      await getConnection().close();
    } catch (err) {
      console.log("Setting up new connection");
    }
    const conn = await createConnection({
      type: "postgres",
      username: "postgres",
      password: "1234",
      port: 5432,
      database: "shopify",
      synchronize: true,
      entities: [Merchant, AccessorySet, Accessory],
    });
    // await Accessory.clear();
    // console.log("Merchants: ", await Merchant.find());
    // console.log("AccessorySet: ", await AccessorySet.find());
    // console.log("Accessories: ", await Accessory.find());
    return conn;
  }

  return {
    check: async function () {
      if (!instance) {
        instance = await createInstance();
      }
      return instance;
    },
  };
})();

export default initDB;
