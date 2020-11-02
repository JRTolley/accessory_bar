import Router from "koa-router";
import { customersDataRequest } from "./customersDataRequest";
import { customersRedact } from "./customersRedact";
import { shopRedact } from "./shopRedact";

export function masterGdpr(): Router {
  const router = new Router();

  const apis = [customersDataRequest(), customersRedact(), shopRedact()];

  apis.forEach((api) => {
    router.use("/gdpr", api.routes(), api.allowedMethods());
  });

  return router;
}
