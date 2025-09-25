import {expect, Page} from "@playwright/test";
import Helper from "./Helper";

export default class ApiHelper extends Helper {
    constructor(page: Page) {
        super(page);
    }

    async setAccessToken(username: string, password: string) {
        await this.setLocalStorage({
            key: 'AccessToken',
            value: `Bearer ${await this.token(username, password)}`
        });
    }

    async setAccessTokenToHeader() {
        await this.page.context().setExtraHTTPHeaders({
            Authorization: await this.getLocalStorage("AccessToken")
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