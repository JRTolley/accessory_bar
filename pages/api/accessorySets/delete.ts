import { NextApiRequest, NextApiResponse } from "next";
import { AccessorySet } from "../../../entities/AccessorySet";
import { Merchant } from "../../../entities/Merchant";
import initDB from "../../../utils/initDB";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("> API: /api/accessorySets/delete hit");
  await initDB.check();
  if (req.method === "POST" && req.body.ids) {
    // Delete ets
    const merchant = await Merchant.findOne({
      shopName: req.cookies.shopOrigin,
    });
    // Get the right accessory sets
    const toDelete = merchant.accessorySets.filter((set) =>
      req.body.ids.includes(set.id)
    );
    await AccessorySet.remove(toDelete);

    const updatedMerchant = await Merchant.findOne({
      shopName: req.cookies.shopOrigin,
    });
    res.status(200).json(updatedMerchant.accessorySets);
  } else {
    res.status(400).end();
  }
}

export default handler;
