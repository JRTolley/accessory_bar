function uiCreateProduct(): HTMLDivElement {
  const element = document.createElement("div");
  element.style.display = "flex";
  element.style.flexDirection = "column";

  // Picture
  const picture = document.createElement("img");
  picture.src =
    "https://cdn.shopify.com/s/files/1/0425/8273/7063/products/young-man-in-bright-fashion_925x_f7029e2b-80f0-4a40-a87b-834b9a283c39_240x240.jpg?v=1594222380";
  // Link Text
  const link = document.createElement("a");
  link.href = "www.google.com";
  link.appendChild(document.createTextNode("www.google.com"));
  // Price
  const price = document.createElement("p");
  price.appendChild(document.createTextNode("$19.99"));

  element.appendChild(picture);
  element.appendChild(link);
  element.appendChild(price);

  element.style.margin = "4px";
  return element;
}

function uiCreateProductFlex(): HTMLDivElement {
  const element = document.createElement("div");
  element.style.display = "flex";
  element.style.flexDirection = "row";
  element.style.justifyContent = "space-around";
  return element;
}

function uiCreateDivider(): HTMLDivElement {
  const element = document.createElement("div");
  element.style.height = "1px";
  element.style.margin = "5px 0px 5px 0px";
  element.style.width = "100%";
  element.style.backgroundColor = "#666666";

  return element;
}

function uiMasterFlex(): HTMLDivElement {
  const main = document.createElement("div");
  main.style.display = "flex";
  main.style.flexDirection = "column";
  return main;
}

function uiMain(): HTMLDivElement {
  console.log("UI Main init");

  // Create master flexbox
  const masterFlex = uiMasterFlex();
  masterFlex.appendChild(uiCreateDivider());

  const textnode = document.createElement("div");
  // Title
  const title = document.createElement("h1");
  title.appendChild(document.createTextNode("Accessories for this Item"));
  masterFlex.appendChild(title);

  // Products
  const productFlex = uiCreateProductFlex();
  Array.from(Array(7).keys()).forEach(() => {
    let product = uiCreateProduct();
    productFlex.appendChild(product);
  });

  masterFlex.appendChild(productFlex);
  masterFlex.appendChild(uiCreateDivider());
  masterFlex.appendChild(uiCreateDivider());
  return masterFlex;
}
