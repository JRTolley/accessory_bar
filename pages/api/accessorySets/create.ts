import { NextApiRequest, NextApiResponse } from "next";
import { AccessorySet } from "../../../entities/AccessorySet";
import { Merchant } from "../../../entities/Merchant";
import initDB from "../../../utils/initDB";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("> API: /api/accessorySets/create hit");
  await initDB.check();
  if (req.method === "POST" && req.body) {
    // Get Merchant
    const merchant = await Merchant.findOne({
      shopName: req.cookies.shopOrigin,
    });
    const result = await AccessorySet.create({
      baseProduct: req.body[0],
      merchant: merchant,
    }).save();
    res.status(200).json(result);
  } else {
    res.status(400);
  }
}

export default handler;
