import Router from "koa-router";
import { masterShopfront } from "./storefront/masterStorefront";
import bodyParser from "koa-body";
import { masterAccessorySets } from "./accessorySets/masterAccessorySets";
import { verifyRequest } from "@shopify/koa-shopify-auth";

export function masterApi(): Router {
  const masterApiRouter = new Router();

  masterApiRouter.use(bodyParser());
  masterApiRouter.use(verifyRequest()); // Gotta authenticate

  // Smart logging - Good job me
  masterApiRouter.use("/api", async (ctx, next) => {
    console.log("> API:", ctx.req.url, "-", ctx.req.method);
    await next();
  });

  const apis = [masterShopfront(), masterAccessorySets()];

  apis.forEach((api) => {
    masterApiRouter.use("/api", api.routes(), api.allowedMethods());
  });

  return masterApiRouter;
}
