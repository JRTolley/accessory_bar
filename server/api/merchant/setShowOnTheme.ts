import Router from "koa-router";
import { Merchant } from "../../../entities/Merchant";
import { hasCorrectScriptTags } from "../../shopfront/hasCorrectScriptTags";
import { installScriptTags } from "../../shopfront/installScriptTags";
import { removeScriptTags } from "../../shopfront/removeScriptTags";

const { HOST } = process.env;

export function setShowOnTheme(): Router {
  const router = new Router();

  router.post("/setShowOnTheme", async (ctx, next) => {
    const { shop } = ctx.session;
    const merchant = await Merchant.findOne({ shopName: shop });
    merchant.showOnThemeEditor = ctx.request.body.showOnThemeEditor;
    await merchant.save();

    const already_installed = await hasCorrectScriptTags(
      merchant.shopName,
      merchant.accessToken,
      `${HOST}/index.min.js`
    );

    if (
      merchant.showOnThemeEditor &&
      already_installed !== undefined &&
      !already_installed
    ) {
      installScriptTags(ctx);
    } else if (!merchant.enabled && !merchant.showOnThemeEditor) {
      removeScriptTags(ctx);
    }

    ctx.response.status = 204;
  });

  return router;
}
