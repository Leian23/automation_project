# Playwright Automation Framework

This is my test automation project for Swag Labs, built with Playwright. I've set it up using the Page Object Model pattern to keep things organized and make the tests easier to maintain as the project grows.

## 🚀 What's Included

- **Page Object Model**: I've separated the page logic from the test code to keep things clean
- **Multi-browser Testing**: Runs tests on Chromium, Firefox, and WebKit so we can catch browser-specific issues
- **Helper Utilities**: Some reusable helper functions I created for common tasks like finding elements and highlighting them during debugging
- **Environment Configuration**: Using `.env` files to keep credentials and URLs secure
- **Test Reports**: HTML reports with screenshots and videos when tests fail
- **Cross-platform**: Should work fine on Windows, macOS, and Linux

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd automation_project
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

4. Create a `.env` file in the root directory with your test credentials:
```bash
# Create .env file with the following variables:
# BA_URL=your_base_url
# USERNAME=your_username
# PASSWORD=your_password
```

## 🧪 Running Tests

### Run all tests:
```bash
npm test
```

### Run tests in headed mode (visible browser):
```bash
npm run test-headed
```

### Run specific test file:
```bash
npx playwright test tests/smoke_test/login.spec.js
```

### Run tests in a specific browser:
```bash
npx playwright test --project=chromium
```

### Run tests with UI mode:
```bash
npx playwright test --ui
```

## 📁 Project Structure

```
automation_project/
├── helpers/           # Reusable helper functions
│   └── helper.js
├── pages/            # Page Object Model classes
│   ├── loginPage.js
│   └── home_page.js
├── selector/         # Page selectors/locators
│   ├── loginPage.js
│   └── homepage.js
├── tests/            # Test specifications
│   └── smoke_test/
│       ├── login.spec.js
│       ├── home.spec.js
│       └── header_footer.spec.js
├── playwright.config.js  # Playwright configuration
├── package.json
└── README.md
```

## 🏗️ How It's Organized

### Page Object Model (POM)
I've created separate classes for each page that handle:
- All the selectors for that page
- Methods to interact with the page
- Any validations needed

### Helper Functions
I built some utility functions that I use across tests:
- Finding elements using different strategies (CSS, ID, XPath, or by text)
- Asserting elements are visible or contain expected text
- Highlighting elements while debugging (makes it easier to see what's happening)
- Scrolling elements into view

### Selector Management
I keep all selectors in separate files from the page objects. This makes it easier to update them when the UI changes without having to dig through the page object code.

## 🔧 Configuration

The `playwright.config.js` file contains:
- Test directory configuration
- Browser projects (Chromium, Firefox, WebKit)
- Retry strategy
- Screenshot and video settings
- Reporter configuration

## 📊 Test Reports

After running tests, view the HTML report:
```bash
npx playwright show-report
```

Reports include:
- Test execution status
- Screenshots on failure
- Video recordings
- Execution time

## 🐛 Debugging

### Debug mode:
```bash
npx playwright test --debug
```

### Run with trace:
```bash
npx playwright test --trace on
```

View trace:
```bash
npx playwright show-trace trace.zip
```

## 📝 Some Things I Try to Follow

1. **Page Objects**: I always use page objects when interacting with elements - keeps the test code clean
2. **Selectors**: Selectors live in their own files so they're easy to find and update
3. **Helpers**: I use the helper functions for repetitive tasks instead of duplicating code
4. **Environment Variables**: Never commit credentials or sensitive URLs - everything goes in `.env` files
5. **Error Handling**: I've added error handling in the page methods so failures are easier to debug
6. **Test Data**: I try to keep test data separate from the actual test logic

## 🚧 Things I'd Like to Add Later

- [ ] Maybe add some API testing examples
- [ ] Database testing if we need it
- [ ] Set up CI/CD so tests run automatically
- [ ] Better way to manage test data
- [ ] Performance testing if it becomes relevant
- [ ] Visual regression testing could be useful
- [ ] Mobile device testing support

## 📄 License

ISC

## 👤 Author
Leandro Ayeras
Built for Swag Labs test automation

