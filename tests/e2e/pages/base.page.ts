import type { Page } from "@playwright/test";

export abstract class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async scrollToBottom() {
    await this.page.evaluate(() => (globalThis as any).scrollTo(0, (globalThis as any).document.body.scrollHeight));
  }
}