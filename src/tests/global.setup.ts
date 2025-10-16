import {test} from "@playwright/test";

test("Run before all Tests", async ({page, baseURL}) => {
    console.log("Hello Automation Test");
    await page.context().storageState({path: 'storageState.json'})
})