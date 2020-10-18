import { createClient } from "urql";
import { createScript } from "../graphql/mutations/createScript";

export async function installShopfront(accessToken, shop, host) {
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
      src: `${host}/index.min.js`,
    })
    .toPromise();

  if (!res.error) {
    console.log(`> ${shop} - Script tag successfully installed`);
  } else {
    console.error(`! ${shop} - Script tag installation failure`);
  }
}
