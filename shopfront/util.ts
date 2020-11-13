function getProductId() {
  let script = document.getElementById("ProductJson-product-template");
  let body;
  if (script) {
    const script_content = script.firstChild.textContent;
    const script_json = JSON.parse(script_content);
    return script_json.id;
    body = { product_id: script_json.id };
  } else {
    script = document.getElementById("__st");
    const script_content = script.firstChild.textContent;
    const parsed_content = JSON.parse(
      "{" + script_content.split("{")[1].split("}")[0] + "}"
    );
    return parsed_content.rid;
    body = { product_id: parsed_content.rid };
  }
}
