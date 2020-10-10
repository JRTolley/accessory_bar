import { NextApiRequest, NextApiResponse } from "next";
import { Merchant } from "../../entities/Merchant";
import initDB from "../../utils/initDB";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await initDB.check();
  await Merchant.create({ shopName: "Fake" }).save();
  res.json(await Merchant.find());
}

export default handler;
