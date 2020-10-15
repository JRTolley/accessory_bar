import { NextApiRequest, NextApiResponse } from "next";
import { AccessorySet } from "../../../entities/AccessorySet";
import { Merchant } from "../../../entities/Merchant";
import { Product } from "../../../entities/Product";
import initDB from "../../../utils/initDB";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("> API: /api/storefront/ hit");
  await initDB.check();
  // gotta destringify body
  req.body = JSON.parse(req.body);
  console.log("Req Body", req.body);
  if (req.method === "POST" && req.body) {
    console.log("Entered");
    const merchant = await Merchant.findOne({
      shopName: req.cookies.shopOrigin,
    });
    if (!merchant) {
      console.error("Merchant wasn't defined");
    }
    const realPid = `gid://shopify/Product/${req.body.product_id}`;
    const accessorySet = await AccessorySet.findOne({
      merchant,
      baseProduct: await Product.findOne({ pid: realPid }),
    });
    if (!accessorySet) {
      console.log("No accessory set found");
      res.status(204).end();
    } else {
      // Success
      res.status(200).json(accessorySet.accessories);
    }
  } else {
    res.status(400).end();
  }
}

export default handler;
