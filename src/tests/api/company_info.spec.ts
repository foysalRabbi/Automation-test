import {expect, test} from "@playwright/test";

test("api/company_info", async ({request, baseURL}) => {
    const response = await request.get(`${baseURL}/company-user-details?company_id=`, {
        params: {
            company_id: ''
        },
        headers: {
            "accept": "application/json",
            'authorization': `Bearer e65t7yu8iuhbjnkmljkn`
        }
    });

    console.log(response.status());
    expect(response.status()).toBe(200);
    const res = await response.text();
    console.log(JSON.parse(res));
});