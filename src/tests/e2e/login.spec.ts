import {expect, test} from "@playwright/test";
import LoginPage from "../../pages/LoginPage";

test.use({storageState: {cookies: [], origins: []}})
test.describe("Login page Tests", () => {
    test("Verify that login page is successfully loaded", async ({page, baseURL}) => {
            let loginPage = new LoginPage(page)
            await loginPage.visit(baseURL!)
            await loginPage.loginWithCredentials(process.env.USER_EMAIL!, process.env.USER_PASSWORD!)
            await loginPage.verifyLoginSuccess()
        }
    );

    test("Verify that user is able to insert user name and password", async ({page, baseURL}) => {
        await page.goto(baseURL!);
        await expect(page.getByRole('textbox', {name: 'Enter your email address'})).toBeVisible();
        await page.getByRole('textbox', {name: 'Enter your email address'}).click();
        await page.getByRole('textbox', {name: 'Enter your email address'}).fill(process.env.USER_EMAIL);
        await expect(page.getByRole('textbox', {name: 'Enter your email address'})).toHaveValue(process.env.USER_EMAIL);
        await expect(page.getByRole('textbox', {name: 'Password'})).toBeVisible();
        await page.getByRole('textbox', {name: 'Password'}).click();
        await page.getByRole('textbox', {name: 'Password'}).fill(process.env.USER_PASSWORD!);
        await expect(page.getByRole('textbox', {name: 'Password'})).toHaveValue(process.env.USER_PASSWORD!);
        await page.getByRole('button', {name: 'Sign in '}).click();
        await new LoginPage(page).verifyLoginSuccess();
    })

    test.only('User is able to select any language', async ({page, baseURL}) => {
        const locales = ["da", "en", "no", "sv"];
        const languages = ["Danish", "English", "Norwegian", "Swedish"];

        await page.goto(baseURL!);
        await expect(page.getByText('Email address')).toBeVisible();
        await page.getByRole("button").getByAltText("flag").click()
        await new LoginPage(page).verifyLangSelection(languages, locales);
    });
});