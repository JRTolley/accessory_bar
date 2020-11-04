import Router from "koa-router";
import { AccessorySet } from "../../../entities/AccessorySet";
import { Merchant } from "../../../entities/Merchant";
import { Product } from "../../../entities/Product";

export function get() {
  const router = new Router();
  router.post("/get", async (ctx, next) => {
    let body = JSON.parse(ctx.request.body);
    if (!body.product_id) {
      ctx.response.status = 400;
      ctx.response.body = "No element product id found";
    }

    const merchant = await Merchant.findOne({
      shopName: ctx.cookies.get("shopOrigin"),
    });

    if (!merchant) {
      console.error("> Merchant wasn't defined");
    }

    const realPid = `gid://shopify/Product/${body.product_id}`;
    const accessorySet = await AccessorySet.findOne({
      merchant,
      baseProduct: await Product.findOne({ pid: realPid }),
    });

    if (!accessorySet) {
      console.log("No accessory Set found");
      ctx.response.status = 204;
    } else {
      ctx.response.status = 200;
      ctx.response.body = accessorySet.accessories;
      accessorySet.incrementImpressions();
    }

    next();
  });

  return router;
}
