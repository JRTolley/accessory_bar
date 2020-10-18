import Router from "koa-router";
import { create } from "./create";
import { deleteRoute } from "./delete";
import { get } from "./get";
import { update } from "./update";

export function masterAccessorySets(): Router {
  const router = new Router();

  const apis = [get(), create(), deleteRoute(), update()];

  apis.forEach((api) => {
    router.use("/accessorySets", api.routes(), api.allowedMethods());
  });

  return router;
}
