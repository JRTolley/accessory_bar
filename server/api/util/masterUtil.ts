import Router from "koa-router";
import { feedback } from "./feedback";

export function masterUtil(): Router {
  const router = new Router();
  const apis = [feedback()];

  apis.forEach((api) => {
    router.use("/util", api.routes(), api.allowedMethods());
  });

  return router;
}
