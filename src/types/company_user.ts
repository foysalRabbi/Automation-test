export type CompanyUser = {
    company_info: {
        company_id: string;
        name: string;
        org_number: string;
        country_code: string;
        status: string;
    };
    user_info: {
        user_id: string;
        first_name: string;
        last_name: string;
        email: string;
        phone_number: string;
        roles: string[];
    };
};
