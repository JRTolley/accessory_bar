import Router from "koa-router";
import { createCustomization } from "./createCustomization";
import { getCustomization } from "./getCustomization";

export function masterCustomization(): Router {
  const router = new Router();

  router.post("/create", async (ctx, next) => {
    ctx = await createCustomization(ctx);
  });

  router.get("/get", async (ctx, next) => {
    ctx = await getCustomization(ctx);
  });

  router.post("/update", async (ctx, next) => {});

  return router;
}
