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

  const toDelete = merchant.accessorySets.filter((set) =>
    ctx.request.body.ids.includes(set.id)
  );

  await AccessorySet.remove(toDelete);

  const updatedMerchant = await Merchant.findOne(
    {
      shopName: ctx.cookies.get("shopOrigin"),
    },
    {
      relations: ["accessorySets", "accessorySets.accessories"],
    }
  );
  ctx.response.status = 200;
  ctx.response.body = updatedMerchant.accessorySets;

  return ctx;
}
