import { expect } from "@playwright/test";
import homePageSelector from "../selector/homepage.js";

class HeaderFooter {
  constructor(page, helpers) {
    this.page = page;
    this.helpers = helpers;
  }

  async getMenuTexts() {
    const { helpers } = this;

    try {
      // Ensure the menu list elements are present
      await helpers.assertElements(
        homePageSelector.menuList.value,
        homePageSelector.menuList.type
      );

      const menuLists = helpers.findElement(
        homePageSelector.menuList.value,
        homePageSelector.menuList.type
      );

      const count = await menuLists.count();
      const texts = [];
      for (let i = 0; i < count; i++) {
        const item = await menuLists.nth(i);
        texts.push(await item.innerText());
      }

      return texts;
    } catch (error) {
      throw new Error(`Failed to get menu texts: ${error.message}`);
    }
  }

  async addItemToCart(itemIndex = 0) {
    const { page, helpers } = this;

    try {
      // Get all product cards
      const productCards = helpers.findElement(
        homePageSelector.products.value,
        homePageSelector.products.type
      );

      const count = await productCards.count();
      if (count === 0) {
        throw new Error("No products found on the page");
      }

      if (itemIndex >= count) {
        throw new Error(`Item index ${itemIndex} is out of range. Total items: ${count}`);
      }

      // Get the specific product card
      const card = productCards.nth(itemIndex);
      const addToCartButton = card.locator("button");

      // Verify button is visible and clickable
      await expect(addToCartButton).toBeVisible();
      await helpers.highlightElement([addToCartButton]);

      // Click the add to cart button
      await addToCartButton.click();
      await page.waitForTimeout(500);
    } catch (error) {
      throw new Error(`Failed to add item to cart: ${error.message}`);
    }
  }

  async goToCart() {
    const { page, helpers } = this;

    try {
      await helpers.assertElement(
        [homePageSelector.shoppingCartIcon.value],
        homePageSelector.shoppingCartIcon.type
      );

      await helpers
        .findElement(
          homePageSelector.shoppingCartIcon.value,
          homePageSelector.shoppingCartIcon.type
        )
        .click();

      await expect(page).toHaveURL(/cart.html/);
      await page.waitForTimeout(500);
    } catch (error) {
      throw new Error(`Failed to go to cart: ${error.message}`);
    }
  }

  async checkout(firstName, lastName, postalCode) {
    const { page, helpers } = this;

    try {
      // Click checkout button
      await helpers.assertElement(
        [homePageSelector.checkoutButton.value],
        homePageSelector.checkoutButton.type
      );

      await helpers
        .findElement(
          homePageSelector.checkoutButton.value,
          homePageSelector.checkoutButton.type
        )
        .click();

      await expect(page).toHaveURL(/checkout-step-one.html/);
      await page.waitForTimeout(500);

      // Fill in checkout information
      await helpers.assertElement(
        [homePageSelector.firstNameField.value],
        homePageSelector.firstNameField.type
      );
      await helpers.assertElement(
        [homePageSelector.lastNameField.value],
        homePageSelector.lastNameField.type
      );
      await helpers.assertElement(
        [homePageSelector.postalCodeField.value],
        homePageSelector.postalCodeField.type
      );

      await helpers
        .findElement(
          homePageSelector.firstNameField.value,
          homePageSelector.firstNameField.type
        )
        .fill(firstName);

      await helpers
        .findElement(
          homePageSelector.lastNameField.value,
          homePageSelector.lastNameField.type
        )
        .fill(lastName);

      await helpers
        .findElement(
          homePageSelector.postalCodeField.value,
          homePageSelector.postalCodeField.type
        )
        .fill(postalCode);

      await helpers.highlightElement([
        helpers.findElement(
          homePageSelector.firstNameField.value,
          homePageSelector.firstNameField.type
        ),
        helpers.findElement(
          homePageSelector.lastNameField.value,
          homePageSelector.lastNameField.type
        ),
        helpers.findElement(
          homePageSelector.postalCodeField.value,
          homePageSelector.postalCodeField.type
        ),
      ]);

      // Click continue button
      await helpers
        .findElement(
          homePageSelector.continueButton.value,
          homePageSelector.continueButton.type
        )
        .click();

      await expect(page).toHaveURL(/checkout-step-two.html/);
      await page.waitForTimeout(500);

      // Click finish button
      await helpers.assertElement(
        [homePageSelector.finishButton.value],
        homePageSelector.finishButton.type
      );

      await helpers
        .findElement(
          homePageSelector.finishButton.value,
          homePageSelector.finishButton.type
        )
        .click();

      await expect(page).toHaveURL(/checkout-complete.html/);
      await page.waitForTimeout(500);

      // Verify checkout completion
      await helpers.assertElement(
        [homePageSelector.checkoutComplete.value],
        homePageSelector.checkoutComplete.type
      );
    } catch (error) {
      throw new Error(`Failed to complete checkout: ${error.message}`);
    }
  }
}

export default HeaderFooter;
