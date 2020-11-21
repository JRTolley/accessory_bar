import { createClient, fetchExchange } from "urql";
import { getScriptTags } from "../../graphql/queries/getScriptTags";

export async function hasCorrectScriptTags(
  shop,
  accessToken,
  override_src = undefined
) {
  const prod = process.env.NODE_ENV === "production";
  let correctTag = prod
    ? process.env.SHOPFRONT_SCRIPT_SRC
    : process.env.HOST + "/index.min.js";
  if (override_src) {
    correctTag = override_src;
  }

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

  if (res.data) {
    if (res.data.scriptTags.edges.length !== 1) {
      return false;
    }
    if (res.data.scriptTags.edges[0].node.src !== correctTag) {
      console.log("Hit");
      return false;
    }
    return true;
  }
  return undefined;
}
