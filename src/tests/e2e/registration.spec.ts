import { test } from "@playwright/test";
import RegistrationPage from "../../pages/RegistrationPage";
import userData from "../../../playwright.config";


test.describe("User Registration Test", () => {
  test("Should register a new user successfully", async ({ page,baseURL }) => {
    const registration = new RegistrationPage(page);

    await registration.navigate(baseURL!);
    await registration.fillSignupForm(userData.signup);
    await registration.fillAddressForm(userData.address);
    await registration.submitAndVerify();
  });
});
