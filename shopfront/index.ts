// @ts-ignore
// Grab the product container and append
const product = document.getElementById("ProductSection");
const host = "https://f2d8bb643726.ngrok.io";
// @ts-ignore

async function fakeAwait() {
  await Promise.resolve();
}

fakeAwait();
getSettings();

product.appendChild(uiMain());
