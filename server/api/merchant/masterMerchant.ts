import Router from "koa-router";
import { get } from "./get";
import { setEnabled } from "./setEnabled";
import { setShowOnTheme } from "./setShowOnTheme";

export function masterMerchant(): Router {
  const router = new Router();

  const apis = [get(), setEnabled(), setShowOnTheme()];

  apis.forEach((api) => {
    router.use("/merchant", api.routes(), api.allowedMethods());
  });

  return router;
}
