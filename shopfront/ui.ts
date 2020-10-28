async function registerClickthrough(item) {
  const script = document.getElementById("ProductJson-product-template");
  const script_content = script.firstChild.textContent;
  const script_json = JSON.parse(script_content);

  const body = { product_id: script_json.id };

  await fetch(`${host}/api/storefront/registerClickthrough`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({
      product_id: item.pid,
      set_pid: body.product_id,
    }),
  });
  window.location = item.handle;
}

function uiCreateProduct(item_json): HTMLLIElement {
  const element = document.createElement("li");
  element.style.display = "flex";
  element.style.flex = "1 1 0px";
  element.style.flexDirection = "column";
  element.style.minWidth = "150px";
  element.style.boxSizing = "border-box";
  element.style.cursor = "pointer";
  element.style.margin = "0px 4px 0px 4px";

  // Click to register and go to next item
  element.onclick = () => {
    registerClickthrough(item_json);
  };

  // Picture
  const picture = document.createElement("img");
  picture.src = item_json.img;
  // Link Text
  const title = document.createElement("h4");
  title.style.margin = "0px 2px 1px 2px";
  // title.style.fontWeight = "bold";
  title.appendChild(document.createTextNode(item_json.title));
  // Price
  const price = document.createElement("span");
  price.style.margin = "0px 2px 0px 2px";
  price.appendChild(document.createTextNode(displayPrice(item_json.price)));

  element.appendChild(picture);
  element.appendChild(title);
  element.appendChild(price);

  return element;
}

function uiCreateProductFlex(): HTMLUListElement {
  const element = document.createElement("ul");
  element.style.display = "flex";
  element.style.flexDirection = "row";
  element.style.justifyContent = "space-between";
  element.style.overflow = "auto";
  return element;
}

function uiCreateDivider(): HTMLDivElement {
  const element = document.createElement("div");
  element.style.height = "1px";
  element.style.margin = "5px 0px 5px 0px";
  element.style.width = "100%";
  element.style.backgroundColor = "#AAAAAA";

  return element;
}

function uiMasterFlex(): HTMLDivElement {
  const main = document.createElement("div");
  main.style.display = "flex";
  main.style.flexDirection = "column";
  return main;
}

function uiMain(product_json): HTMLDivElement {
  console.log("UI Main init");

  // Create master flexbox
  const masterFlex = uiMasterFlex();
  masterFlex.appendChild(uiCreateDivider());

  const textnode = document.createElement("div");
  // Title
  const title = document.createElement("h2");
  title.appendChild(document.createTextNode("Accessories for this Item"));
  title.style.margin = "6px 2px 18px 2px";
  masterFlex.appendChild(title);

  // Products
  const productFlex = uiCreateProductFlex();
  product_json.forEach((element) => {
    let productDisplay = uiCreateProduct(element);
    productFlex.appendChild(productDisplay);
  });

  masterFlex.appendChild(productFlex);
  // masterFlex.appendChild(uiCreateDivider());
  // masterFlex.appendChild(uiCreateDivider());
  return masterFlex;
}
