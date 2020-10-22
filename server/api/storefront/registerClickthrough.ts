import { Console } from "console";
import Router from "koa-router";
import { Product } from "../../../entities/Product";

export function registerClickthrough(): Router {
  const router = new Router();

  router.post("/registerClickthrough", async (ctx, next) => {
    console.log("Clickthrough detected: ", ctx.request.body);
    const product = await Product.findOne({
      pid: JSON.parse(ctx.request.body),
    });
    product.incrementClickthroughs();
    ctx.response.status = 204;
  });

  return router;
}
