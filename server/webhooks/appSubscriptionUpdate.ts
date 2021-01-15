import { ApiVersion } from "@shopify/koa-shopify-graphql-proxy";
import { DeliveryMethod, registerWebhook } from "@shopify/koa-shopify-webhooks";

import Router from "koa-router";
import { Merchant } from "../../entities/Merchant";
import { extractPlan } from "../../utils/backend/extractPlan";

const { HOST } = process.env;

export async function registerAppSubscriptionUpdate(accessToken, shop) {
  const registration = await registerWebhook({
    address: `${HOST}/webhooks/appSubscription/update`,
    topic: "APP_SUBSCRIPTIONS_UPDATE",
    accessToken,
    shop,
    apiVersion: ApiVersion.April20,
    deliveryMethod: DeliveryMethod.Http,
  });

  if (registration.success) {
    console.log(`> ${shop} - App subscription webhook successfully registered`);
  } else {
    console.error(`! ${shop} - App subscription webhook registration failed!!`);
  }
}

export function recieveAppSubscriptionUpdate(webhook): Router {
  const webhookRouter = new Router();

  webhookRouter.post(
    "/webhooks/appSubscription/update",
    webhook,
    async (ctx) => {
      const payload = ctx.state.webhook.payload.app_subscription;
      const shopName = ctx.state.webhook.domain;
      console.log(`> ${shopName} - App Subscription Update webhook received`);
      console.log("> Webhook: ", ctx.state.webhook);
      const merchant = await Merchant.findOne({
        shopName,
      });

      // Ignore statuses
      if (
        payload.status === "ACCEPTED" ||
        payload.status === "PENDING" ||
        payload.status === "DECLINED"
      ) {
        console.log(`? ${shopName} - Ignoring non statuses`);
      }
      // Cancel plan statuses
      else if (
        payload.status === "CANCELLED" ||
        payload.status === "EXPIRED" ||
        payload.status === "FROZEN"
      ) {
        if (merchant.planType === extractPlan(payload.name)) {
          console.log(`> ${shopName} - Cancelling plan`);
          merchant.planType = "None";
          await merchant.save();
        }
      }
      // Activate statuses
      else if (payload.status === "ACTIVE") {
        console.log(`> ${shopName} - Activating new plan`);
        merchant.planType = extractPlan(payload.name);
        await merchant.save();
      } else {
        // Unknown status type
        console.log(`! ${shopName} - Unknown status: ${payload}`);
      }
    }
  );

  return webhookRouter;
}
