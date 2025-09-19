import {expect, test} from "@playwright/test";
import {csvData} from "../../../playwright.config";
import LoginPage from "../../pages/LoginPage";

test.use({storageState: {cookies: [], origins: []}})
test.describe("Parameterized Tests", () => {
    csvData.forEach((data, i) => {
        test(`Scenario ${i}: Login with different credentials`, async ({page, baseURL}) => {
            let loginPage = new LoginPage(page);
            await loginPage.visit(baseURL!);
            await loginPage.loginWithCredentials(data["user"], data["password"]);

            if (data["status"] === "passed") {
                await loginPage.verifyLoginSuccess();
                await expect(await loginPage.getUserRole()).toContainText(data["expected"]);
            } else {
                await expect(await loginPage.getLoginErrorMessage()).toContainText(data["expected"]);
            }
        });
    });
});