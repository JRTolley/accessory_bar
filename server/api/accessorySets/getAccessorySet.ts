import Router from "koa-router";
import { AccessorySet } from "../../../entities/AccessorySet";
import { Merchant } from "../../../entities/Merchant";

export async function getAllAccessorySets(ctx) {
  const merchant = await Merchant.findOne({
    shopName: ctx.cookies.get("shopOrigin"),
  });
  console.log("Shop Origin: ", ctx.session.shop);
  const results = await AccessorySet.find({
    where: { merchant },
    relations: ["accessories"],
  });
  ctx.response.status = 200;
  ctx.response.body = results;

  return ctx;
}

export async function getOneAccessorySet(ctx) {
  const body = ctx.request.body;

  const merchant = await Merchant.findOne({
    shopName: ctx.cookies.get("shopOrigin"),
  });

  const accessorySet = await AccessorySet.findOne({
    where: { merchant, id: body.id },
    relations: ["accessories"],
  });

  if (!accessorySet) {
    ctx.response.status = 400;
  } else {
    ctx.response.status = 200;
    ctx.response.body = accessorySet;
  }
  return ctx;
}
