import { createClient } from "urql";
import { appSubscriptionCreate } from "../../graphql/mutations/appSubscriptionCreate";

export async function createSubscription(ctx, name, price) {
  const { shop, accessToken } = ctx.session;

  const client = createClient({
    url: `https://${shop}/admin/api/2019-10/graphql.json`,
    fetchOptions: {
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": accessToken,
      },
    },
  });

  const result = await client
    .mutation(appSubscriptionCreate, {
      name: `Accessory Bar - ${name} Plan`,
      returnUrl: `${process.env.HOST}`,
      price,
    })
    .toPromise();

  console.log(
    "Mutation result: ",
    result.data.appSubscriptionCreate.userErrors
  );
  // console.log("Redirecting");
  console.log(`> ${shop} - Subscription Created`);
  const confirmationUrl = result.data.appSubscriptionCreate.confirmationUrl;
  const withoutShop = confirmationUrl.split("/").slice(4).join("/");
  return withoutShop;
}
