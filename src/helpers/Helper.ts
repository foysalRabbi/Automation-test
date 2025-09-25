import {Page} from "@playwright/test";
import {Amplify, Auth} from "aws-amplify";

Amplify.configure({
    Auth: {
        region: process.env.REGION,
        userPoolId: process.env.USER_POOL_ID,
        userPoolWebClientId: process.env.USER_POOL_WEB_CLIENT_ID
    },
});

export default class Helper {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async token(username: string, password: string) {
        try {
            await Auth.signIn(username, password);
            const session = await Auth.currentSession();
            return session.getAccessToken().getJwtToken();
        } catch (error) {
            console.error('Error signing in: ', error);
            throw error;
        }
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