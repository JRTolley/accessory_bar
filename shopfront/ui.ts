async function registerClickthrough(item) {
  const body = { product_id: getProductId() };

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

function uiCreateProduct(item_json, customization): HTMLLIElement {
  const element = document.createElement("li");
  element.style.display = "flex";
  element.style.flex = "1 1 0px";
  element.style.flexDirection = "column";
  element.style.minWidth = "150px";
  // element.style.maxHeight = "300px";
  element.style.boxSizing = "border-box";
  element.style.cursor = "pointer";
  element.style.margin = "0px 4px 0px 4px";

  // Click to register and go to next item
  element.onclick = () => {
    registerClickthrough(item_json);
  };

  // Picture
  const picture = document.createElement("img");
  picture.style.display = "block";
  picture.style.width = "100%";
  picture.style.height = "auto";
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
  element.style.padding = "0px 0px 0px 0px";
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

function uiMain(product_json, customization): HTMLDivElement {
  console.log("UI Main init");

  // Do cuostmization options
  console.log("Customization Options: ", customization);
  /* BarPaddingX, BarPaddingY, ItemFont, ItemFontSize, ItemMaxXSize,
    Title, TitleFont, TitleFontSize
  */

  // Create master flexbox
  const masterFlex = uiMasterFlex();
  masterFlex.appendChild(uiCreateDivider());
  masterFlex.style.gridColumnStart = "1";
  masterFlex.style.gridColumnEnd = "-1";
  masterFlex.style.minWidth = "90%";
  if (customization.barPaddingX) {
    masterFlex.style.paddingLeft = customization.barPaddingX + "%";
    masterFlex.style.paddingRight = customization.barPaddingX + "%";
  }
  if (customization.barPaddingY) {
    masterFlex.style.paddingTop = customization.barPaddingY + "pt";
  }

  // Title
  const title = document.createElement("h2");
  title.style.margin = "6px 2px 18px 2px";
  title.appendChild(
    document.createTextNode(
      customization.title ? customization.title : "Accessories for this Item"
    )
  );
  if (doesFontExist(customization.titleFont)) {
    console.log("Setting custom font");
    title.style.fontFamily = customization.titleFont;
  }
  if (customization.titleFontSize) {
    console.log("Setting custom title size");
    title.style.fontSize = `${customization.titleFontSize}pt`;
  }
  masterFlex.appendChild(title);

  // Products
  const productFlex = uiCreateProductFlex();
  product_json.forEach((element) => {
    let productDisplay = uiCreateProduct(element, customization);
    productFlex.appendChild(productDisplay);
  });

  masterFlex.appendChild(productFlex);
  // masterFlex.appendChild(uiCreateDivider());
  // masterFlex.appendChild(uiCreateDivider());
  return masterFlex;
}
