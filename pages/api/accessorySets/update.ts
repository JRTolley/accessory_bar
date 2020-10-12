import { NextApiRequest, NextApiResponse } from "next";
import { Accessory } from "../../../entities/Accessory";
import { AccessorySet } from "../../../entities/AccessorySet";
import { Merchant } from "../../../entities/Merchant";
import initDB from "../../../utils/initDB";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("> APi: /api/accessorySets/update");
  await initDB.check();
  if (req.method === "POST" && req.body.id && req.body.accessories) {
    const merchant = await Merchant.findOne({
      shopName: req.cookies.shopOrigin,
    });
    const toUpdate = merchant.accessorySets.filter(
      (set) => set.id === req.body.id
    )[0];

    // Make sure all inputs are unique
    req.body.accessories = req.body.accessories.filter(
      (n, i) => req.body.accessories.indexOf(n) === i
    );

    // Delete everything that is already there
    await Promise.all(
      toUpdate.accessories.map(async (acc) => {
        return await acc.remove();
      })
    );
    // Add all the ones we got
    await Promise.all(
      req.body.accessories.map(async (acc) => {
        return await Accessory.create({
          pid: acc,
          set: toUpdate,
        }).save();
      })
    );
    // Reload accessory set
    const result = await AccessorySet.findOne(toUpdate.id);
    res.status(200).json(result);
  } else {
    res.status(400).end();
  }
}

export default handler;
