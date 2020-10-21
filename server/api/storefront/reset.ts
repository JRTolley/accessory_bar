import Router from "koa-router";

export function reset(): Router {
  const router = new Router();

  return router;
}
