import { NextApiRequest, NextApiResponse } from "next";
import { AccessorySet } from "../../../entities/AccessorySet";
import { Merchant } from "../../../entities/Merchant";
import initDB from "../../../utils/initDB";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(">API /api/accessorySets/get hit");
  await initDB.check();
  console.log("Cookie: ", req.cookies.shopOrigin);
  if (req.method === "GET") {
    const merchant = await Merchant.findOne({
      shopName: req.cookies.shopOrigin,
    });
    const results = await AccessorySet.find({ where: { merchant: merchant } });
    res.status(200).json(results);
  } else if (req.method === "POST" && req.body.id) {
    const merchant = await Merchant.findOne({
      shopName: req.cookies.shopOrigin,
    });
    const result = await AccessorySet.find({
      where: {
        merchant: merchant,
        id: req.body.id,
      },
    });
    if (!result) {
      res.status(400).end();
      return;
    }
    res.status(200).json(result);
  } else {
    res.status(400).end();
  }
}

export default handler;
