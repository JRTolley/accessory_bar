import { CustomizationOptions } from "../../../entities/CustomizationOptions";
import { Merchant } from "../../../entities/Merchant";

export async function getCustomization(ctx) {
  // const shop = ctx.cookies.get("shopOrigin");
  const merchant = await Merchant.findOne({
    shopName: ctx.cookies.get("shopOrigin"),
  });
  if (!merchant) throw new Error(`! Merchant not defined on getCustomization`);
  const customizationOptions = await CustomizationOptions.findOne({
    where: {
      merchant,
    },
  });
  if (customizationOptions) {
    ctx.response.status = 200;
    ctx.response.body = customizationOptions;
  } else {
    ctx.response.status = 204;
  }
  return ctx;
}
