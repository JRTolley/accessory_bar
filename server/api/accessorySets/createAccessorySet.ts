import Router from "koa-router";
import { AccessorySet } from "../../../entities/AccessorySet";
import { Merchant } from "../../../entities/Merchant";
import { Product } from "../../../entities/Product";
import createNewProducts from "../../../utils/backend/createNewProducts";

export async function createAccessorySet(ctx) {
  const { shop } = ctx.session;
  const merchant = await Merchant.findOne(
    {
      shopName: shop,
    },
    { relations: ["accessorySets", "products"] }
  );
  if (!merchant) throw new Error(`! Merchant not defined on ${shop}`);
  // Create new products
  await createNewProducts(merchant, ctx.request.body.accessories);

  // Don't waste energy on duplicates
  const existingSets = merchant.accessorySets.map((set) => set.baseProduct.pid);
  const toCreate = ctx.request.body.accessories.filter(
    (acc) => !existingSets.includes(acc.pid)
  );

  await Promise.all(
    toCreate.map(async (acc) => {
      return await AccessorySet.create({
        baseProduct: await Product.findOne({ pid: acc.pid }),
        merchant: merchant,
      }).save();
    })
  );

  const updatedMerchant = await Merchant.findOne(
    {
      shopName: shop,
    },
    {
      relations: ["accessorySets", "accessorySets.accessories"],
    }
  );
  ctx.response.status = 200;
  ctx.response.body = updatedMerchant.accessorySets;
  return ctx;
}
