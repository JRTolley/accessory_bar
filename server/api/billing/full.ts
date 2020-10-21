import { access } from "fs";
import Router from "koa-router";
import { createSubscription } from "../../billing/createSubscription";

export function full(): Router {
  const router = new Router();

  router.get("/full", async (ctx, next) => {
    const { shop, accessToken } = ctx.session;
    const res = await createSubscription(ctx, "Full", 7.99);
    ctx.response.status = 200;
    ctx.response.body = res;
  });

  return router;
}
