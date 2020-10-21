import Router from "koa-router";
import { couldStartTrivia } from "typescript";
import { Merchant } from "../../../entities/Merchant";

export function get(): Router {
  const router = new Router();

  router.get("/get", async (ctx, next) => {
    const { shop } = ctx.session;
    const merchant = await Merchant.findOne({ shopName: shop });
    ctx.response.status = 200;
    ctx.response.body = merchant;
  });
  return router;
}
