import { test, expect } from "@playwright/test";
import { createHelpers } from "../../helpers/helper.js";
import LoginPage from "../../pages/login_page.js";
import ProductDetailPage from "../../pages/product_page.js";
import productPageSelectors from "../../selector/product_page.js";

import dotenv from "dotenv";
dotenv.config();

test.describe("Swag Labs Test - Product Detail Page", () => {
  let helpers;
  let loginPageObject;
  let productDetailPageObject;

  test.beforeEach(async ({ page }) => {
    helpers = createHelpers(page);
    loginPageObject = new LoginPage(page, helpers);
    productDetailPageObject = new ProductDetailPage(page, helpers);

    await loginPageObject.openUrl();
    await helpers.assertElement(["//div[text()='Swag Labs']"], "xpath");
    await loginPageObject.login(process.env.USERNAME, process.env.PASSWORD);
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test("Should display all required elements on product detail page", async ({ page }) => {
    await helpers.assertElement(["//span[text()='Products']"], "xpath");

    await productDetailPageObject.navigateToProduct(0);

    // Back to products button
    await helpers.assertElement(
      [productPageSelectors.backButton.value],
      productPageSelectors.backButton.type
    );

    // Product image
    const image = helpers.findElement(
      productPageSelectors.productImage.value,
      productPageSelectors.productImage.type
    );
    await expect(image).toBeVisible();
    await helpers.highlightElement([image]);

    // Product name
    const name = helpers.findElement(
      productPageSelectors.productName.value,
      productPageSelectors.productName.type
    );
    await expect(name).toBeVisible();
    await expect(name).not.toHaveText("");
    await helpers.highlightElement([name]);

    // Product description
    const desc = helpers.findElement(
      productPageSelectors.productDesc.value,
      productPageSelectors.productDesc.type
    );
    await expect(desc).toBeVisible();
    await expect(desc).not.toHaveText("");
    await helpers.highlightElement([desc]);

    // Product price
    const price = helpers.findElement(
      productPageSelectors.productPrice.value,
      productPageSelectors.productPrice.type
    );
    await expect(price).toBeVisible();
    await expect(price).toHaveText(/^\$\d+\.\d{2}$/);
    await helpers.highlightElement([price]);

    // Add to cart button
    await helpers.assertElement(
      [productPageSelectors.addToCartButton.value],
      productPageSelectors.addToCartButton.type
    );
  });

  test("Should go back to products list from product detail", async ({page}) => {
    await helpers.assertElement(["//span[text()='Products']"], "xpath");

    await productDetailPageObject.navigateToProduct(0);
    await expect(page).toHaveURL(/inventory-item\.html\?id=/);

    await productDetailPageObject.backToProducts();
    await expect(page).toHaveURL(/inventory\.html/);
    await helpers.assertElement(["//span[text()='Products']"], "xpath");
  });

  test("Should add product to cart from product detail page", async ({ page }) => {
    await helpers.assertElement(["//span[text()='Products']"], "xpath");

    await productDetailPageObject.navigateToProduct(0);

    await productDetailPageObject.addToCart();

   const cartBadge = await helpers.findElement(
      productPageSelectors.shoppingCartBadge.value,
      productPageSelectors.shoppingCartBadge.type
    ).textContent();

    expect(cartBadge).toBe("1");

    // Add to cart should become Remove
    const removeBtn = helpers.findElement(
      productPageSelectors.removeButton.value,
      productPageSelectors.removeButton.type
    );
    await expect(removeBtn).toBeVisible();
    await expect(removeBtn).toHaveText(/remove/i);
  });
});
