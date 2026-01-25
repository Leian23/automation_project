const CheckoutPageSelectors = {
  shoppingCartIcon: {
    type: "xpath",
    value: "//div[@class='shopping_cart_container']",
  },
  addToCartButton: {
    type: "xpath",
    value: "//button[contains(text(), 'Add to cart')]",
  },
  checkoutButton: {
    type: "id",
    value: "checkout",
  },
  continueButton: {
    type: "id",
    value: "continue",
  },
  finishButton: {
    type: "id",
    value: "finish",
  },
  firstNameField: {
    type: "id",
    value: "first-name",
  },
  lastNameField: {
    type: "id",
    value: "last-name",
  },
  postalCodeField: {
    type: "id",
    value: "postal-code",
  },
  checkoutComplete: {
    type: "xpath",
    value: "//h2[contains(text(), 'Thank you for your order!')]",
  },
};

export default CheckoutPageSelectors;
