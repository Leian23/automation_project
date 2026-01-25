import { expect } from "@playwright/test";
import productPageSelectors from "../selector/product_page.js";
import homePageSelectors from "../selector/homepage.js";
import dotenv from "dotenv";
dotenv.config();

export default class ProductDetailPage {
  constructor(page, helpers) {
    this.page = page;
    this.helpers = helpers;
  }

  async navigateToProduct(productIndex = 0) {
    const { page, helpers } = this;

    const productCards = helpers.findElement(
      homePageSelectors.products.value,
      homePageSelectors.products.type
    );
    const count = await productCards.count();
    if (productIndex >= count) {
      throw new Error(`Product index ${productIndex} out of range. Total: ${count}`);
    }

    const card = productCards.nth(productIndex);
    const nameLink = card.locator(".inventory_item_name");
    await expect(nameLink).toBeVisible();
    await nameLink.click();
    await expect(page).toHaveURL(/inventory-item\.html\?id=/);
    await page.waitForTimeout(500);
  }
  async backToProducts() {
    const { page, helpers } = this;

    await helpers.assertElement(
      [productPageSelectors.backButton.value],
      productPageSelectors.backButton.type
    );
    await helpers
      .findElement(productPageSelectors.backButton.value, productPageSelectors.backButton.type)
      .click();
    await expect(page).toHaveURL(/inventory\.html/);
    await page.waitForTimeout(500);
  }


  async addToCart() {
    const { page, helpers } = this;

    await helpers.assertElement(
      [productPageSelectors.addToCartButton.value],
      productPageSelectors.addToCartButton.type
    );
    await helpers
      .findElement(productPageSelectors.addToCartButton.value, productPageSelectors.addToCartButton.type)
      .click();
    await page.waitForTimeout(500);
  }
}
