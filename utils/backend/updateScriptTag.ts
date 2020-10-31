import Koa from "koa";
import { createConnection } from "typeorm";
import { AccessorySet } from "../../entities/AccessorySet";
import { Merchant } from "../../entities/Merchant";
import { Product } from "../../entities/Product";
import { StoreEvent } from "../../entities/StoreEvent";
import { checkScriptTags } from "../../server/shopfront/checkScriptTags";
import "isomorphic-fetch";

const app = new Koa();

// Staging
const host =
  "ls-65f3464dc451ce359854f23226ce6946f9021c0d.cjynhwfinaps.us-east-2.rds.amazonaws.com";
const username = "dbmasteruser";
const password = "es),<%<Oy*nPtx3K.D}F|Y%=f6=[E=Z-";
const database = "staging";

async function main() {
  console.log(` Starting for database ${database}`);

  await createConnection({
    type: "postgres",
    host,
    username,
    password,
    port: 5432,
    database,
    synchronize: false,
    entities: [Merchant, AccessorySet, Product, StoreEvent],
  });

  // Get all Merchants
  const merchants = await Merchant.find();
  console.log(`> ${merchants.length} Merchants found`);

  // Find all the Merchants with old tags
  await checkScriptTags(
    merchants[0].shopName,
    merchants[0].accessToken,
    "ebrhej"
  );
}

main();
