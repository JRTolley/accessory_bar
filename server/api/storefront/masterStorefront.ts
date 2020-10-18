import Router from "koa-router";
import { get } from "./get";

export function masterShopfront(): Router {
  const masterShopfrontRouter = new Router();

  masterShopfrontRouter.use(
    "/storefront",
    get().routes(),
    get().allowedMethods()
  );

  return masterShopfrontRouter;
}
