// @ts-ignore
// Grab the product container and append
const product = document.getElementById("ProductSection");
const host = "https://e1be1171e9f9.ngrok.io";
// @ts-ignore

async function main() {
  const product_json = await getSettings();

  if (product_json !== null) {
    // If a product set has actually been configured
    product.appendChild(uiMain(product_json));
  }
}

main();
