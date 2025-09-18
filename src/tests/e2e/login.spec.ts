import {expect, test} from "@playwright/test";
import LoginPage from "../../pages/LoginPage";

test.use({storageState: {cookies: [], origins: []}})
test.describe("Login page Tests", () => {
    test("Verify that login page is successfully loaded", async ({page, baseURL}) => {
            let loginPage = new LoginPage(page)
            await loginPage.visit(baseURL)
            await loginPage.loginWithCredentials(process.env.USER_EMAIL!, process.env.USER_PASSWORD!)
            await loginPage.verifyLoginSuccess()
        }
    );

    test("Verify that user is able to insert user name and password", async ({page, baseURL}) => {
        await page.goto(baseURL);
        await expect(page.getByRole('textbox', {name: 'Enter your email address'})).toBeVisible();
        await page.getByRole('textbox', {name: 'Enter your email address'}).click();
        await page.getByRole('textbox', {name: 'Enter your email address'}).fill(process.env.USER_EMAIL);
        await expect(page.getByRole('textbox', {name: 'Enter your email address'})).toHaveValue(process.env.USER_EMAIL);
        await expect(page.getByRole('textbox', {name: 'Password'})).toBeVisible();
        await page.getByRole('textbox', {name: 'Password'}).click();
        await page.getByRole('textbox', {name: 'Password'}).fill(process.env.USER_PASSWORD!);
        await expect(page.getByRole('textbox', {name: 'Password'})).toHaveValue(process.env.USER_PASSWORD!);
        await page.getByRole('button', {name: 'Sign in '}).click();
        await page.goto(`${baseURL}/request-trip?organization=`);
    })


    test('test', async ({page, baseURL}) => {
        await page.goto(baseURL);
        await expect(page.getByText('Email address')).toBeVisible();
        await page.getByRole("button").getByAltText("flag").click()
        await page.locator("#overlay_menu").screenshot({path: 'screenshot.png'});
        await page.locator("#overlay_menu").getByRole("listitem").nth(0).screenshot({path: 'screenshot0.png'});
        await page.locator("#overlay_menu").getByRole("listitem").nth(1).screenshot({path: 'screenshot1.png'});
        await page.locator("#overlay_menu").getByRole("listitem").nth(2).screenshot({path: 'screenshot2.png'});
        await page.locator("#overlay_menu").getByRole("listitem").nth(3).screenshot({path: 'screenshot3.png'});
        await expect(page.locator("#overlay_menu").getByRole("listitem")).toHaveCount(4)
        await expect(page.locator("#overlay_menu").getByRole("listitem")).toContainText([" Danish", " English", " Norwegian", " Swedish"]);
    });
});