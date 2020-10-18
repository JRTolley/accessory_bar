// @ts-ignore
// Grab the product container and append
const product = document.getElementById("ProductSection");
const host = "https://68dc2269d372.ngrok.io";
// @ts-ignore

async function main() {
  const product_json = await getSettings();

  if (product_json !== null) {
    // If a product set has actually been configured
    product.appendChild(uiMain(product_json));
  }
}

main();
