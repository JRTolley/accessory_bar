import { createClient } from "urql";
import { createScript } from "../../graphql/mutations/createScript";

export async function installScriptTags(ctx, host) {
  const { accessToken, shop } = ctx.session;

  // Create urql client
  const client = createClient({
    url: `https://${shop}/admin/api/2020-07/graphql.json`,
    fetchOptions: {
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": accessToken,
      },
    },
  });

  // Send request
  const res = await client
    .query(createScript, {
      displayScope: "ONLINE_STORE",
      // src: `${host}/index.min.js`,
      src: `https://cdn.shopify.com/s/files/1/0425/8273/7063/files/index.min.js?v=1603464992`,
    })
    .toPromise();

  if (!res.error) {
    console.log(`> ${shop} - Script tag successfully installed`);
  } else {
    console.error(`! ${shop} - Script tag installation failure`);
  }
}
