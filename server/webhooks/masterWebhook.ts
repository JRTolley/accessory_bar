import Router from "koa-router";
import {
  registerProductsDelete,
  receiveProductsDelete,
} from "./productsDelete";
import {
  receiveProductsUpdate,
  registerProductsUpdate,
} from "./productsUpdate";

export async function registerWebhooks(accessToken, shop) {
  await registerProductsUpdate(accessToken, shop);
  await registerProductsDelete(accessToken, shop);
}

export function receiveWebhooks(webhook): Router {
  let webhookRouter = new Router();
  let webhooks = [
    receiveProductsUpdate(webhook),
    receiveProductsDelete(webhook),
  ];

  webhooks.forEach((webhook) => {
    webhookRouter.use("", webhook.routes(), webhook.allowedMethods());
  });
  return webhookRouter;
}
