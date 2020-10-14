export async function install_script(accessToken, shop, host) {
  // Use ScriptTag functionality to install a script tag into the storefront
  const query = JSON.stringify({
    query: `mutation {
              scriptTagCreate(input: {displayScope: ONLINE_STORE, src: "${host}/main.min.js"}){
                scriptTag {
                  id
                }
                userErrors{
                  field
                  message
                }
              }
            }
            `,
  });
  fetch(`https://${shop}/admin/api/2020-07/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": accessToken,
    },
    body: query,
  });
}
