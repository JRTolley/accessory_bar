import "isomorphic-fetch";
import Koa from "koa";
import { resolve } from "path";
import { createConnection } from "typeorm";
import { createClient } from "urql";
import { AccessorySet } from "../../entities/AccessorySet";
import { Merchant } from "../../entities/Merchant";
import { Product } from "../../entities/Product";
import { StoreEvent } from "../../entities/StoreEvent";
import { createScript } from "../../graphql/mutations/createScript";
import { scriptTagDelete } from "../../graphql/mutations/scriptTagDelete";
import { getScriptTags } from "../../graphql/queries/getScriptTags";
import { hasCorrectScriptTags } from "../../server/shopfront/hasCorrectScriptTags";

const app = new Koa();

// Staging
const host =
  "ls-cf2c99af9c14c9362a9ef3c25ed8575a9f53e78c.cjynhwfinaps.us-east-2.rds.amazonaws.com";
const username = "dbmasteruser";
const password = "^97)lUpysjse*A}c}:lc}$,0cl&8s4g<";
const database = "production_db";

const new_script_tag =
  "https://cdn.shopify.com/s/files/1/0425/8273/7063/files/index.min_eb7b095f-9c24-4ebf-b65c-3eb8232f0676.js?v=1611515333";

async function main() {
  console.log(` Starting for database ${database}`);

  const conn = await createConnection({
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
  let merchants = await Merchant.find();
  console.log(`> ${merchants.length} Merchants found`);

  // Find all the Merchants with old tags
  let filtered_merchants = [];
  for (let merchant of merchants) {
    const res = await hasCorrectScriptTags(
      merchant.shopName,
      merchant.accessToken,
      new_script_tag
    );

    if (!res && res !== undefined) {
      filtered_merchants.push(merchant);
    }
  }
  merchants = filtered_merchants;
  console.log(
    `> ${merchants.length} Merchants with incorrect scripttags found`
  );

  // Install new script tags
  for (let merchant of merchants) {
    // Create client
    let client = createClient({
      url: `https://${merchant.shopName}/admin/api/2020-07/graphql.json`,
      fetchOptions: {
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": merchant.accessToken,
        },
      },
    });
    // Get stuff to remove
    const res = await client.query(getScriptTags).toPromise();
    const ids = res.data.scriptTags.edges.map((tag) => tag.node.id);

    const data = await Promise.all(
      ids.map(async (id) => {
        return await client
          .mutation(scriptTagDelete, {
            id,
          })
          .toPromise();
      })
    );

    console.log(`> ${merchant.shopName} script tags removed`);

    await client
      .mutation(createScript, {
        displayScope: "ONLINE_STORE",
        src: new_script_tag,
      })
      .toPromise();

    console.log(`> ${merchant.shopName} new script tag installed`);
    console.log(
      merchants.indexOf(merchant) + 1,
      " of ",
      merchants.length,
      " Merchants updated"
    );
  }

  console.log(":) Script Complete");
  conn.close();
  return;
}

main();
