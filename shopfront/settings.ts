async function getSettings() {
  // Figure out if we're on the theme store
  const globalDataScript = document.getElementById(
    "OnlineStoreEditorShopifyGlobalData"
  );
  let usingThemeEditor;
  if (!globalDataScript) {
    usingThemeEditor = false;
  } else if (
    globalDataScript.innerHTML.split("designMode: ")[1].split(",")[0] === "true"
  ) {
    usingThemeEditor = true;
  } else {
    usingThemeEditor = false;
  }

  console.log("Using Theme: ", usingThemeEditor);
  // find the product template script with all the info we need
  const body = { product_id: getProductId(), usingThemeEditor };
  // Retrieve the Accessories to display
  const res = await fetch(`${host}/api/storefront/get`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(body),
  });

  if (res.status === 204) {
    // Not a product set
    return null;
  }
  const res_json = await res.json();
  console.log("Settings Json: ", res_json);
  return res_json;
}
