import { NextApiRequest, NextApiResponse } from "next";
import { AccessorySet } from "../../../entities/AccessorySet";
import { Merchant } from "../../../entities/Merchant";
import { Product } from "../../../entities/Product";
import createNewProducts from "../../../utils/backend/createNewProducts";
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

    // Create new products if necessary
    await createNewProducts(merchant, req.body.accessories);

    // Make sure all inputs are unique
    const pids = req.body.accessories.map((acc) => acc.pid);
    req.body.accessories = req.body.accessories.filter(
      (n, i) => pids.indexOf(n.pid) === i
    );
    console.log("Req Body: ", req.body.accessories);
    // Lose all the current references
    // toUpdate.accessories = null;
    // await toUpdate.save();
    // Add all the ones we got
    const productsToAdd: Product[] = await Promise.all(
      req.body.accessories
        .map((acc) => acc.pid)
        .map(async (pid) => {
          return await Product.findOne({ pid });
        })
    );

    toUpdate.accessories = productsToAdd;
    await toUpdate.save();
    // Reload accessory set
    const result = await AccessorySet.findOne(toUpdate.id);
    res.status(200).json(result);
  } else {
    res.status(400).end();
  }
}

export default handler;
