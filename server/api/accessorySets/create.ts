import Router from "koa-router";
import { AccessorySet } from "../../../entities/AccessorySet";
import { Merchant } from "../../../entities/Merchant";
import { Product } from "../../../entities/Product";
import createNewProducts from "../../../utils/backend/createNewProducts";

export function create(): Router {
  const router = new Router();

  router.post("/create", async (ctx, next) => {
    // Get Merchant
    const merchant = await Merchant.findOne({
      shopName: ctx.cookies.get("shopOrigin"),
    });

    console.log("Merchant: ", merchant);
    // Create new products
    await createNewProducts(merchant, ctx.request.body.accessories);

    // Don't waste energy on duplicates
    const existingSets = merchant.accessorySets.map(
      (set) => set.baseProduct.pid
    );
    const toCreate = ctx.request.body.accessories.filter(
      (acc) => !existingSets.includes(acc.pid)
    );

    await Promise.all(
      toCreate.map(async (acc) => {
        const baseProduct = await Product.findOne({ pid: acc.pid });
        // console.log("BaseProduct: ", baseProduct);
        return await AccessorySet.create({
          baseProduct,
          merchant: merchant,
        }).save();
      })
    );

    const updatedMerchant = await Merchant.findOne({
      shopName: ctx.cookies.get("shopOrigin"),
    });
    ctx.response.status = 200;
    ctx.response.body = updatedMerchant.accessorySets;
  });
  return router;
}
