import {defineConfig, devices} from "@playwright/test";
import * as dotenv from "dotenv";
import * as fs from "node:fs";
import {parse} from "csv-parse/sync";

dotenv.config({path: ".env.test"});
export const testData = JSON.parse(fs.readFileSync('./data/users.json', 'utf-8'));
export const csvData = parse(fs.readFileSync('./data/users.csv'), {
    columns: true,
    skip_empty_lines: true
});

export default defineConfig({
    timeout: 2 * 60 * 1000,
    testDir: 'src/tests/',
    fullyParallel: false,
    workers: 1,
    reporter: [["html", {open: "never"}]],
    expect: {
        timeout: 10_000
    },
    use: {
        baseURL: process.env.BASE_URL,
        ...devices['Desktop Chrome'],
        screenshot: "only-on-failure",
        video: "retain-on-failure",
    },
    projects: [
        {
            name: 'setup',
            testMatch: /.*global\.setup\.ts/,
        },

        {
            name: 'teardown',
            testMatch: /.*global\.teardown\.ts/,
        },

        {
            name: 'e2e',
            use: {
                headless: false,
                storageState: 'storageState.json'
            },
            dependencies: ['setup'],
            teardown: 'teardown',
        },

        {
            name: 'api_tests',
            use: {
                baseURL: process.env.API_URL,
            },
        }
    ]
})