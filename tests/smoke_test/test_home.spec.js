import { test, expect } from "@playwright/test";
import { createHelpers } from "../../helpers/helper.js";
import LoginPage from "../../pages/loginPage.js";
import HomePage from "../../pages/home_page.js";
import homePageSelectors from "../../selector/homepage.js";

import dotenv from "dotenv";
dotenv.config();

test.describe("Swag Labs Test - HomePage", () => {
  let helpers;
  let homePageObject;
  let loginPageObject;

  test.beforeEach(async ({ page }) => {
    helpers = createHelpers(page);
    loginPageObject = new LoginPage(page, helpers);
    homePageObject = new HomePage(page, helpers);

    await loginPageObject.openUrl();
    await helpers.assertElement(["//div[text()='Swag Labs']"], "xpath");
    await loginPageObject.login(process.env.USERNAME, process.env.PASSWORD);
  });
  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test("Should be able to check the products title and filter", async ({
    page,
  }) => {
    await helpers.assertElement(["//span[text()='Products']"], "xpath");

    const filterDropdown = page.locator(".product_sort_container");

    await expect(filterDropdown).toBeVisible();

    const getTitles = async () => {
      return await page.$$eval(".inventory_item_name", (items) =>
        items.map((i) => i.textContent.trim())
      );
    };

    const getPrices = async () => {
      const prices = await page.$$eval(".inventory_item_price", (items) =>
        items.map((i) => Number(i.textContent.replace("$", "")))
      );
      return prices;
    };

    const filterOptions = [
      {
        value: "az",
        test: async () => {
          const titles = await getTitles();
          const sorted = [...titles].sort();
          expect(titles).toEqual(sorted);
        },
      },
      {
        value: "za",
        test: async () => {
          const titles = await getTitles();
          const sorted = [...titles].sort().reverse();
          expect(titles).toEqual(sorted);
        },
      },
      {
        value: "lohi",
        test: async () => {
          const prices = await getPrices();
          const sorted = [...prices].sort((a, b) => a - b);
          expect(prices).toEqual(sorted);
        },
      },
      {
        value: "hilo",
        test: async () => {
          const prices = await getPrices();
          const sorted = [...prices].sort((a, b) => b - a);
          expect(prices).toEqual(sorted);
        },
      },
    ];

    for (const option of filterOptions) {
      await filterDropdown.selectOption(option.value);
      await option.test();
      await page.waitForTimeout(500);
    }
  });

  test("Should list products with required details", async ({ page }) => {
    await helpers.assertElement(["//span[text()='Products']"], "xpath");

    const productCards = helpers.findElement(
      homePageSelectors.products.value,
      homePageSelectors.products.type
    );

    const count = await productCards.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const card = productCards.nth(i);

      await expect(card.locator(".inventory_item_img img")).toBeVisible();
      await helpers.highlightElement([card.locator(".inventory_item_img img")]);

      const name = card.locator(".inventory_item_name");
      await expect(name).toBeVisible();
      await expect(name).not.toHaveText("");
      await helpers.highlightElement([name]);

      const desc = card.locator(".inventory_item_desc");
      await expect(desc).toBeVisible();
      await expect(desc).not.toHaveText("");
      await helpers.highlightElement([desc]);

      const price = card.locator(".inventory_item_price");
      await expect(price).toBeVisible();
      await expect(price).toHaveText(/^\$\d+\.\d{2}$/);
      await helpers.highlightElement([price]);

      const button = card.locator("button");
      await expect(button).toBeVisible();
      await expect(button).toHaveText(/add to cart/i);
      await helpers.highlightElement([button]);
    }
  });
});
