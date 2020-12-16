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

function doesFontExist(fontName) {
  // creating our in-memory Canvas element where the magic happens
  var canvas = document.createElement("canvas");
  var context = canvas.getContext("2d");

  // the text whose final pixel size I want to measure
  var text = "abcdefghijklmnopqrstuvwxyz0123456789";

  // specifying the baseline font
  context.font = "72px monospace";

  // checking the size of the baseline text
  var baselineSize = context.measureText(text).width;

  // specifying the font whose existence we want to check
  context.font = "72px '" + fontName + "', monospace";

  // checking the size of the font we want to check
  var newSize = context.measureText(text).width;

  // removing the Canvas element we created

  //
  // If the size of the two text instances is the same, the font does not exist because it is being rendered
  // using the default sans-serif font
  //
  if (newSize == baselineSize) {
    return false;
  } else {
    return true;
  }
}
