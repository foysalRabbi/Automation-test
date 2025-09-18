import {expect, test} from "@playwright/test";

test("Run before all Tests", async ({page, baseURL}) => {
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
    await page.waitForTimeout(10000)
    await page.context().storageState({path: 'storageState.json'})
})