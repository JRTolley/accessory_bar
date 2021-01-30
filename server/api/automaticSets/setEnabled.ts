import Router from "koa-router";
import { AccessorySet } from "../../../entities/AccessorySet";
import { Merchant } from "../../../entities/Merchant";
import { Product } from "../../../entities/Product";

async function createRandomSet(keyProduct, products, merchant) {
  // If the product already exists don't do anything
  if (await AccessorySet.findOne({ where: { baseProduct: keyProduct } })) {
    console.log("Woop");
    return;
  }
  // products.filter(p !== keyProduct)
  const accessories = products
    .filter((p) => p !== keyProduct)
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.min(5, products.length - 1));
  console.log("Start: ", accessories);
  await AccessorySet.create({
    baseProduct: keyProduct,
    merchant,
    type: "automatic",
    accessories,
  }).save();
  console.log("Woop");
}

export function setEnabled(): Router {
  const router = new Router();

  router.post("/setEnabled", async (ctx, next) => {
    const { shop } = ctx.session;
    const merchant = await Merchant.findOne({ shopName: shop });
    merchant.automaticSets = ctx.request.body.enabled;
    await merchant.save();

    console.log("Enabled: ", merchant.automaticSets);

    // TODO - Create the Automatic Responses
    // If disabled delete accessory sets
    if (!merchant.automaticSets) {
      await AccessorySet.delete({ type: "automatic", merchant });
      console.log(
        "Deleted, Sets remaining: ",
        await AccessorySet.find({ merchant })
      );
    }
    // If enabled create accessory sets
    else if (merchant.automaticSets) {
      // Get all products
      // TODO gotta get all the remaining accessories aswell.
      const products = await Product.find({ where: { merchant } });
      console.log("Product: ", products.length);
      await Promise.all(
        products.map(async (product) => {
          return await createRandomSet(product, products, merchant);
        })
      );
      console.log(await AccessorySet.find());
    }

    ctx.response.status = 200;
    ctx.response.body = merchant;
  });

  return router;
}
