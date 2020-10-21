import Router from "koa-router";
import { createSubscription } from "../../billing/createSubscription";

export function pro(): Router {
  const router = new Router();

  router.get("/pro", async (ctx, next) => {
    const res = await createSubscription(ctx, "Pro", 29.99);
    ctx.response.status = 200;
    ctx.response.body = res;
  });

  return router;
}
