import { expect } from "@playwright/test";
import homePageSelector from "../selector/home_page.js";

class HomePage {
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
}

export default HomePage;
