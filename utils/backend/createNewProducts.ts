import { Merchant } from "../../entities/Merchant";
import { Product } from "../../entities/Product";
import initDB from "../initDB";

async function createNewProducts(merchant: Merchant, products) {
  console.log("> Creating new products");
  const current_products_pids = merchant.products.map((p) => p.pid);

  let toCreate = products.filter(
    (prod) => !current_products_pids.includes(prod.pid)
  );
  console.log(`> Creating ${toCreate.length} new products`);
  await Promise.all(
    toCreate.map(async (product) => {
      return await Product.create({
        pid: product.pid,
        title: product.title,
        handle: product.handle,
        price: product.price,
        img: product.img,
        merchant: merchant,
      }).save();
    })
  );
}

export default createNewProducts;
