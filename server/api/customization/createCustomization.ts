import { Merchant } from "../../../entities/Merchant";
import { CustomizationOptions } from "../../../entities/CustomizationOptions";

export async function createCustomization(ctx) {
  const { shop } = ctx.session;
  const merchant = await Merchant.findOne({
    shopName: shop,
  });
  if (!merchant) throw new Error(`! Merchant not defined on ${shop}`);
  const customizationOptions = await CustomizationOptions.create({
    merchant: merchant,
  }).save();

  ctx.response.status = 200;
  ctx.response.body = customizationOptions;
  return ctx;
}
