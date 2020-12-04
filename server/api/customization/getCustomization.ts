import { CustomizationOptions } from "../../../entities/CustomizationOptions";
import { Merchant } from "../../../entities/Merchant";

export async function getCustomization(ctx) {
  const { shop } = ctx.session;
  const merchant = await Merchant.findOne({
    shopName: shop,
  });
  if (!merchant) throw new Error(`! Merchant not defined on ${shop}`);
  const customizationOptions = await CustomizationOptions.findOne({
    where: {
      merchant,
    },
  });
  if (getCustomization) {
    ctx.response.status = 200;
    ctx.response.body = customizationOptions;
  } else {
    ctx.response.status = 204;
  }
  return ctx;
}
