import { AccessorySet } from "../../entities/AccessorySet";
import { Merchant } from "../../entities/Merchant";
import { Product } from "../../entities/Product";
import { createAccessorySet } from "../../server/api/accessorySets/createAccessorySet";
import { deleteAccessorySet } from "../../server/api/accessorySets/deleteAccessorySet";
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
  console.log("Clearing");
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
      const prod = await Product.create({
        handle: "Fake",
        pid: "theProduct",
        img: "fakeImage",
        title: "FakeTitle",
        price: 0.9 as any,
        merchant: await Merchant.findOne({ shopName: "test.myshopify.com" }),
      }).save();

      const accSet = await AccessorySet.create({
        baseProduct: prod,
        merchant: await Merchant.findOne({ shopName: "test.myshopify.com" }),
      }).save();

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
  describe("Get", () => {});
  describe("Update", () => {});
});
