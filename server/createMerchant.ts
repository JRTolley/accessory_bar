import { Merchant } from "../entities/Merchant";

export async function createMerchant(shop: string) {
  console.log(`> ${shop} - Checking Merchant`);
  if (!(await Merchant.findOne({ where: { shopName: shop } }))) {
    console.log(`Creating new merchant - ${shop}`);
    const merchant = await Merchant.create({ shopName: shop }).save();
  }
}
