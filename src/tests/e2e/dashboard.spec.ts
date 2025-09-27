import {expect, test} from "@playwright/test";
import LoginPage from "../../pages/LoginPage";
import {languages, locales, UserRoles} from "../../types/data_helper";
import ApiHelper from "../../helpers/ApiHelper";
import {CompanyUser} from "../../types/company_user";

let apiHelper: ApiHelper;
let company_user: CompanyUser;

test.describe("Dashboard page Tests", () => {
    test.beforeEach(async ({page}) => {
        await page.goto("/");
        apiHelper = new ApiHelper(page);
        await apiHelper.setAccessTokenToHeader();
        company_user = await apiHelper.getCompanyUserInfo();
    });

    test("Verify that dashboard is displayed properly", async ({page}) => {
        await expect(page.locator('#guide_button').getByRole('button')).toBeVisible();
        await expect(page.getByRole('button', {name: ''})).toBeVisible();
        await page.getByRole('button', {name: `${company_user.user_info.first_name[0]}${company_user.user_info.last_name[0]}`}).click();

        await expect(page.getByText('Powered by')).toBeVisible();
        await expect(page.getByRole('img', {name: 'Ferdia'})).toBeVisible();
        await expect(page.getByRole('link', {name: 'Download Ferdia BusNetwork'})).toBeVisible();
        await expect(page.getByRole('link', {name: 'Contact us'})).toBeVisible();
        await page.getByRole('link', {name: 'Download Ferdia BusNetwork'}).click();
        await expect(page.getByText('Get it on your preferred')).toBeVisible();

        const page1Promise = page.waitForEvent('popup');
        await page.getByRole('link', {name: ''}).click();
        const page1 = await page1Promise;
        await page1.close()

        const page2Promise = page.waitForEvent('popup');
        await page.getByRole('link', {name: ''}).click();
        const page2 = await page2Promise;
        await page2.close()

        const page3Promise = page.waitForEvent('popup');
        await page.getByRole('link', {name: 'Contact us'}).click();
        const page3 = await page3Promise;
        await page3.close()
    })

    test("Verify that user information is displayed properly", async ({page}) => {
        await page.getByRole('button', {name: `${company_user.user_info.first_name[0]}${company_user.user_info.last_name[0]}`}).click();
        await page.locator('#overlay_menu img').click();
        await expect(page.locator('#overlay_menu img')).toBeVisible();
        await expect(page.getByText(`${company_user.user_info.first_name} ${company_user.user_info.last_name}`)).toBeVisible();
        await expect(page.getByText(UserRoles[company_user.user_info.roles[0]])).toBeVisible();
        await expect(page.getByText(company_user.user_info.email)).toBeVisible();
        await expect(page.getByRole('button', {name: 'Logout'})).toBeVisible();
        await expect(page.getByText(/Software Version: V\d+.\d+.\d+/)).toBeVisible();
    });

    test('User is able to select different language', async ({page}) => {
        let login = new LoginPage(page);
        await login.openLangPopup()
        await login.verifyLangSelection(languages, locales);
    });
});