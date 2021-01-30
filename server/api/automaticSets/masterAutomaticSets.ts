import Router from "koa-router";
import { setEnabled } from "./setEnabled";

export function masterAutomaticSets(): Router {
  const router = new Router();

  const apis = [setEnabled()];

  apis.forEach((api) => {
    router.use("/automaticSets", api.routes(), api.allowedMethods());
  });

  return router;
}
