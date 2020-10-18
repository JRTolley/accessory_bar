import dotenv from "dotenv";
import Koa, { Context } from "koa";
import session from "koa-session";
import Router from "koa-router";
import staticServe from "koa-static";
import cors from "@koa/cors";
import {
  DeliveryMethod,
  receiveWebhook,
  registerWebhook,
} from "@shopify/koa-shopify-webhooks";
import createShopifyAuth, { verifyRequest } from "@shopify/koa-shopify-auth";
import graphQLProxy, { ApiVersion } from "@shopify/koa-shopify-graphql-proxy";
import next from "next";
import initDB from "../utils/initDB";
import { createMerchant } from "./createMerchant";
import { installShopfront } from "./installShopfront";
import { register } from "ts-node";
import { receiveWebhooks, registerWebhooks } from "./webhooks/masterWebhook";
import { masterApi } from "./api/masterAPI";
import { createConnection } from "typeorm";
import { Merchant } from "../entities/Merchant";
import { AccessorySet } from "../entities/AccessorySet";
import { Product } from "../entities/Product";
dotenv.config();

const port = parseInt(process.env.PORT!, 10) || 8081;
const dev = process.env.NODE_ENV !== "production";
const app = next({
  dev,
});
const handle = app.getRequestHandler();
const { SHOPIFY_API_SECRET, SHOPIFY_API_KEY, SCOPES, HOST } = process.env;

app.prepare().then(async () => {
  const server = new Koa();
  const router = new Router();
  // Typeorm
  await createConnection({
    type: "postgres",
    username: "postgres",
    password: "1234",
    port: 5432,
    database: "shopify",
    synchronize: true,
    entities: [Merchant, AccessorySet, Product],
  });
  // Serve the static script for the storefront
  server.use(
    cors({
      credentials: true,
    })
  );
  server.use(staticServe("./public"));
  // Session
  server.use(session({ sameSite: "none", secure: true }, server));
  server.keys = [SHOPIFY_API_SECRET];
  // Auth
  server.use(
    createShopifyAuth({
      apiKey: SHOPIFY_API_KEY,
      secret: SHOPIFY_API_SECRET,
      scopes: [SCOPES],

      async afterAuth(ctx: Context) {
        // Set up cookies
        const { shop, accessToken } = ctx.session;
        ctx.cookies.set("shopOrigin", shop, {
          httpOnly: false,
          secure: true,
          sameSite: "none",
        });
        await installShopfront(accessToken, shop, HOST);
        ctx.redirect("/");
        // Create merchant
        createMerchant(shop);

        // Webhooks
        registerWebhooks(accessToken, shop);
      },
    })
  );

  // Webhooks
  const webhook = receiveWebhook({
    secret: SHOPIFY_API_SECRET,
    // onReceived: () => {
    //   console.log("Webhook received");
    // },
  });
  const masterWebhook = receiveWebhooks(webhook);
  router.use("", masterWebhook.routes(), masterWebhook.allowedMethods());

  // API
  router.use("", masterApi().routes(), masterApi().allowedMethods());

  // Graphql proxy
  server.use(
    graphQLProxy({
      version: ApiVersion.April20,
    })
  );

  // Routing
  router.get("(.*)", verifyRequest(), async (ctx: Context) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;
  });
  router.post("(.*)", verifyRequest(), async (ctx: Context) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;
  });
  server.use(router.allowedMethods());
  server.use(router.routes());
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});

export default app;
