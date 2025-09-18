import {test} from "@playwright/test";

test("Run before all Tests", async () => {
    console.log("Global setup before all tests");
})