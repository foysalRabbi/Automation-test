import { expect, Page } from "@playwright/test";

export default class SearchPage {
  constructor(private page: Page) {}

  async searchProduct(productName: string) {
    await this.page.getByRole('link', { name: ' Products' }).click();
    await this.page.getByRole('textbox', { name: 'Search Product' }).click();
    await this.page.getByRole('textbox', { name: 'Search Product' }).fill(productName);
    await expect(this.page.getByRole('heading', { name: 'All Products' })).toBeVisible();
    await this.page.getByRole('button', { name: '' }).click();
  }

  async viewProduct(productName: string) {
    await this.page.getByRole('link', { name: ' View Product' }).click();
    await expect(this.page.getByRole('heading', { name: new RegExp(productName.split('-')[0].trim(), 'i') })).toBeVisible();
    await expect(this.page.getByText('Rs.')).toBeVisible();
  }
}
