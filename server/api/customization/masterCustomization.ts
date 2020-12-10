import Router from "koa-router";
import { createCustomization } from "./createCustomization";
import { getCustomization } from "./getCustomization";
import { updateCustomization } from "./updateCustomization";

export function masterCustomization(): Router {
  const router = new Router();

  router.post("/create", async (ctx, next) => {
    ctx = await createCustomization(ctx);
  });

  router.get("/get", async (ctx, next) => {
    ctx = await getCustomization(ctx);
  });

  router.post("/update", async (ctx, next) => {
    ctx = await updateCustomization(ctx);
  });

  return router;
}
