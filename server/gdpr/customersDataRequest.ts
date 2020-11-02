import Router from "koa-router";

export function customersDataRequest(): Router {
  const router = new Router();

  router.post("/customers/dataRequest", async (ctx, next) => {
    // Do nothing because we don't store customer data
    ctx.response.status = 204;
  });

  return router;
}
