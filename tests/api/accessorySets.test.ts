import { randomInt } from "crypto";
import { AccessorySet } from "../../entities/AccessorySet";
import { Merchant } from "../../entities/Merchant";
import { Product } from "../../entities/Product";
import { createAccessorySet } from "../../server/api/accessorySets/createAccessorySet";
import { deleteAccessorySet } from "../../server/api/accessorySets/deleteAccessorySet";
import { getAllAccessorySets } from "../../server/api/accessorySets/getAccessorySet";
import { updateAccessorySet } from "../../server/api/accessorySets/updateAccessorySet";
import connection from "../../utils/test/connection";
import { makeDefaultContext } from "../../utils/test/makeDefaultContext";

beforeAll(async () => {
  await connection.create();
}, 20000);

afterAll(async () => {
  await connection.close();
});

beforeEach(async () => {
  // Clear DB
  await connection.clear();
  // Readd a merchant
  await Merchant.create({
    shopName: "test.myshopify.com",
    accessToken: "fakeAccessToekn",
  }).save();
});

describe("API - Accessory Sets", () => {
  describe("Create", () => {
    test("Create Accessory Set", async () => {
      let ctx = makeDefaultContext();
      ctx.session = { shop: "test.myshopify.com" };
      ctx.request.body = {
        accessories: [
          {
            pid: "fakeProductId",
            title: "fakeTitle",
            handle: "fakeHandle",
            price: 9.0,
            img: "www.fakeimage.com/fake",
          },
        ],
      };
      ctx = await createAccessorySet(ctx);
      expect(ctx).not.toBeNull();
      expect(await Product.count()).toEqual(1);
    });
  });
  describe("Delete", () => {
    test("Delete Accessory Set", async () => {
      // Make an accessory Set
      const accSet = await makeTestAccessorySet("DeleteThing");

      let ctx = makeDefaultContext();
      ctx.session = { shop: "test.myshopify.com" };
      ctx.request.body = {
        ids: [accSet.id],
      };
      ctx.cookies.get = (name) => {
        return "test.myshopify.com";
      };
      ctx = await deleteAccessorySet(ctx);
      expect(ctx).not.toBeNull();
      expect(await AccessorySet.count()).toEqual(0);
    });
  });
  describe("Get", () => {
    test("Get All Accessory Sets", async () => {
      const accessorySet = await makeTestAccessorySet("GetThing");

      let ctx = makeDefaultContext();
      ctx.cookies.get = (name) => {
        return "test.myshopify.com";
      };
      ctx = await getAllAccessorySets(ctx);
      expect(ctx.response.status).toBe(200);
      expect(ctx.response.body).toHaveLength(1);
    });
  });
  describe("Update", () => {
    test("Update an Accessory Set", async () => {
      const accessorySet = await makeTestAccessorySet("UpdateThing");
      // Create additional product
      const new_product = await Product.create({
        handle: "new_product",
        pid: "gid/blah/blah",
        img: "na",
        title: "new_product",
        price: "9.99",
        merchant: await Merchant.findOne({ shopName: "test.myshopify.com" }),
      }).save();
      let ctx = makeDefaultContext();
      ctx.cookies.get = (_) => {
        return "test.myshopify.com";
      };
      ctx.request.body = {
        id: accessorySet.id,
        accessories: [new_product],
      };
      ctx = await updateAccessorySet(ctx);
      expect(ctx.response.status).toBe(200);
      expect(
        (
          await AccessorySet.findOne(accessorySet.id, {
            relations: ["accessories"],
          })
        ).accessories
      ).toHaveLength(1);
    });
  });
});

async function makeTestAccessorySet(name: string) {
  // Create Base Product
  const product = await Product.create({
    handle: `${name}/handle`,
    pid: `gid/shopify/${name}/pid`,
    img: `cdn.shopify.com/${name}/image`,
    title: `${name}`,
    price: randomInt(10).toString(),
    merchant: await Merchant.findOne({ shopName: "test.myshopify.com" }),
  }).save();
  // Create Accessory Set from it
  const accessorySet = await AccessorySet.create({
    baseProduct: product,
    merchant: await Merchant.findOne({ shopName: "test.myshopify.com" }),
  }).save();
  return accessorySet;
}
