import {expect, Page} from "@playwright/test";
import Helper from "./Helper";

export default class ApiHelper extends Helper {
    constructor(page: Page) {
        super(page);
    }

    async setAccessToken() {
        const provider = "CognitoIdentityServiceProvider.7rh8b727r4kjsjo877q3ei9525."
        const cognito_user = await this.getLocalStorage(`${provider}LastAuthUser`);
        const accessToken = await this.getLocalStorage(`${provider}${cognito_user}.accessToken`);
        await this.page.context().setExtraHTTPHeaders({
            Authorization: `Bearer ${accessToken}`
        });
    }

    async getCompanyUserInfo() {
        const res = await this.page.request.get(`${process.env.API_URL}/company-user-details?company_id=`, {
            params: {
                company_id: ''
            }
        });
        expect(res.status()).toBe(200);
        return JSON.parse(await res.text()).data;
    }
}