import Router from "koa-router";
import { createClient } from "urql";
import { AccessorySet } from "../../../entities/AccessorySet";
import { Merchant } from "../../../entities/Merchant";
import { bulkGetAllProducts } from "../../../graphql/mutations/bulkGetAllProducts";

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

      // Send off bulk request
      const res = await client.mutation(bulkGetAllProducts).toPromise();

      if (!res.error) {
        console.log(`> ${shop} - All products successfully retrieved`);
      } else {
        console.error(`! ${shop} - All products trivial failed`);
      }
      console.log("Bulk stuff: ", res.data);
    }

    ctx.response.status = 200;
    ctx.response.body = merchant;
  });

  return router;
}
