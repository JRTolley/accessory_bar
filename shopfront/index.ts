// @ts-ignore
// Grab the product container and append
let product = undefined;
const product_id_hooks = ["ProductSection", "productHead", "shopify-section"];
const product_class_hooks = [
  "product-single",
  "section.product_section",
  "product-single__content",
];
for (let id of product_id_hooks) {
  if (product) break;
  if (document.getElementById(id)) product = document.getElementById(id);
}
for (let myClass of product_class_hooks) {
  if (product) break;
  if (document.getElementsByClassName(myClass))
    product = document.getElementsByClassName(myClass)[0];
}

// Get the host
// const host = "https://0dd9c5e4fd6c.ngrok.io";
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
