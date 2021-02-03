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
  "product__align-center",
];
const data_hooks = ["product-page"];
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
for (let hook of data_hooks) {
  if (product) break;
  if (document.querySelector(`div[data-hook='${hook}']`))
    product = document.querySelector(`div[data-hook='${hook}']`);
}
for (let id of fallback_hooks) {
  if (product) break;
  if (document.getElementById(id)) {
    product = document.getElementById(id);
    fallbackUsed = true;
  }
}

// Get the host
const host = "https://819d3eec86c1.ngrok.io";
// const host = "https://staging.accessorybar.jttech.dev";
// const host = "https://production.accessorybar.jttech.dev";

async function main() {
  const [product_json, customization_options] = await Promise.all([
    getSettings(),
    getCustomization(),
  ]);

  if (product_json !== null) {
    // If a product set has actually been configured
    // @ts-ignore
    product.appendChild(uiMain(product_json, customization_options));
  }
}

main();
