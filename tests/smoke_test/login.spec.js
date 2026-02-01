import { test, expect } from "../fixtures.js";
import LoginPage from "../../pages/login_page.js";
import loginPageSelectors from "../../selector/login_page.js";

test.describe("Swag Labs Test - Login", () => {
  test("Should be able to login", async ({ page, helpers }) => {
    const loginPage = new LoginPage(page, helpers);
    await loginPage.openUrl();
    await helpers.assertElement(["//div[text()='Swag Labs']"], "xpath");
    await loginPage.login(process.env.USERNAME, process.env.PASSWORD);
  });

  test("Should show error and stay on login with invalid credentials", async ({
    page,
    helpers,
  }) => {
    const loginPage = new LoginPage(page, helpers);
    await loginPage.openUrl();
    await loginPage.submitCredentials("wrong_user", "wrong_pass");

    await expect(page).not.toHaveURL(/inventory\.html/);
    const error = helpers.findElement(
      loginPageSelectors.errorMessage.value,
      loginPageSelectors.errorMessage.type
    );
    await expect(error).toBeVisible();
    await expect(error).toContainText(/do not match any user|Username is required|Password is required/i);
  });
});
