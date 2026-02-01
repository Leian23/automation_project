import { expect } from "@playwright/test";

export function createHelpers(page) {
  async function highlightElement(locators) {
    for (let locator of locators) {
      await locator.evaluate((el) => (el.style.border = "2px solid yellow"));
      await scrollIntoViewNested(locator);
    }
  }

  async function scrollIntoViewNested(locator) {
    await locator.scrollIntoViewIfNeeded();
  }

  function findElement(selector, strategy = "css") {
    switch (strategy) {
      case "id":
        return page.locator(`#${selector}`);
      case "css":
        return page.locator(selector);
      case "xpath":
        return page.locator(`xpath=${selector}`);
      case "text":
        return page.locator(`text=${selector}`);
      default:
        throw new Error(`Unknown strategy: ${strategy}`);
    }
  }

  async function assertElement(
    selectors,
    strategy = "id",
    highlight = true,
    timeout = 5000
  ) {
    const shouldHighlight = highlight && !process.env.CI;
    for (let sel of selectors) {
      const locator = findElement(sel, strategy);
      await expect(locator).toBeVisible({ timeout });
      if (shouldHighlight) await highlightElement([locator]);
    }
  }

  async function assertElements(
    selector,
    strategy = "id",
    highlight = true,
    timeout = 5000
  ) {
    const locator = findElement(selector, strategy);
    const count = await locator.count();
    if (count === 0)
      throw new Error(`No elements found for selector: ${selector}`);

    const shouldHighlight = highlight && !process.env.CI;
    for (let i = 0; i < count; i++) {
      const el = locator.nth(i);
      if (await el.isVisible() && shouldHighlight) await highlightElement([el]);
    }
  }

  async function assertElementContains(
    selector,
    expectedText,
    strategy = "id",
    highlight = true
  ) {
    const locator = findElement(selector, strategy);
    await expect(locator).toContainText(expectedText);
    await scrollIntoViewNested(locator);
    if (highlight && !process.env.CI) await highlightElement([locator]);
  }

  async function assertElementSoft(
    selectors,
    strategy = "id",
    highlight = true,
    timeout = 1000
  ) {
    const failures = [];
    const shouldHighlight = highlight && !process.env.CI;
    for (let sel of selectors) {
      try {
        const locator = findElement(sel, strategy);
        await expect(locator).toBeVisible({ timeout });
        await scrollIntoViewNested(locator);
        if (shouldHighlight) await highlightElement([locator]);
      } catch (err) {
        failures.push(`Failed selector: ${sel} | Error: ${err.message}`);
      }
    }
    return failures;
  }

  return {
    findElement,
    assertElement,
    assertElements,
    assertElementContains,
    assertElementSoft,
    highlightElement,
    scrollIntoViewNested,
  };
}
