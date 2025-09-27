import {test} from "@playwright/test";

test.describe("Event Handler Tests", () => {
    test.skip("Download event test", async ({page}) => {
        await page.goto("https://www.messenger.com/desktop");
        const downloadEvent = page.waitForEvent("download");
        await page.getByRole('button', {name: 'Download'}).click();
        const downloadPage = await downloadEvent;
        console.log(`Download URL: ${downloadPage.url()}`);
        await downloadPage.saveAs(`./downloads/${downloadPage.suggestedFilename()}`);
    })
});