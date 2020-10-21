import Router from "koa-router";
import { installScriptTags } from "../../shopfront/installScriptTags";
import { removeScriptTags } from "../../shopfront/removeScriptTags";
import { registerWebhooks } from "../../webhooks/masterWebhook";
import { removeWebhooks } from "../../webhooks/removeWebhooks";

const { HOST } = process.env;

export function reset(): Router {
  const router = new Router();

  router.get("/reset", async (ctx, next) => {
    // Reset Script Tags
    await removeScriptTags(ctx);
    await installScriptTags(ctx, HOST);
    // Reset webhooks
    await removeWebhooks(ctx);
    await registerWebhooks(ctx);
    ctx.response.status = 204;
  });

  return router;
}
