async function getSettings() {
  // find the product template script with all the info we need
  const body = { product_id: getProductId() };
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
