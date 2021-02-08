import { CustomizationOptions } from "../../entities/CustomizationOptions";
import { Merchant } from "../../entities/Merchant";
import { createCustomization } from "../../server/api/customization/createCustomization";
import { getCustomization } from "../../server/api/customization/getCustomization";
import { updateCustomization } from "../../server/api/customization/updateCustomization";
import connection from "../../utils/test/connection";
import { makeDefaultContext } from "../../utils/test/makeDefaultContext";

beforeAll(async () => {
  await connection.create();
}, 20000);

afterAll(async () => {
  await connection.clear();
  await connection.close();
});

beforeEach(async () => {
  await connection.clear();
  // Create a merchant
  await Merchant.create({
    shopName: "cust.myshopify.com",
    accessToken: "fakeAccessToken",
  }).save();
});

describe("API - Customization Profile", () => {
  describe("Create", () => {
    test("Create a customization profile", async () => {
      let ctx = makeDefaultContext();
      ctx.session = { shop: "cust.myshopify.com" };
      ctx = await createCustomization(ctx);
      expect(ctx).not.toBeNull();
      expect(await CustomizationOptions.count()).toEqual(1);
    });
  });
  describe("Get", () => {
    test("Get the customization profile", async () => {
      const merchant = await Merchant.findOne({
        shopName: "cust.myshopify.com",
      });
      await CustomizationOptions.create({
        merchant,
      }).save();
      let ctx = makeDefaultContext();
      ctx.cookies.get = (name) => {
        return "cust.myshopify.com";
      };
      ctx.session = { shop: "cust.myshopify.com" };
      ctx = await getCustomization(ctx);
      expect(ctx.response.body).not.toBeNull();
      expect(ctx.response.status).toBe(200);
    });
  });
  describe("Update", () => {
    test("Update the customization profile", async () => {
      let merchant = await Merchant.findOne({ shopName: "cust.myshopify.com" });

      await CustomizationOptions.create({
        merchant,
        title: "These are my basic accessories",
        titleFontSize: 40,
        itemPaddingX: 40,
      }).save();

      let ctx = makeDefaultContext();
      ctx.cookies.get = (name) => {
        return "cust.myshopify.com";
      };
      ctx.session = { shop: "cust.myshopify.com" };
      ctx.request.body = {
        title: "Related Items",
        titleFont: "Fake Font",
        titleFontSize: 20,
        itemMaxXSize: 40,
        itemFont: "Fake Item Font",
        itemFontSize: 10,
        itemPaddingX: null,
        barPaddingX: 5,
        barPaddingY: 20,
      };
      ctx = await updateCustomization(ctx);
      expect(ctx).not.toBeNull();
      expect(await CustomizationOptions.count()).toBe(1);
      let newCustomizations = await CustomizationOptions.findOne({
        merchant,
      });
      expect(newCustomizations.title).toBe("Related Items");
      expect(newCustomizations.barPaddingX).not.toBeNull();
      expect(newCustomizations.itemFontSize).toBe(10);
      expect(newCustomizations.itemPaddingX).toBeNull();
    });
  });
});
