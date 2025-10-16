import { test } from "@playwright/test";
import SearchPage from "../../pages/SearchPage";
import { csvData } from "../../../playwright.config";

test.describe("Search ProductTests", () => {

  csvData.forEach((data:any, index:any) => {
    test(`Scenario ${index + 1}: Search for product "${data.productName}"`, async ({ page,baseURL }) => {
      const searchPage = new SearchPage(page);
      await page.goto(baseURL!); 
      await searchPage.searchProduct(data.productName);
      await searchPage.viewProduct(data.productName);
    });
  });

});
