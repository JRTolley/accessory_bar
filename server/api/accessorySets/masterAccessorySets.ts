import Router from "koa-router";
import { createAccessorySet } from "./createAccessorySet";
import { deleteAccessorySet } from "./deleteAccessorySet";
import { getAllAccessorySets, getOneAccessorySet } from "./getAccessorySet";
import { updateAccessorySet } from "./updateAccessorySet";

export function masterAccessorySets(): Router {
  const router = new Router();

  router.post("/create", async (ctx, next) => {
    ctx = await createAccessorySet(ctx);
  });

  router.post("/delete", async (ctx, next) => {
    ctx = await deleteAccessorySet(ctx);
  });

  router.get("/get", async (ctx, next) => {
    ctx = await getAllAccessorySets(ctx);
  });

  router.post("/get", async (ctx, next) => {
    ctx = await getOneAccessorySet(ctx);
  });

  router.post("/update", async (ctx, next) => {
    ctx = await updateAccessorySet(ctx);
  });

  return router;
}
