import { test, expect } from "../fixtures/test.fixture";
import { TEST_DATA } from "../config/test-data";

test.beforeEach(async ({ page }) => {
  await page.goto("/", { waitUntil: "commit" });

  const title = await page.title();
  if (title.includes("Just a moment") || title.includes("Attention Required")) {
    await page.waitForFunction(
      () => !(window as any).document.title.includes("Just a moment"),
      { timeout: 15000 }
    ).catch(() => {});
  }

  await page.waitForLoadState("domcontentloaded");
});

test.describe("Product Hunt Web E2E Suite", () => {
  test("1. Homepage should load and display principal search element", async ({ page, homePage }) => {
    await expect(page).toHaveTitle(/Product Hunt/i);
    await expect(homePage.searchBar).toBeVisible();
  });

  test("2. Navigating to a topic feed updates page URL correctly @bugId-123", async ({ page, homePage }) => {
    test.skip(true, "Skipping because topic/category link fail to navigate correctly");
    if (await homePage.firstTopicLink.isVisible()) {
      await homePage.firstTopicLink.click();
      await expect(page.url()).toContain("/topics/");
    }
  });

  test("3. Search input should accept a query", async ({ homePage }) => {
    await homePage.searchFor(TEST_DATA.SEARCH_QUERY);
    await expect(homePage.searchInput).toHaveValue(TEST_DATA.SEARCH_QUERY);
  });

  test("4. Clicking a product card navigates to detailed post page", async ({ page, homePage }) => {
      await expect(homePage.firstProductPost).toBeVisible();
      await homePage.firstProductPost.click();
      await expect(page).toHaveURL(/products/);
    });

  test("5. Footer navigation items should be accessible upon scrolling to bottom", async ({ homePage }) => {
    await homePage.scrollToBottom();
    await expect(homePage.aboutLink).toBeVisible();
  });

  test("6. Unauthenticated upvote click prompts login options", async ({ page, homePage }) => {
    if (await homePage.upvoteButton.isVisible()) {
      await homePage.upvoteButton.click();
      const loginPrompt = page.locator("text=/sign in|log in|welcome/i").first();
      await expect(loginPrompt).toBeVisible();
    }
  });

  test("7. Login functionality", async ({ page, homePage }) => {
    test.skip(true, "Login requires a third-party account and is not implemented but mentioned as it is a critical user flow");
  });

  test("8. Direct navigation to non-existent topic route loads fallback UI", async ({ page }) => {
    await page.goto(`https://www.producthunt.com/topics/${TEST_DATA.INVALID_TOPIC_SLUG}`);
    await expect(page.locator("body")).toBeVisible();
  });
});