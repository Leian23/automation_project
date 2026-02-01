import { expect } from "@playwright/test";
import loginPageSelector from "../selector/login_page.js";

export default class LoginPage {
  constructor(page, helpers) {
    this.page = page;
    this.helpers = helpers;
  }

  async openUrl() {
    const { page } = this;
    try {
      await page.goto("/");
    } catch (error) {
      throw new Error(`Failed to open URL: ${error.message}`);
    }
  }

  async login(email, password) {
    const { page, helpers } = this;

    try {
      await helpers.assertElement(
        [loginPageSelector.usernameField.value],
        loginPageSelector.usernameField.type
      );
      await helpers.assertElement(
        [loginPageSelector.passwordField.value],
        loginPageSelector.passwordField.type
      );

      // Fill credentials
      await helpers
        .findElement(
          loginPageSelector.usernameField.value,
          loginPageSelector.usernameField.type
        )
        .fill(email);
      await helpers
        .findElement(
          loginPageSelector.passwordField.value,
          loginPageSelector.passwordField.type
        )
        .fill(password);

      await helpers
        .findElement(
          loginPageSelector.loginButton.value,
          loginPageSelector.loginButton.type
        )
        .click();

      await expect(page).toHaveURL(/inventory.html/);
    } catch (error) {
      throw new Error(`Failed to open Login: ${error.message}`);
    }
  }

  /** Fill and submit login form without asserting success. Use for negative tests. */
  async submitCredentials(email, password) {
    const { page, helpers } = this;
    await helpers
      .findElement(
        loginPageSelector.usernameField.value,
        loginPageSelector.usernameField.type
      )
      .fill(email);
    await helpers
      .findElement(
        loginPageSelector.passwordField.value,
        loginPageSelector.passwordField.type
      )
      .fill(password);
    await helpers
      .findElement(
        loginPageSelector.loginButton.value,
        loginPageSelector.loginButton.type
      )
      .click();
  }
}
