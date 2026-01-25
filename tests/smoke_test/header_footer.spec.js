import { test, expect } from "@playwright/test";
import { createHelpers } from "../../helpers/helper.js";
import homePageSelectors from "../../selector/home_page.js";
import HomePage from "../../pages/home_page.js";
import LoginPage from "../../pages/login_page.js";
import dotenv from "dotenv";
import { assert } from "console";
dotenv.config();

test.describe("Swag Labs Test - Header", () => {
  let helpers;
  let homePageObject;
  let loginPageObject;

  test.beforeEach(async ({ page }) => {
    helpers = createHelpers(page);
    homePageObject = new HomePage(page, helpers);
    loginPageObject = new LoginPage(page, helpers);

    await loginPageObject.openUrl();
    await loginPageObject.login(process.env.USERNAME, process.env.PASSWORD);
  });
  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test("Should be able to navigate the header", async ({ page }) => {
    await helpers.assertElement(
      [homePageSelectors.menuButton.value],
      homePageSelectors.menuButton.type
    );

    await helpers
      .findElement(
        homePageSelectors.menuButton.value,
        homePageSelectors.menuButton.type
      )
      .click();

    const expectedMenuTitles = [
      "All Items",
      "About",
      "Logout",
      "Reset App State",
    ];
    const actualMenuTitles = await homePageObject.getMenuTexts();
    expect(actualMenuTitles).toEqual(expectedMenuTitles);

    await helpers.assertElement(["//div[text()='Swag Labs']"], "xpath");

    await helpers.assertElement(
      [homePageSelectors.closeMenuButton.value],
      homePageSelectors.closeMenuButton.type
    );

    await helpers
      .findElement(
        homePageSelectors.closeMenuButton.value,
        homePageSelectors.closeMenuButton.type
      )
      .click();

    await helpers.assertElement(
      [homePageSelectors.shoppingCartIcon.value],
      homePageSelectors.shoppingCartIcon.type
    );

    await helpers
      .findElement(
        homePageSelectors.shoppingCartIcon.value,
        homePageSelectors.shoppingCartIcon.type
      )
      .click();

    await expect(page).toHaveURL(/cart.html/);

    await page.waitForTimeout(1000);
  });
});

test.describe("Swag Labs Test - Footer", () => {
  let helpers;
  let loginPageObject;

  test.beforeEach(async ({ page }) => {
    helpers = createHelpers(page);
    loginPageObject = new LoginPage(page, helpers);

    await loginPageObject.openUrl();
    await loginPageObject.login(process.env.USERNAME, process.env.PASSWORD);
  });
  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test("Should be able to navigate the footer", async ({ page }) => {
    await helpers.assertElement(["//footer"], "xpath");
    const partialText =
      "Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy";

    await helpers.assertElement(
      [`//div[@class='footer_copy' and contains(., '${partialText}')]`],
      "xpath"
    );

    await helpers.assertElements(
      homePageSelectors.footerIcons.value,
      homePageSelectors.footerIcons.type
    );
  });
});
