import { registerWebhook } from "@shopify/koa-shopify-webhooks";
import {
  ApiVersion,
  DeliveryMethod,
} from "@shopify/koa-shopify-webhooks/build/ts/register";
import Router from "koa-router";
import { Product } from "../../entities/Product";

const { HOST } = process.env;

export async function registerProductsUpdate(accessToken, shop) {
  const registration = await registerWebhook({
    address: `${HOST}/webhooks/products/update`,
    topic: "PRODUCTS_UPDATE",
    accessToken,
    shop,
    apiVersion: ApiVersion.April20,
    deliveryMethod: DeliveryMethod.Http,
  });

  if (registration.success) {
    console.log(`> ${shop} - Product update webhook successfully registered`);
  } else {
    console.error(`! ${shop} - Product update webhook registration failed!!`);
  }
}

export function receiveProductsUpdate(webhook): Router {
  let webhookRouter = new Router();
  webhookRouter.post("/webhooks/products/update", webhook, async (ctx) => {
    console.log(
      `> ${ctx.state.webhook.domain} - Product Update webhook received`
    );
    // console.log("> Webhook: ", ctx.state.webhook);
    const payload = ctx.state.webhook.payload;
    const pid = payload.admin_graphql_api_id;
    const toUpdate = await Product.findOne({ pid });
    if (!toUpdate) {
      console.log(`! ${ctx.state.webhook.domain} - ${pid} not found`);
      return;
    }
    toUpdate.img = payload.image.src;
    toUpdate.title = payload.title;
    toUpdate.price = payload.variants[0].price;
    await toUpdate.save();
  });
  return webhookRouter;
}
