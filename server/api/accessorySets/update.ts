import Router from "koa-router";
import { AccessorySet } from "../../../entities/AccessorySet";
import { Merchant } from "../../../entities/Merchant";
import { Product } from "../../../entities/Product";
import createNewProducts from "../../../utils/backend/createNewProducts";

export function update(): Router {
  const router = new Router();

  router.post("/update", async (ctx, next) => {
    if (!ctx.request.body.accessories) {
      ctx.response.status = 400;
      ctx.response.body = "Accessories not provided";
    }
    const merchant = await Merchant.findOne(
      {
        shopName: ctx.cookies.get("shopOrigin"),
      },
      {
        relations: ["accessorySets", "accessorySets.accessories", "products"],
      }
    );
    const toUpdate = merchant.accessorySets.filter(
      (set) => set.id === ctx.request.body.id
    )[0];

    // Create new products if neccesary
    await createNewProducts(merchant, ctx.request.body.accessories);

    // Make sure all inputs are unique
    const pids = ctx.request.body.accessories.map((acc) => acc.pid);
    ctx.request.body.accessories = ctx.request.body.accessories.filter(
      (n, i) => pids.indexOf(n.pid) === i
    );

    const productsToAdd: Product[] = await Promise.all(
      ctx.request.body.accessories
        .map((acc) => acc.pid)
        .map(async (pid) => {
          return await Product.findOne({ pid });
        })
    );

    toUpdate.accessories = productsToAdd;
    await toUpdate.save();
    // Reload accessory set
    const result = await AccessorySet.findOne(toUpdate.id, {
      relations: ["accessories"],
    });
    ctx.response.status = 200;
    ctx.response.body = result;
  });

  return router;
}
