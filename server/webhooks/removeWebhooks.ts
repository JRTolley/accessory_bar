import { createClient } from "urql";
import { webhookSubscriptionDelete } from "../../graphql/mutations/webhookSubscriptionDelete";
import { getWebhooks } from "../../graphql/queries/getWebhooks";

export async function removeWebhooks(ctx) {
  const { accessToken, shop } = ctx.session;

  const client = createClient({
    url: `https://${shop}/admin/api/2020-07/graphql.json`,
    fetchOptions: {
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": accessToken,
      },
    },
  });

  const res = await client.query(getWebhooks).toPromise();
  const ids = res.data.webhookSubscriptions.edges.map(
    (webhook) => webhook.node.id
  );

  const results = await Promise.all(
    ids.map(async (id) => {
      return await client
        .mutation(webhookSubscriptionDelete, {
          id,
        })
        .toPromise();
    })
  );

  console.log("Webhooks Removed");
}
