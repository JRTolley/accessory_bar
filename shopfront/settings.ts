async function getSettings() {
  // find the product template script with all the info we need
  const script = document.getElementById("ProductJson-product-template");
  const script_content = script.firstChild.textContent;
  const script_json = JSON.parse(script_content);

  const body = { product_id: script_json.id };

  // Retrieve the Accessories to display
  const res = await fetch(`${host}/api/storefront/get`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(body),
  });

  const res_json = await res.json();

  console.log("Response Json: ", res_json);

  return res_json;
}
