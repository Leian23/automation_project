const homePageSelectors = {
  menuButton: { type: "id", value: "react-burger-menu-btn" },
  menuList: { type: "xpath", value: "//nav[@class='bm-item-list']/a" },
  closeMenuButton: { type: "id", value: "react-burger-cross-btn" },
  shoppingCartIcon: {
    type: "xpath",
    value: "//div[@class='shopping_cart_container']",
  },
  products: {
    type: "xpath",
    value: "//div[@class='inventory_item']",
  },
  footerIcons: {
    type: "xpath",
    value: "//footer/ul/li/a",
  },
  addToCartButton: {
    type: "xpath",
    value: "//button[contains(text(), 'Add to cart')]",
  },
};

export default homePageSelectors;
