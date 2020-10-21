import Router from "koa-router";
import { beta } from "./beta";
import { full } from "./full";
import { pro } from "./pro";

export function masterBilling(): Router {
  const router = new Router();
  const apis = [beta(), full(), pro()];

  apis.forEach((api) => {
    router.use("/billing", api.routes(), api.allowedMethods());
  });

  return router;
}
