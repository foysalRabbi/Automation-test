import {test} from "@playwright/test";
import {CompanyUser} from "../../types/company_user";

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

    const res = await response.text();
    let company_user: CompanyUser = JSON.parse(res).data;
});