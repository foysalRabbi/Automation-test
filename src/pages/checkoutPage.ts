import { expect, Page } from "@playwright/test";

export default class CheckoutPage {
  constructor(private page: Page) {}

  async login(email: string, password: string) {
    await this.page.getByRole('link', { name: ' Signup / Login' }).click();
    await this.page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill(email);
    await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }

  async searchAndAddProduct(productName: string, quantity: string) {
    await this.page.getByRole('link', { name: ' Products' }).click();
    await this.page.getByRole('textbox', { name: 'Search Product' }).fill(productName);
    await this.page.getByRole('button', { name: '' }).click();
    await this.page.getByRole('link', { name: ' View Product' }).click();
    await this.page.locator('#quantity').fill(quantity);
    await this.page.getByRole('button', { name: ' Add to cart' }).click();
    await expect(this.page.getByText('Your product has been added')).toBeVisible();
    await this.page.getByRole('button', { name: 'Continue Shopping' }).click();
  }

  async proceedToCheckout() {
    await this.page.getByRole('link', { name: ' Cart' }).click();
    await this.page.getByText('Proceed To Checkout').click();
    await this.page.getByRole('link', { name: 'Place Order' }).click();
  }

  async fillPaymentDetails(payment: { name: string; card: string; cvc: string; month: string; year: string; }) {
    await this.page.locator('input[name="name_on_card"]').fill(payment.name);
    await this.page.locator('input[name="card_number"]').fill(payment.card);
    await this.page.getByRole('textbox', { name: 'ex.' }).fill(payment.cvc);
    await this.page.getByRole('textbox', { name: 'MM' }).fill(payment.month);
    await this.page.getByRole('textbox', { name: 'YYYY' }).fill(payment.year);
  }

  async confirmAndDownloadInvoice() {
    await this.page.getByRole('button', { name: 'Pay and Confirm Order' }).click();
    await expect(this.page.getByText('Congratulations! Your order')).toBeVisible();

    const downloadPromise = this.page.waitForEvent('download');
    await expect(this.page.getByRole('link', { name: 'Download Invoice' })).toBeVisible();
    await this.page.getByRole('link', { name: 'Download Invoice' }).click();

    const download = await downloadPromise;
    await expect(this.page.getByRole('link', { name: 'Download Invoice' })).toBeVisible();

    return download;
  }
}
