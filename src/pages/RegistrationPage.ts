import { expect, Page } from "@playwright/test";


export default class RegistrationPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Navigates to URL
  async navigate(url: string) {
    await this.page.goto(url);
    await expect(this.page.getByRole('link', { name: ' Signup / Login' })).toBeVisible();
  }

  // Signup form
  async fillSignupForm(signupData: any) {
    await this.page.getByRole('link', { name: ' Signup / Login' }).click();
    await expect(this.page.getByRole('heading', { name: 'New User Signup!' })).toBeVisible();

    await this.page.getByRole('textbox', { name: 'Name' }).fill(signupData.name);
    await this.page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill(signupData.email);
    await this.page.getByRole('button', { name: 'Signup' }).click();

    await this.page.getByRole('radio', { name: 'Mr.' }).check();
    await this.page.getByRole('textbox', { name: 'Password *' }).fill(signupData.password);
    await this.page.locator('#days').selectOption(signupData.day);
    await this.page.locator('#months').selectOption(signupData.month);
    await this.page.locator('#years').selectOption(signupData.year);

    await this.page.getByRole('checkbox', { name: 'Sign up for our newsletter!' }).check();
    await this.page.getByRole('checkbox', { name: 'Receive special offers from' }).check();
  }

  // Address form
  async fillAddressForm(addressData: any) {
    await this.page.getByRole('textbox', { name: 'First name *' }).fill(addressData.first_name);
    await this.page.getByRole('textbox', { name: 'Last name *' }).fill(addressData.last_name);
    await this.page.getByRole('textbox', { name: 'Company', exact: true }).fill(addressData.company);
    await this.page.getByRole('textbox', { name: 'Address * (Street address, P.' }).fill(addressData.address1);
    await this.page.getByRole('textbox', { name: 'Address 2' }).fill(addressData.address2);
    await this.page.getByLabel('Country *').selectOption(addressData.country);
    await this.page.getByRole('textbox', { name: 'State *' }).fill(addressData.state);
    await this.page.getByRole('textbox', { name: 'City * Zipcode *' }).fill(addressData.city);
    await this.page.locator('#zipcode').fill(addressData.zipcode);
    await this.page.getByRole('textbox', { name: 'Mobile Number *' }).fill(addressData.mobile);
  }

  // Create account and validation
  async submitAndVerify() {
    await this.page.getByRole('button', { name: 'Create Account' }).click();
    await expect(this.page.getByText('Account Created!')).toBeVisible();
    await this.page.getByRole('link', { name: 'Continue' }).click();
    await expect(this.page.getByText(/Logged in as/i)).toBeVisible();
  }
}
