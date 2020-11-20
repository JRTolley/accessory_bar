import { createClient } from "urql";
import { scriptTagDelete } from "../../graphql/mutations/scriptTagDelete";
import { getScriptTags } from "../../graphql/queries/getScriptTags";

export async function removeScriptTags(ctx) {
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

  const res = await client.query(getScriptTags).toPromise();
  const ids = res.data.scriptTags.edges.map((tag) => tag.node.id);

  const data = await Promise.all(
    ids.map(async (id) => {
      return await client
        .mutation(scriptTagDelete, {
          id,
        })
        .toPromise();
    })
  );

  if (!res.error) {
    console.log(`> ${shop} - Script Tags successfully removed`);
  } else {
    console.error(`! ${shop} - Script Tag removal error!!`);
  }
}
