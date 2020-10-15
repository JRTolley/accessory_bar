// export async function installShopfront(accessToken, shop, host) {
//   // Use ScriptTag functionality to install a script tag into the storefront

import { createClient } from "urql";
import { createScript } from "../graphql/mutations/createScript";
import { getProductsById } from "../graphql/queries/getProductsById";

//   const query = JSON.stringify({
//     query: `mutation {
//             scriptTagCreate(input: {displayScope: ONLINE_STORE, src: "${host}/index.min.js"}){
//               scriptTag {
//                 id
//               }
//               userErrors{
//                 field
//                 message
//               }
//             }
//           }
//           `,
//   });

//   const response = await fetch(
//     `https://${shop}/admin/api/2020-07/graphql.json`,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "X-Shopify-Access-Token": accessToken,
//       },
//       body: query,
//     }
//   );

//   console.log("Response: ", response);
// }

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

  console.log("Res: ", res);
}
