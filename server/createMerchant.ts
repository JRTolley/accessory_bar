import { Merchant } from "../entities/Merchant";

export async function createMerchant(shop: string) {
  if (!(await Merchant.findOne({ where: { shopName: shop } }))) {
    const merchant = await Merchant.create({ shopName: shop }).save();
  }
  console.log("Merchants: ", await Merchant.find());
}
