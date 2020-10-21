import Router from "koa-router";
import {
  recieveAppSubscriptionUpdate,
  registerAppSubscriptionUpdate,
} from "./appSubscriptionUpdate";
import {
  registerProductsDelete,
  receiveProductsDelete,
} from "./productsDelete";
import {
  receiveProductsUpdate,
  registerProductsUpdate,
} from "./productsUpdate";

export async function registerWebhooks(ctx) {
  const { accessToken, shop } = ctx.session;
  await registerProductsUpdate(accessToken, shop);
  await registerProductsDelete(accessToken, shop);
  await registerAppSubscriptionUpdate(accessToken, shop);
}

export function receiveWebhooks(webhook): Router {
  let webhookRouter = new Router();
  let webhooks = [
    receiveProductsUpdate(webhook),
    receiveProductsDelete(webhook),
    recieveAppSubscriptionUpdate(webhook),
  ];

  webhooks.forEach((webhook) => {
    webhookRouter.use("", webhook.routes(), webhook.allowedMethods());
  });
  return webhookRouter;
}
