import { AccessorySet } from "../../../entities/AccessorySet";
import { Merchant } from "../../../entities/Merchant";

export async function deleteAccessorySet(ctx) {
  const merchant = await Merchant.findOne(
    {
      shopName: ctx.cookies.get("shopOrigin"),
    },
    {
      relations: ["accessorySets"],
    }
  );

  // If automatic just redo an automatic accessory set

  const toUpdate = merchant.accessorySets.filter((set) =>
    ctx.request.body.ids.includes(set.id)
  );

  if (merchant.automaticSets) {
    await Promise.all(
      toUpdate.map(async (a) => {
        a.type = "automatic";
        await a.save();
      })
    );
  } else {
    await AccessorySet.remove(toUpdate);
  }
  const updatedMerchant = await Merchant.findOne(
    {
      shopName: ctx.cookies.get("shopOrigin"),
    },
    {
      relations: ["accessorySets", "accessorySets.accessories"],
    }
  );
  ctx.response.status = 200;
  ctx.response.body = updatedMerchant.accessorySets.filter(
    (a) => a.type == "custom"
  );

  return ctx;
}
