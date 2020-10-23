import Router from "koa-router";
import { AccessorySet } from "../../../entities/AccessorySet";
import { Merchant } from "../../../entities/Merchant";
import { Product } from "../../../entities/Product";
import { StoreEvent } from "../../../entities/StoreEvent";

export function get(): Router {
  const router = new Router();

  router.get("/get", async (ctx, next) => {
    const merchant = await Merchant.findOne({
      shopName: ctx.cookies.get("shopOrigin"),
    });
    const results = await AccessorySet.find({
      where: { merchant },
    });
    ctx.response.status = 200;
    ctx.response.body = results;
  });

  router.post("/get", async (ctx, next) => {
    // Only returns one result
    const body = ctx.request.body;

    const merchant = await Merchant.findOne({
      shopName: ctx.cookies.get("shopOrigin"),
    });

    const set = await AccessorySet.findOne({
      where: { merchant, id: body.id },
      relations: ["accessories"],
    });

    const result: any = set;
    result.accessories = await Promise.all(
      set.accessories.map(async (acc) => {
        return {
          ...acc,
          storeEventsCount: await StoreEvent.count({
            where: { product: acc, set },
          }),
        };
      })
    );

    console.log("Set: ", result.accessories);

    if (!result) {
      ctx.response.status = 400;
    } else {
      ctx.response.status = 200;
      ctx.response.body = result;
    }
  });

  return router;
}
