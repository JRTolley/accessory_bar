import Router from "koa-router";
import { Merchant } from "../../entities/Merchant";

export function shopRedact(): Router {
  const router = new Router();

  router.post("/shop/redact", async (ctx, next) => {
    // Delete the merchant
    const body = ctx.request.body;
    console.log("Shop Redact Body: ", body);
    const merchant = await Merchant.findOne({
      where: { shopName: body.shop_domain },
    });
    await merchant.remove();
    ctx.response.status = 204;
  });

  return router;
}
