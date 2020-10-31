import "isomorphic-fetch";
import Koa from "koa";
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
  "ls-65f3464dc451ce359854f23226ce6946f9021c0d.cjynhwfinaps.us-east-2.rds.amazonaws.com";
const username = "dbmasteruser";
const password = "es),<%<Oy*nPtx3K.D}F|Y%=f6=[E=Z-";
const database = "staging";

// const new_script_tag =
//   "https://cdn.shopify.com/s/files/1/0425/8273/7063/files/index.min.js?v=1603915991";

const new_script_tag =
  "https://cdn.shopify.com/s/files/1/0425/8273/7063/files/index.min_c9dd5f8b-221c-40e2-9521-0a631258f709.js?v=1603916629";
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
  let merchants = await Merchant.find();
  console.log(`> ${merchants.length} Merchants found`);

  // Find all the Merchants with old tags
  merchants = merchants.filter(
    async (m) =>
      await !hasCorrectScriptTags(m.shopName, m.accessToken, new_script_tag)
  );
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

    const fassdsa = await client
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
}

main();
