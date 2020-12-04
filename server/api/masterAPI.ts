import Router from "koa-router";
import { masterShopfront } from "./storefront/masterStorefront";
import bodyParser from "koa-body";
import { masterAccessorySets } from "./accessorySets/masterAccessorySets";
import { verifyRequest } from "@shopify/koa-shopify-auth";
import { masterBilling } from "./billing/masterBilling";
import { masterMerchant } from "./merchant/masterMerchant";
import { masterUtil } from "./util/masterUtil";
import { masterGdpr } from "./gdpr/masterGdpr";
import { masterCustomization } from "./customization/masterCustomization";

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
    masterBilling(),
    masterMerchant(),
    masterUtil(),
    masterGdpr(),
    masterCustomization(),
  ];

  apis.forEach((api) => {
    masterApiRouter.use("/api", api.routes(), api.allowedMethods());
  });

  masterApiRouter.use(
    "/api/accessorySets",
    masterAccessorySets().routes(),
    masterAccessorySets().allowedMethods()
  );

  masterApiRouter.use(
    "/api/customization",
    masterCustomization().routes(),
    masterCustomization().allowedMethods()
  );

  return masterApiRouter;
}
