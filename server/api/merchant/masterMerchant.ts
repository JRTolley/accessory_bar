import Router from "koa-router";
import { get } from "./get";
import { setEnabled } from "./setEnabled";

export function masterMerchant(): Router {
  const router = new Router();

  const apis = [get(), setEnabled()];

  apis.forEach((api) => {
    router.use("/merchant", api.routes(), api.allowedMethods());
  });

  return router;
}
