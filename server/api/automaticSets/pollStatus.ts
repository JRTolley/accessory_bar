import fs from "fs";
import https from "https";
import Router from "koa-router";
import path from "path";
import { createClient } from "urql";
import { AccessorySet } from "../../../entities/AccessorySet";
import { Merchant } from "../../../entities/Merchant";
import { Product } from "../../../entities/Product";
import { getCurrentBulkOperation } from "../../../graphql/queries/getCurrentBulkOperation";
import createNewProducts from "../../../utils/backend/createNewProducts";

const __root_dir = __dirname.split("/").slice(0, -3).join("/");

async function createRandomSet(keyProduct, products, merchant) {
  // If the product already exists don't do anything
  if (await AccessorySet.findOne({ where: { baseProduct: keyProduct } })) {
    console.log("Woop");
    return;
  }
  // products.filter(p !== keyProduct)
  const accessories = products
    .filter((p) => p !== keyProduct)
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.min(5, products.length - 1));
  console.log("Start: ", accessories);
  await AccessorySet.create({
    baseProduct: keyProduct,
    merchant,
    type: "automatic",
    accessories,
  }).save();
  console.log("Woop");
}

export function pollStatus(): Router {
  const router = new Router();

  router.get("/pollStatus", async (ctx, next) => {
    const { shop } = ctx.session;
    const merchant = await Merchant.findOne(
      { shopName: shop },
      { relations: ["products"] }
    );

    const client = createClient({
      url: `https://${shop}/admin/api/2021-01/graphql.json`,
      fetchOptions: {
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": merchant.accessToken,
        },
      },
    });

    let res = await client.query(getCurrentBulkOperation).toPromise();

    if (res.data.currentBulkOperation.status === "COMPLETED") {
      // Download file
      console.log("URL: ", res.data.currentBulkOperation.url);
      const filename = path.join(
        __root_dir,
        "/data/",
        "ShopifyProductBulk-" +
          res.data.currentBulkOperation.id.split("/").slice(-1)[0] +
          ".jsonl"
      );
      console.log(filename);
      const write_file = fs.createWriteStream(filename);
      const request = https.get(
        res.data.currentBulkOperation.url,
        function (response) {
          response.pipe(write_file);
        }
      );
      await new Promise((resolve) => write_file.on("finish", resolve));
      // Consume data
      let products = [];
      const data = fs.readFileSync(filename, "ascii");
      let new_product = [];
      let imgPushed = false;
      let varPushed = false;
      for (let line of data.split("\n").slice(0, -1)) {
        line = JSON.parse(line);
        if (Object.keys(line).includes("title")) {
          if (new_product !== []) products.push(new_product);
          new_product = [];
          new_product.push(line);
          imgPushed = false;
          varPushed = false;
        } else if (Object.keys(line).includes("originalSrc") && !imgPushed) {
          new_product.push(line);
          imgPushed = true;
        } else if (Object.keys(line).includes("price") && !varPushed) {
          new_product.push(line);
          varPushed = true;
        }
      }
      products = products.slice(1).map((p) => {
        return {
          pid: p[0].id,
          title: p[0].title,
          handle: p[0].handle,
          img: p[1].originalSrc,
          price: p[2].price,
        };
      });
      console.log("Products 2:", products);
      await createNewProducts(merchant, products);
      // Create Products
      products = await Product.find({ where: { merchant } });
      console.log("Product: ", products.length);
      await Promise.all(
        products.map(async (product) => {
          return await createRandomSet(product, products, merchant);
        })
      );
      console.log("Number:", await AccessorySet.findAndCount());
      // Delete file
      // fs.unlinkSync(filename);
    }

    ctx.response.status = 200;
    ctx.response.body = res.data.currentBulkOperation.status;
  });

  return router;
}
