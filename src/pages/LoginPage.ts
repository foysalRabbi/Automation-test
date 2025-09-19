import {expect, Page} from "@playwright/test";

export default class LoginPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    emailField = () => this.page.getByRole('textbox', {name: 'Enter your email address'});
    passField = () => this.page.getByRole('textbox', {name: 'Password'})
    signInBtn = () => this.page.getByRole('button', {name: 'Sign in '});
    guideBtn = () => this.page.locator('#guide_button').getByRole('button');
    userProfile = () => this.page.locator("#userDropdown");
    userRole = () => this.page.locator("//span[@class='extended-light-green-bg rounded px-2 fw-bold']");
    failedMsg = () => this.page.locator("//p[@class='text-center fw-bold text-danger p-3']");

    async visit(url: string) {
        await this.page.goto(url)
        await expect(this.page.getByRole('heading', {name: 'Welcome!'})).toBeVisible();
    }

    async loginWithCredentials(email: string, password: string) {
        await this.emailField().click();
        await this.emailField().fill(email);
        await this.passField().click();
        await this.passField().fill(password);
        await this.signInBtn().click();
    }

    async verifyLoginSuccess() {
        await expect(this.guideBtn()).toBeVisible({timeout: 15000});
    }

    async getUserRole() {
        await this.userProfile().click();
        return this.userRole();
    }

    async getLoginErrorMessage() {
        return this.failedMsg();
    }
}