import Router from "koa-router";
import { register } from "ts-node";
import { get } from "./get";
import { reset } from "./reset";
import { registerClickthrough } from "./registerClickthrough";

export function masterShopfront(): Router {
  const masterShopfrontRouter = new Router();

  const apis = [get(), reset(), registerClickthrough()];

  apis.forEach((api) => {
    masterShopfrontRouter.use(
      "/storefront",
      api.routes(),
      api.allowedMethods()
    );
  });

  return masterShopfrontRouter;
}
