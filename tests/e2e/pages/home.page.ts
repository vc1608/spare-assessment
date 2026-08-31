import type { Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class HomePage extends BasePage {
  readonly searchBar: Locator;
  readonly searchInput: Locator;
  readonly firstTopicLink: Locator;
  readonly firstProductPost: Locator;
  readonly aboutLink: Locator;
  readonly upvoteButton: Locator;
  readonly emailInput: Locator;

  constructor(page: Page) {
    super(page);
    this.searchBar = page.locator('[data-test="header-search-input"]');
    this.searchInput = page.locator('[data-test="spotlight-search-input"]');
    this.firstTopicLink = page.locator('a[href*="/topics/"]').first();
    this.firstProductPost = page.locator('a[href*="/products/"]').first();
    this.aboutLink = page.getByRole("link", { name: /about/i }).first();
    this.upvoteButton = page.locator('button:has-text("UPVOTE"), button[data-test*="vote"]').first();
    this.emailInput = page.locator('input[type="email"]').first();
  }

  async goto() {
    await this.page.goto("https://www.producthunt.com/");
  }

  async searchFor(query: string) {
    await this.searchBar.click();
    await this.searchInput.fill(query);
  }
}