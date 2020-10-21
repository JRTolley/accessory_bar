import Router from "koa-router";
import { Merchant } from "../../../entities/Merchant";
import { createSubscription } from "../../billing/createSubscription";

export function beta(): Router {
  const router = new Router();

  router.get("/beta", async (ctx, next) => {
    // Mark as beta and send them back to the main menu
    // const res = await createSubscription(ctx, "Beta", 0.0);
    const { shop } = ctx.session;
    const merchant = await Merchant.findOne({ shopName: shop });
    merchant.planType = "Beta";
    await merchant.save();
    ctx.response.status = 200;
    ctx.response.body = "apps/accessory-bar/";
  });
  return router;
}
