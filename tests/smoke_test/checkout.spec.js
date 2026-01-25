import { test, expect } from "../fixtures.js";
import HomePage from "../../pages/home_page.js";
import CheckoutPage from "../../pages/checkout_page.js";
import CheckoutPageSelectors from "../../selector/checkout_page.js";

test.describe("Swag Labs Test - Checkout", () => {
  test("Should be able to add item to cart and checkout", async ({
    page,
    helpers,
    loggedIn,
  }) => {
    const homePage = new HomePage(page, helpers);
    const checkoutPage = new CheckoutPage(page, helpers);

    await helpers.assertElement(["//span[text()='Products']"], "xpath");

    await checkoutPage.addItemToCart(0);
    await checkoutPage.goToCart();
    await checkoutPage.checkout(
      process.env.FIRST_NAME,
      process.env.LAST_NAME,
      process.env.ZIP_CODE
    );
  });

  test("Should show empty cart when navigating to cart without adding items", async ({
    page,
    helpers,
    loggedIn,
  }) => {
    const checkoutPage = new CheckoutPage(page, helpers);
    await checkoutPage.goToCart();

    await expect(page).toHaveURL(/cart\.html/);
    await expect(page.getByText("Continue Shopping")).toBeVisible();
    await expect(page.locator(".cart_item")).toHaveCount(0);
  });

  test("Should show validation when checkout with empty first name", async ({
    page,
    helpers,
    loggedIn,
  }) => {
    const checkoutPage = new CheckoutPage(page, helpers);

    await checkoutPage.addItemToCart(0);
    await checkoutPage.goToCart();

    await helpers
      .findElement(
        CheckoutPageSelectors.checkoutButton.value,
        CheckoutPageSelectors.checkoutButton.type
      )
      .click();

    await expect(page).toHaveURL(/checkout-step-one\.html/);

    // Leave first name empty, fill the rest, click continue
    await helpers
      .findElement(
        CheckoutPageSelectors.lastNameField.value,
        CheckoutPageSelectors.lastNameField.type
      )
      .fill("Doe");
    await helpers
      .findElement(
        CheckoutPageSelectors.postalCodeField.value,
        CheckoutPageSelectors.postalCodeField.type
      )
      .fill("12345");

    await helpers
      .findElement(
        CheckoutPageSelectors.continueButton.value,
        CheckoutPageSelectors.continueButton.type
      )
      .click();

    // Swag Labs shows error and stays on step-one
    await expect(page).toHaveURL(/checkout-step-one\.html/);
    await expect(page.locator("[data-test='error']")).toBeVisible();
  });
});
