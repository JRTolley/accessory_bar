import Router from "koa-router";
import { AccessorySet } from "../../../entities/AccessorySet";
import { Merchant } from "../../../entities/Merchant";

export function deleteRoute(): Router {
  const router = new Router();

  router.post("/delete", async (ctx, next) => {
    const merchant = await Merchant.findOne({
      shopName: ctx.cookies.get("shopOrigin"),
    });

    const toDelete = merchant.accessorySets.filter((set) =>
      ctx.request.body.ids.includes(set.id)
    );

    await AccessorySet.remove(toDelete);

    const updatedMerchant = await Merchant.findOne({
      shopName: ctx.cookies.get("shopOrigin"),
    });
    ctx.response.status = 200;
    ctx.response.body = updatedMerchant.accessorySets;
  });

  return router;
}
