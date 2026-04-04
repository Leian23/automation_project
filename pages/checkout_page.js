import { expect } from "@playwright/test";
import CheckoutPageSelectors from "../selector/checkout_page.js";
import homePageSelector from "../selector/home_page.js";

class CheckoutPage {
  constructor(page, helpers) {
    this.page = page;
    this.helpers = helpers;
  }

  async addItemToCart(itemIndex = 0) {
    const { page, helpers } = this;

    try {
      // Get all product cards
      const productCards = helpers.findElement(
        homePageSelector.products.value,
        homePageSelector.products.type,
      );

      const count = await productCards.count();
      if (count === 0) {
        throw new Error("No products found on the page");
      }

      if (itemIndex >= count) {
        throw new Error(
          `Item index ${itemIndex} is out of range. Total items: ${count}`,
        );
      }

      // Get the specific product card
      const card = productCards.nth(itemIndex);
      const addToCartButton = card.locator("button");

      // Verify button is visible and clickable
      await expect(addToCartButton).toBeVisible();
      await helpers.highlightElement([addToCartButton]);

      await addToCartButton.click();
      await expect(card.locator("button")).toHaveText(/remove/i, {
        timeout: 5000,
      });
    } catch (error) {
      throw new Error(`Failed to add item to cart: ${error.message}`);
    }
  }

  async goToCart() {
    const { page, helpers } = this;

    try {
      await helpers.assertElement(
        [CheckoutPageSelectors.shoppingCartIcon.value],
        CheckoutPageSelectors.shoppingCartIcon.type,
      );

      await helpers
        .findElement(
          CheckoutPageSelectors.shoppingCartIcon.value,
          CheckoutPageSelectors.shoppingCartIcon.type,
        )
        .click();

      await expect(page).toHaveURL(/cart.html/);
    } catch (error) {
      throw new Error(`Failed to go to cart: ${error.message}`);
    }
  }

  async checkout(firstName, lastName, postalCode) {
    const { page, helpers } = this;

    try {
      // Click checkout button (on cart page)
      await helpers.assertElement(
        [CheckoutPageSelectors.checkoutButton.value],
        CheckoutPageSelectors.checkoutButton.type,
      );

      await helpers
        .findElement(
          CheckoutPageSelectors.checkoutButton.value,
          CheckoutPageSelectors.checkoutButton.type,
        )
        .click();

      await expect(page).toHaveURL(/checkout-step-one.html/);

      // Fill in checkout information
      await helpers.assertElement(
        [CheckoutPageSelectors.firstNameField.value],
        CheckoutPageSelectors.firstNameField.type,
      );
      await helpers.assertElement(
        [CheckoutPageSelectors.lastNameField.value],
        CheckoutPageSelectors.lastNameField.type,
      );
      await helpers.assertElement(
        [CheckoutPageSelectors.postalCodeField.value],
        CheckoutPageSelectors.postalCodeField.type,
      );

      await helpers
        .findElement(
          CheckoutPageSelectors.firstNameField.value,
          CheckoutPageSelectors.firstNameField.type,
        )
        .fill(firstName);

      await helpers
        .findElement(
          CheckoutPageSelectors.lastNameField.value,
          CheckoutPageSelectors.lastNameField.type,
        )
        .fill(lastName);

      await helpers
        .findElement(
          CheckoutPageSelectors.postalCodeField.value,
          CheckoutPageSelectors.postalCodeField.type,
        )
        .fill(postalCode);

      await helpers.highlightElement([
        helpers.findElement(
          CheckoutPageSelectors.firstNameField.value,
          CheckoutPageSelectors.firstNameField.type,
        ),
        helpers.findElement(
          CheckoutPageSelectors.lastNameField.value,
          CheckoutPageSelectors.lastNameField.type,
        ),
        helpers.findElement(
          CheckoutPageSelectors.postalCodeField.value,
          CheckoutPageSelectors.postalCodeField.type,
        ),
      ]);

      // Click continue button
      await helpers
        .findElement(
          CheckoutPageSelectors.continueButton.value,
          CheckoutPageSelectors.continueButton.type,
        )
        .click();

      await expect(page).toHaveURL(/checkout-step-two.html/);

      // Click finish button
      await helpers.assertElement(
        [CheckoutPageSelectors.finishButton.value],
        CheckoutPageSelectors.finishButton.type,
      );

      await helpers
        .findElement(
          CheckoutPageSelectors.finishButton.value,
          CheckoutPageSelectors.finishButton.type,
        )
        .click();

      await expect(page).toHaveURL(/checkout-complete.html/);

      // Verify checkout completion
      await helpers.assertElement(
        [CheckoutPageSelectors.checkoutComplete.value],
        CheckoutPageSelectors.checkoutComplete.type,
      );
    } catch (error) {
      throw new Error(`Failed to complete checkout: ${error.message}`);
    }
  }
}

export default CheckoutPage;
