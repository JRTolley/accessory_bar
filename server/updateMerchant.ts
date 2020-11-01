import { Merchant } from "../entities/Merchant";

export async function updateMerchant(shop: string, accessToken: string) {
  console.log(`> ${shop} - Checking Merchant`);
  const merchant = await Merchant.findOne({ where: { shopName: shop } });
  if (!merchant) {
    console.log(`Creating new merchant - ${shop}`);
    const merchant = await Merchant.create({
      shopName: shop,
      accessToken,
    }).save();
    return;
  } else {
    merchant.accessToken = accessToken;
    await merchant.save();
  }
}
