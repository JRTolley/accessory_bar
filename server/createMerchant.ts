import { Merchant } from "../entities/Merchant";

export async function createMerchant(shop: string, accessToken: string) {
  console.log(`> ${shop} - Checking Merchant`);
  const merchant = await Merchant.findOne({ where: { shopName: shop } });
  if (!merchant) {
    console.log(`Creating new merchant - ${shop}`);
    const merchant = await Merchant.create({
      shopName: shop,
      accessToken,
    }).save();
  } else if (merchant.accessToken === null) {
    // If no accessToken make sure to grab one
    merchant.accessToken = accessToken;
    await merchant.save();
  }
}
