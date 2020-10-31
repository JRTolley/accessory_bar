import Router from "koa-router";
import { Merchant } from "../../../entities/Merchant";
import { installScriptTags } from "../../shopfront/installScriptTags";
import { removeScriptTags } from "../../shopfront/removeScriptTags";

export function setEnabled(): Router {
  const router = new Router();

  router.post("/setEnabled", async (ctx, next) => {
    const { shop } = ctx.session;
    const merchant = await Merchant.findOne({ shopName: shop });
    merchant.enabled = ctx.request.body.enabled;
    await merchant.save();

    if (merchant.enabled) {
      installScriptTags(ctx);
    } else if (!merchant.enabled) {
      removeScriptTags(ctx);
    }

    ctx.response.status = 200;
    ctx.response.body = merchant;
  });

  return router;
}
