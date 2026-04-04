import { test, expect } from "../fixtures.js";
import homePageSelectors from "../../selector/home_page.js";
import HomePage from "../../pages/home_page.js";

test.describe("Swag Labs Test - Header", () => {
  test("Should be able to navigate the header", async ({
    page,
    helpers,
    loggedIn,
  }) => {
    const homePage = new HomePage(page, helpers);

    await helpers.assertElement(
      [homePageSelectors.menuButton.value],
      homePageSelectors.menuButton.type,
    );
    await helpers
      .findElement(
        homePageSelectors.menuButton.value,
        homePageSelectors.menuButton.type,
      )
      .click();

    const expectedMenuTitles = [
      "All Items",
      "About",
      "Logout",
      "Reset App State",
    ];
    const actualMenuTitles = await homePage.getMenuTexts();
    expect(actualMenuTitles).toEqual(expectedMenuTitles);

    await helpers.assertElement(["//div[text()='Swag Labs']"], "xpath");
    await helpers.assertElement(
      [homePageSelectors.closeMenuButton.value],
      homePageSelectors.closeMenuButton.type,
    );
    await helpers
      .findElement(
        homePageSelectors.closeMenuButton.value,
        homePageSelectors.closeMenuButton.type,
      )
      .click();

    await helpers.assertElement(
      [homePageSelectors.shoppingCartIcon.value],
      homePageSelectors.shoppingCartIcon.type,
    );
    await helpers
      .findElement(
        homePageSelectors.shoppingCartIcon.value,
        homePageSelectors.shoppingCartIcon.type,
      )
      .click();

    await expect(page).toHaveURL(/cart.html/);
  });
});

test.describe("Swag Labs Test - Footer", () => {
  test("Should be able to navigate the footer", async ({
    page,
    helpers,
    loggedIn,
  }) => {
    await helpers.assertElement(["//footer"], "xpath");
    const partialText =
      "Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy";
    await helpers.assertElement(
      [`//div[@class='footer_copy' and contains(., '${partialText}')]`],
      "xpath",
    );
    await helpers.assertElements(
      homePageSelectors.footerIcons.value,
      homePageSelectors.footerIcons.type,
    );
  });
});
