import { registerWebhook } from "@shopify/koa-shopify-webhooks";
import {
  ApiVersion,
  DeliveryMethod,
} from "@shopify/koa-shopify-webhooks/build/ts/register";
import Router from "koa-router";
import { Product } from "../../entities/Product";

const { HOST } = process.env;

export async function registerProductsDelete(accessToken, shop) {
  const registration = await registerWebhook({
    address: `${HOST}/webhooks/products/delete`,
    topic: "PRODUCTS_DELETE",
    accessToken,
    shop,
    apiVersion: ApiVersion.April20,
    deliveryMethod: DeliveryMethod.Http,
  });

  if (registration.success) {
    console.log(`> ${shop} - Product delete webhook successfully registered`);
  } else {
    console.error(`! ${shop} - Product delete webhook registration failed!!`);
  }
}

export function receiveProductsDelete(webhook): Router {
  let webhookRouter = new Router();
  webhookRouter.post("/webhooks/products/delete", webhook, async (ctx) => {
    console.log(
      `> ${ctx.state.webhook.domain} - Product Delete webhook received`
    );
    // console.log("> Webhook:  ", ctx.state.webhook);
    const payload = ctx.state.webhook.payload;
    const pid = `gid://shopify/Product/${payload.id}`;
    const toDelete = await Product.findOne({ pid });
    if (!toDelete) {
      console.log(
        `! ${ctx.state.webhook.domain} - ${pid} not found for deletion`
      );
      return;
    }
    await toDelete.remove();
  });
  return webhookRouter;
}
