import {test} from "@playwright/test";

test("Run after all Tests", async ({page}) => {
    await page.context().clearCookies();
    await page.context().storageState({path: 'storageState.json'})
})