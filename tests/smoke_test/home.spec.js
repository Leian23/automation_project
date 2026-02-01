import { test, expect } from "../fixtures.js";
import HomePage from "../../pages/home_page.js";
import homePageSelectors from "../../selector/home_page.js";

test.describe("Swag Labs Test - HomePage", () => {
  test.beforeEach(async ({ page, helpers, loggedIn }) => {
    // loggedIn fixture runs first; we only need to ensure Products is visible
    await helpers.assertElement(["//span[text()='Products']"], "xpath");
  });

  test("Should be able to check the products title and filter", async ({
    page,
    helpers,
    loggedIn,
  }) => {
    await helpers.assertElement(["//span[text()='Products']"], "xpath");

    const filterDropdown = page.locator(".product_sort_container");
    await expect(filterDropdown).toBeVisible();

    const getTitles = async () =>
      await page.$$eval(".inventory_item_name", (items) =>
        items.map((i) => i.textContent.trim())
      );
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
          expect(titles).toEqual([...titles].sort());
        },
      },
      {
        value: "za",
        test: async () => {
          const titles = await getTitles();
          expect(titles).toEqual([...titles].sort().reverse());
        },
      },
      {
        value: "lohi",
        test: async () => {
          const prices = await getPrices();
          expect(prices).toEqual([...prices].sort((a, b) => a - b));
        },
      },
      {
        value: "hilo",
        test: async () => {
          const prices = await getPrices();
          expect(prices).toEqual([...prices].sort((a, b) => b - a));
        },
      },
    ];

    for (const option of filterOptions) {
      await filterDropdown.selectOption(option.value);
      await expect(page.locator(".inventory_item").first()).toBeVisible();
      await option.test();
    }
  });

  test("Should list products with required details", async ({
    page,
    helpers,
    loggedIn,
  }) => {
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
      await expect(card.locator(".inventory_item_name")).toBeVisible();
      await expect(card.locator(".inventory_item_name")).not.toHaveText("");
      await expect(card.locator(".inventory_item_desc")).toBeVisible();
      await expect(card.locator(".inventory_item_desc")).not.toHaveText("");
      await expect(card.locator(".inventory_item_price")).toBeVisible();
      await expect(card.locator(".inventory_item_price")).toHaveText(
        /^\$\d+\.\d{2}$/
      );
      await expect(card.locator("button")).toBeVisible();
      await expect(card.locator("button")).toHaveText(/add to cart/i);
    }
  });
});
