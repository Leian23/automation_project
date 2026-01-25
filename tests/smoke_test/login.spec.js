import { test, expect } from "@playwright/test";
import { createHelpers } from "../../helpers/helper.js";
import LoginPage from "../../pages/login_page.js";
import dotenv from "dotenv";
dotenv.config();

test.describe("Swag Labs Test - Login", () => {
  let helpers;
  let loginPageObject;

  test.beforeEach(async ({ page }) => {
    helpers = createHelpers(page);
    loginPageObject = new LoginPage(page, helpers);
  });
  test.afterEach(async ({ page }) => {
    await page.close();
  });
  test("Should be able to login", async ({ page }) => {
    await loginPageObject.openUrl();
    await helpers.assertElement(["//div[text()='Swag Labs']"], "xpath");
    await loginPageObject.login(process.env.USERNAME, process.env.PASSWORD);
  });
});
