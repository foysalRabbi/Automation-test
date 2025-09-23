import {Page} from "@playwright/test";

export default class Helper {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async setLocalStorage(params: { key: string, value: any }) {
        await this.page.evaluate((params) => {
            window.localStorage.setItem(params.key, params.value);
        }, params);
    }

    async getLocalStorage(key: string) {
        return await this.page.evaluate(async (key) => {
            return window.localStorage.getItem(key)
        }, key);
    }
}