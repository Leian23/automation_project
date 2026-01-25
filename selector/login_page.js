const loginPageSelectors = {
  usernameField: { type: "id", value: "user-name" },
  passwordField: { type: "id", value: "password" },
  loginCredentials: { type: "css", value: ".login_credentials" },
  loginButton: { type: "id", value: "login-button" },
  errorMessage: { type: "css", value: "[data-test='error']" },
};
export default loginPageSelectors;
