import {test} from "@playwright/test";

test.describe("Landing page Tests", async () => {

    test("User should already be logged in1", async ({page, baseURL}) => {
        await page.goto(baseURL);
        await page.reload();
    })

    test("User should already be logged in2", async ({page, baseURL}) => {
        await page.goto(baseURL);
        await page.reload();

    })
});