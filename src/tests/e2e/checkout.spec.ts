import { test } from "@playwright/test";
import CheckoutPage from "../../pages/checkoutPage";

test.describe("Shopping Cart Functionality Test", () => {

  test("should complete checkout and download invoice successfully", async ({ page,baseURL }) => {
    const checkout = new CheckoutPage(page);

    await page.goto(baseURL!); 

    await checkout.login("faizulcse@yopmail.com", "Pass@1234");

    await checkout.searchAndAddProduct("Premium Polo T-Shirts", "2");

    await checkout.proceedToCheckout();

    await checkout.fillPaymentDetails({
      name: "Paypal",
      card: "4242424242424242",
      cvc: "123",
      month: "08",
      year: "2026",
    });

    await checkout.confirmAndDownloadInvoice();
  });

});
