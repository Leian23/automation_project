const productPageSelectors = {
  productThumbnail: {
    type: "xpath",
    value: "//img[@data-test='item-sauce-labs-fleece-jacket-img']",
  },
  // Product detail page (inventory-item.html)
  backButton: {
    type: "xpath",
    value: "//button[contains(text(), 'Back to products')]",
  },
  productImage: {
    type: "css",
    value: ".inventory_details_img",
  },
  productName: {
    type: "css",
    value: ".inventory_details_name",
  },
  productDesc: {
    type: "css",
    value: ".inventory_details_desc",
  },
  productPrice: {
    type: "css",
    value: ".inventory_details_price",
  },
  addToCartButton: {
    type: "xpath",
    value: "//button[contains(text(), 'Add to cart')]",
  },
  removeButton: {
    type: "xpath",
    value: "//button[contains(text(), 'Remove')]",
  },
  shoppingCartBadge: {
    type: "xpath",
    value: "//span[@data-test='shopping-cart-badge']",
  },
};

export default productPageSelectors;