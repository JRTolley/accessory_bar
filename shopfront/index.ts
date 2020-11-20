// @ts-ignore
// Grab the product container and append
let product = undefined;
const product_id_hooks = [
  "ProductSection",
  "productHead",
  "ProductSection-product-template",
];
const product_class_hooks = [
  "product--template",
  "product__content",
  "product",
  // "product-single__content",
];
const fallback_hooks = [
  "shopify-section-product-template",
  "shopify-section-product",
];

let fallbackUsed = false;
for (let id of product_id_hooks) {
  if (product) break;
  if (document.getElementById(id)) product = document.getElementById(id);
}
for (let myClass of product_class_hooks) {
  if (product) break;
  if (document.getElementsByClassName(myClass))
    product = document.getElementsByClassName(myClass)[0];
}
for (let id of fallback_hooks) {
  if (product) break;
  if (document.getElementById(id)) {
    product = document.getElementById(id);
    fallbackUsed = true;
  }
}

// Get the host
// const host = "https://52d664bfc9e7.ngrok.io";
// const host = "https://staging.accessorybar.jttech.dev";
const host = "https://production.accessorybar.jttech.dev";

async function main() {
  const product_json = await getSettings();
  if (product_json !== null) {
    // If a product set has actually been configured
    // @ts-ignore
    product.appendChild(uiMain(product_json));
  }
}

main();
