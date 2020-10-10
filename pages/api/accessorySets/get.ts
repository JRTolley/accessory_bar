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
  } else {
    res.status(400).json("Method not supported");
  }
}

export default handler;
