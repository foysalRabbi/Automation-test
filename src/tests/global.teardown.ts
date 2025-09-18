import {test} from "@playwright/test";

test("Run after all Tests", async ({page}) => {
    console.log("Global teardown after all tests");
    await page.context().clearCookies();
    await page.context().storageState({path: 'storageState.json'})
})