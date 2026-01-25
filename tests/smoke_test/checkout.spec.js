import { test, expect } from "@playwright/test";
import { createHelpers } from "../../helpers/helper.js";
import LoginPage from "../../pages/login_page.js";
import HomePage from "../../pages/home_page.js";
import CheckoutPage from "../../pages/checkout_page.js";
import dotenv from "dotenv";
dotenv.config();

test.describe("Swag Labs Test - Checkout", () => {
  let helpers;
  let homePageObject;
  let loginPageObject;
  let checkoutPageObject;

  test.beforeEach(async ({ page }) => {
    helpers = createHelpers(page);
    loginPageObject = new LoginPage(page, helpers);
    homePageObject = new HomePage(page, helpers);
    checkoutPageObject = new CheckoutPage(page, helpers);

    await loginPageObject.openUrl();
    await helpers.assertElement(["//div[text()='Swag Labs']"], "xpath");
    await loginPageObject.login(process.env.USERNAME, process.env.PASSWORD);
  });
  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test("Should be able to add item to cart and checkout", async ({ page }) => {
    await helpers.assertElement(["//span[text()='Products']"], "xpath");

    await checkoutPageObject.addItemToCart(0);
    await checkoutPageObject.goToCart();
    await checkoutPageObject.checkout("John", "Doe", "12345");
  });
});
