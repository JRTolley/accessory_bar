import Router from "koa-router";
import { get } from "./get";
import { reset } from "./reset";

export function masterShopfront(): Router {
  const masterShopfrontRouter = new Router();

  const apis = [get(), reset()];

  apis.forEach((api) => {
    masterShopfrontRouter.use(
      "/storefront",
      api.routes(),
      api.allowedMethods()
    );
  });

  return masterShopfrontRouter;
}
