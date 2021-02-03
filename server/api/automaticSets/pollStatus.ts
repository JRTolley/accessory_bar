import Router from "koa-router";
import { createClient } from "urql";
import { Merchant } from "../../../entities/Merchant";
import { getCurrentBulkOperation } from "../../../graphql/queries/getCurrentBulkOperation";

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

    // Get status of current thing
    let res = await client.query(getCurrentBulkOperation).toPromise();

    ctx.response.status = 200;
    ctx.response.body = res.data.currentBulkOperation.status;
  });

  return router;
}
