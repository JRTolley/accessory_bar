import { createClient, fetchExchange } from "urql";
import { getScriptTags } from "../../graphql/queries/getScriptTags";

export async function checkScriptTags(shop, accessToken, correctTag) {
  const client = createClient({
    url: `https://${shop}/admin/api/2020-07/graphql.json`,
    fetchOptions: {
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": accessToken,
      },
    },
    requestPolicy: "network-only",
    exchanges: [fetchExchange],
  });
  console.log(`Checking ${shop} | ${accessToken}`);

  // Script tags
  const res = await client.query(getScriptTags).toPromise();

  console.log("Res: ", res);

  return false;
}
