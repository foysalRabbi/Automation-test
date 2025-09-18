import {test} from "@playwright/test";

test("Run after all Tests", async () => {
    console.log("Global teardown after all tests");
})