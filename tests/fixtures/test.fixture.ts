import { test as baseTest } from "@playwright/test";
import { HomePage } from "../e2e/pages/home.page";

type CustomFixtures = {
  homePage: HomePage;
};

export const test = baseTest.extend<CustomFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await use(homePage);
  },
});

export { expect } from "@playwright/test";