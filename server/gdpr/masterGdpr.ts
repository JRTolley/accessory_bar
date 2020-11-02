import Router from "koa-router";
import { customersDataRequest } from "./customersDataRequest";
import { customersRedact } from "./customersRedact";

export function masterGdpr(): Router {
  const router = new Router();

  const apis = [customersDataRequest(), customersRedact()];

  apis.forEach((api) => {
    router.use("/webhooks", api.routes(), api.allowedMethods());
  });

  return router;
}
