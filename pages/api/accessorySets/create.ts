import { NextApiRequest, NextApiResponse } from "next";
import { AccessorySet } from "../../../entities/AccessorySet";
import { Merchant } from "../../../entities/Merchant";
import { Product } from "../../../entities/Product";
import createNewProducts from "../../../utils/backend/createNewProducts";
import initDB from "../../../utils/initDB";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("> API: /api/accessorySets/create hit");
  await initDB.check();
  if (req.method === "POST" && req.body.accessories) {
    // Get Merchant
    const merchant = await Merchant.findOne({
      shopName: req.cookies.shopOrigin,
    });

    // Create new products
    await createNewProducts(merchant, req.body.accessories);

    // Don't waste energy on duplicates
    const existingSets = merchant.accessorySets.map(
      (set) => set.baseProduct.pid
    );
    const toCreate = req.body.accessories.filter(
      (acc) => !existingSets.includes(acc.pid)
    );

    await Promise.all(
      toCreate.map(async (acc) => {
        const baseProduct = await Product.findOne({ pid: acc.pid });
        console.log("BaseProduct: ", baseProduct);
        return await AccessorySet.create({
          baseProduct,
          merchant: merchant,
        }).save();
      })
    );

    const updatedMerchant = await Merchant.findOne({
      shopName: req.cookies.shopOrigin,
    });
    res.status(200).json(updatedMerchant.accessorySets);
  } else {
    res.status(400).end();
  }
}

export default handler;
