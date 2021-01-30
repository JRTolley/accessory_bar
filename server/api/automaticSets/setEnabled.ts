import Router from "koa-router";
import { Merchant } from "../../../entities/Merchant";

export function setEnabled(): Router {
  const router = new Router();

  router.post("/setEnabled", async (ctx, next) => {
    const { shop } = ctx.session;
    const merchant = await Merchant.findOne({ shopName: shop });
    merchant.automaticSets = ctx.request.body.enabled;
    await merchant.save();

    console.log("Enabled: ", merchant.automaticSets);

    // TODO - Create the Automatic Responses

    ctx.response.status = 200;
    ctx.response.body = merchant;
  });

  return router;
}
