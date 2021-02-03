import Router from "koa-router";
import { pollStatus } from "./pollStatus";
import { setEnabled } from "./setEnabled";

export function masterAutomaticSets(): Router {
  const router = new Router();

  const apis = [setEnabled(), pollStatus()];

  apis.forEach((api) => {
    router.use("/automaticSets", api.routes(), api.allowedMethods());
  });

  return router;
}
