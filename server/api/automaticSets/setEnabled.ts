import Router from "koa-router";
import { createClient } from "urql";
import { AccessorySet } from "../../../entities/AccessorySet";
import { Merchant } from "../../../entities/Merchant";
import { Product } from "../../../entities/Product";
import { bulkGetAllProducts } from "../../../graphql/mutations/bulkGetAllProducts";
import { getAllProducts } from "../../../graphql/queries/getAllProducts";
import { getCurrentBulkOperation } from "../../../graphql/queries/getCurrentBulkOperation";
import createNewProducts from "../../../utils/backend/createNewProducts";

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

export function setEnabled(): Router {
  const router = new Router();

  router.post("/setEnabled", async (ctx, next) => {
    const { shop } = ctx.session;
    const merchant = await Merchant.findOne(
      { shopName: shop },
      { relations: ["products"] }
    );
    merchant.automaticSets = ctx.request.body.enabled;
    await merchant.save();

    console.log("Enabled: ", merchant.automaticSets);

    // If disabled delete accessory sets
    if (!merchant.automaticSets) {
      await AccessorySet.delete({ type: "automatic", merchant });
    }
    // If enabled create accessory sets
    else if (merchant.automaticSets) {
      // Get all products
      // TODO gotta get all the remaining accessories aswell.
      const client = createClient({
        url: `https://${shop}/admin/api/2021-01/graphql.json`,
        fetchOptions: {
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Access-Token": merchant.accessToken,
          },
        },
      });

      //const res = await client.query(getAllProducts).toPromise();
      // Send off bulk request
      const res = await client.mutation(bulkGetAllProducts).toPromise();

      if (!res.error) {
        console.log(`> ${shop} - All products successfully retrieved`);
      } else {
        console.error(`! ${shop} - All products trivial failed`);
      }
      console.log("Bulk stuff: ", res.data);

      /*
      let products = res.data.products.edges;
      products = products
        .map((p) => p["node"])
        .map((acc) => {
          return {
            pid: acc.id,
            title: acc.title,
            handle: acc.handle,
            price: acc.variants.edges[0].node.price,
            img: acc.images.edges[0].node.originalSrc,
          };
        });
      await createNewProducts(merchant, products);
      // console.log("Amount of products: ", products);

      products = await Product.find({ where: { merchant } });
      console.log("Product: ", products.length);
      await Promise.all(
        products.map(async (product) => {
          return await createRandomSet(product, products, merchant);
        })
      );
      console.log("Number:", await AccessorySet.findAndCount());
      */
    }

    ctx.response.status = 200;
    ctx.response.body = merchant;
  });

  return router;
}
