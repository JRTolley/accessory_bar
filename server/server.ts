import cors from "@koa/cors";
import createShopifyAuth, { verifyRequest } from "@shopify/koa-shopify-auth";
import graphQLProxy, { ApiVersion } from "@shopify/koa-shopify-graphql-proxy";
import { receiveWebhook } from "@shopify/koa-shopify-webhooks";
import dotenv from "dotenv";
import Koa, { Context } from "koa";
import Router from "koa-router";
import session from "koa-session";
import staticServe from "koa-static";
import next from "next";
import { createConnection } from "typeorm";
import { AccessorySet } from "../entities/AccessorySet";
import { Merchant } from "../entities/Merchant";
import { Product } from "../entities/Product";
import { StoreEvent } from "../entities/StoreEvent";
import { masterApi } from "./api/masterAPI";
import { installScriptTags } from "./shopfront/installScriptTags";

import { removeScriptTags } from "./shopfront/removeScriptTags";

import { updateMerchant } from "./updateMerchant";
import { receiveWebhooks, registerWebhooks } from "./webhooks/masterWebhook";
import { removeWebhooks } from "./webhooks/removeWebhooks";
dotenv.config();

const port = parseInt(process.env.PORT!, 10) || 8081;
const dev = process.env.NODE_ENV !== "production";
const app = next({
  dev,
});
const handle = app.getRequestHandler();
const { SHOPIFY_API_SECRET, SHOPIFY_API_KEY, SCOPES } = process.env;

app.prepare().then(async () => {
  const server = new Koa();
  const router = new Router();
  console.log(`> Starting for database ${process.env.TYPEORM_DATABASE}`);
  // Typeorm
  await createConnection({
    type: "postgres",
    host: process.env.TYPEORM_HOST,
    username: process.env.TYPEORM_USER,
    password: process.env.TYPEORM_PASSWORD,
    port: 5432,
    database: process.env.TYPEORM_DATABASE,
    synchronize: true,
    entities: [Merchant, AccessorySet, Product, StoreEvent],
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
      accessMode: "offline",
      async afterAuth(ctx: Context) {
        // Set up cookies
        console.log(`Creating auth for ${ctx.session.shop} `);
        const { shop, accessToken } = ctx.session;
        ctx.cookies.set("shopOrigin", shop, {
          httpOnly: false,
          secure: true,
          sameSite: "none",
        });
        await removeScriptTags(ctx);
        await installScriptTags(ctx);
        // Create billing
        // Create merchant
        await updateMerchant(shop, accessToken);
        // Webhooks
        await removeWebhooks(ctx);
        await registerWebhooks(ctx);
        ctx.redirect("/");
      },
    })
  );
  // Set cookie if no cookie
  server.use(async (ctx, next) => {
    if (!ctx.cookies.get("shopOrigin")) {
      ctx.cookies.set("shopOrigin", ctx.session.shop, {
        httpOnly: false,
        secure: true,
        sameSite: "none",
      });
    }
    await next();
  });

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
