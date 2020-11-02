import Router from "koa-router";

export function customersRedact(): Router {
  const router = new Router();

  router.post("/customers/redact", async (ctx, next) => {
    // don't do anything because we don't store customer data
    ctx.response.status = 204;
  });

  return router;
}
