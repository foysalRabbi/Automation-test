import {test} from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import ApiHelper from "../helpers/ApiHelper";

test("Run before all Tests", async ({page, baseURL}) => {
    await page.addInitScript({path: './preload.js'});
    let loginPage = new LoginPage(page)
    await loginPage.visit(baseURL!)
    await loginPage.loginWithCredentials(process.env.USER_EMAIL!, process.env.USER_PASSWORD!)
    await loginPage.verifyLoginSuccess()
    await new ApiHelper(page).setAccessToken(process.env.USER_EMAIL!, process.env.USER_PASSWORD!)
    await page.context().storageState({path: 'storageState.json'})
})