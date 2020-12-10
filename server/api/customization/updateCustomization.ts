import { CustomizationOptions } from "../../../entities/CustomizationOptions";
import { Merchant } from "../../../entities/Merchant";

export async function updateCustomization(ctx) {
  if (!ctx.request.body) {
    ctx.response.status = 400;
    ctx.response.body = "No Update Options provided";
  }
  const { shop } = ctx.session;
  const merchant = await Merchant.findOne({
    shopName: shop,
  });
  let profile = await CustomizationOptions.findOne({
    merchant,
  });
  const properties = [
    "title",
    "titleFont",
    "titleFontSize",
    "itemMaxXSize",
    "itemFont",
    "itemFontSize",
    "itemPaddingX",
    "barPaddingX",
    "barPaddingY",
  ];
  properties.forEach((p) => {
    if (ctx.request.body[p] || ctx.request.body[p] === null) {
      profile[p] = ctx.request.body[p];
    }
  });
  await profile.save();
  console.log(profile);
  ctx.response.status = 204;
  ctx.response.body = profile;
  return ctx;
}
