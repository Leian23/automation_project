import { test as base, expect } from "@playwright/test";
import { createHelpers } from "../helpers/helper.js";
import LoginPage from "../pages/login_page.js";

export const test = base.extend({
  helpers: async ({ page }, use) => {
    await use(createHelpers(page));
  },

  loggedIn: async ({ page, helpers }, use) => {
    const loginPage = new LoginPage(page, helpers);
    await loginPage.openUrl();
    await helpers.assertElement(["//div[text()='Swag Labs']"], "xpath");
    await loginPage.login(process.env.USERNAME, process.env.PASSWORD);
    await expect(page).toHaveURL(/inventory\.html/);
    await use();
  },
});

export { expect };
