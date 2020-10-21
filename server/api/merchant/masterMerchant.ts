import Router from "koa-router";
import { get } from "./get";

export function masterMerchant(): Router {
  const router = new Router();

  const apis = [get()];

  apis.forEach((api) => {
    router.use("/merchant", api.routes(), api.allowedMethods());
  });

  return router;
}
