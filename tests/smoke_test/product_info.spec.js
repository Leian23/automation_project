import { test, expect } from "../fixtures.js";
import ProductDetailPage from "../../pages/product_page.js";
import productPageSelectors from "../../selector/product_page.js";

test.describe("Swag Labs Test - Product Detail Page", () => {
  test("Should display all required elements on product detail page", async ({
    page,
    helpers,
    loggedIn,
  }) => {
    const productDetailPage = new ProductDetailPage(page, helpers);

    await helpers.assertElement(["//span[text()='Products']"], "xpath");
    await productDetailPage.navigateToProduct(0);

    await helpers.assertElement(
      [productPageSelectors.backButton.value],
      productPageSelectors.backButton.type,
    );

    const image = helpers.findElement(
      productPageSelectors.productImage.value,
      productPageSelectors.productImage.type,
    );
    await expect(image).toBeVisible();

    const name = helpers.findElement(
      productPageSelectors.productName.value,
      productPageSelectors.productName.type,
    );
    await expect(name).toBeVisible();
    await expect(name).not.toHaveText("");

    const desc = helpers.findElement(
      productPageSelectors.productDesc.value,
      productPageSelectors.productDesc.type,
    );
    await expect(desc).toBeVisible();
    await expect(desc).not.toHaveText("");

    const price = helpers.findElement(
      productPageSelectors.productPrice.value,
      productPageSelectors.productPrice.type,
    );
    await expect(price).toBeVisible();
    await expect(price).toHaveText(/^\$\d+\.\d{2}$/);

    await helpers.assertElement(
      [productPageSelectors.addToCartButton.value],
      productPageSelectors.addToCartButton.type,
    );
  });

  test("Should go back to products list from product detail", async ({
    page,
    helpers,
    loggedIn,
  }) => {
    const productDetailPage = new ProductDetailPage(page, helpers);

    await helpers.assertElement(["//span[text()='Products']"], "xpath");
    await productDetailPage.navigateToProduct(0);
    await expect(page).toHaveURL(/inventory-item\.html\?id=/);

    await productDetailPage.backToProducts();
    await expect(page).toHaveURL(/inventory\.html/);
    await helpers.assertElement(["//span[text()='Products']"], "xpath");
  });

  test("Should add product to cart from product detail page", async ({
    page,
    helpers,
    loggedIn,
  }) => {
    const productDetailPage = new ProductDetailPage(page, helpers);

    await helpers.assertElement(["//span[text()='Products']"], "xpath");
    await productDetailPage.navigateToProduct(0);
    await productDetailPage.addToCart();

    const cartBadge = await helpers
      .findElement(
        productPageSelectors.shoppingCartBadge.value,
        productPageSelectors.shoppingCartBadge.type,
      )
      .textContent();
    expect(cartBadge).toBe("1");

    const removeBtn = helpers.findElement(
      productPageSelectors.removeButton.value,
      productPageSelectors.removeButton.type,
    );
    await expect(removeBtn).toBeVisible();
    await expect(removeBtn).toHaveText(/remove/i);
  });
});
