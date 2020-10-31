import Router from "koa-router";
import { masterShopfront } from "./storefront/masterStorefront";
import bodyParser from "koa-body";
import { masterAccessorySets } from "./accessorySets/masterAccessorySets";
import { verifyRequest } from "@shopify/koa-shopify-auth";
import { masterBilling } from "./billing/masterBilling";
import { masterMerchant } from "./merchant/masterMerchant";
import { masterUtil } from "./util/masterUtil";

export function masterApi(): Router {
  const masterApiRouter = new Router();

  masterApiRouter.use(bodyParser());
  masterApiRouter.use(verifyRequest()); // Gotta authenticate

  // Smart logging - Good job me
  masterApiRouter.use("/api", async (ctx, next) => {
    console.log("> API:", ctx.req.url, "-", ctx.req.method);
    await next();
  });

  const apis = [
    masterShopfront(),
    masterAccessorySets(),
    masterBilling(),
    masterMerchant(),
    masterUtil(),
  ];

  apis.forEach((api) => {
    masterApiRouter.use("/api", api.routes(), api.allowedMethods());
  });

  return masterApiRouter;
}
