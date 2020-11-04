import { Console } from "console";
import Router from "koa-router";
import { AccessorySet } from "../../../entities/AccessorySet";
import { Merchant } from "../../../entities/Merchant";
import { Product } from "../../../entities/Product";
import { StoreEvent } from "../../../entities/StoreEvent";

export function registerClickthrough(): Router {
  const router = new Router();

  router.post("/registerClickthrough", async (ctx, next) => {
    console.log("Clickthrough detected: ", ctx.request.body);
    ctx.request.body = JSON.parse(ctx.request.body);
    const product = await Product.findOne({
      pid: ctx.request.body.product_id,
    });

    const set = await AccessorySet.findOne({
      baseProduct: await Product.findOne({
        pid: `gid://shopify/Product/${ctx.request.body.set_pid}`,
      }),
    });

    if (!set && !product) {
      console.error(`! registerClickthrough - Set or product not found`);
      ctx.response.status = 500;
      return;
    }

    const shopEvent = await StoreEvent.create({
      type: "Clickthrough",
      product,
      set,
      merchant: await Merchant.findOne({
        shopName: ctx.cookies.get("shopOrigin"),
      }),
    }).save();

    ctx.response.status = 204;
  });

  return router;
}
