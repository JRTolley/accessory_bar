import Router from "koa-router";
import { AccessorySet } from "../../../entities/AccessorySet";
import { Merchant } from "../../../entities/Merchant";

export function get(): Router {
  const router = new Router();

  router.get("/get", async (ctx, next) => {
    const merchant = await Merchant.findOne({
      shopName: ctx.cookies.get("shopOrigin"),
    });
    const results = await AccessorySet.find({ where: { merchant } });

    ctx.response.status = 200;
    ctx.response.body = results;
  });

  router.post("/get", async (ctx, next) => {
    const body = ctx.request.body;

    const merchant = await Merchant.findOne({
      shopName: ctx.cookies.get("shopOrigin"),
    });

    const result = await AccessorySet.find({
      where: { merchant, id: body.id },
    });

    if (!result) {
      ctx.response.status = 400;
    } else {
      ctx.response.status = 200;
      ctx.response.body = result;
    }
  });

  return router;
}
