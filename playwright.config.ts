import {defineConfig} from "@playwright/test";
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
    reporter: [["html"]],
    expect: {
        timeout: 7000
    },
    projects: [
        {
            name: 'setup',
            testMatch: /.*global\.setup\.ts/,
            use: {
                browserName: 'chromium',
                headless: false,
                baseURL: process.env.BASE_URL,
                screenshot: "on",
                video: "on",
            },
            teardown: 'teardown'
        },

        {
            name: 'teardown',
            testMatch: /.*global\.teardown\.ts/,
            use: {
                browserName: 'chromium',
                headless: false,
                baseURL: process.env.BASE_URL,
                screenshot: "on",
                video: "on",
            }
        },

        {
            name: 'e2e',
            use: {
                browserName: 'chromium',
                headless: false,
                baseURL: process.env.BASE_URL,
                screenshot: "on",
                video: "on",
                storageState: 'storageState.json'
            },
            dependencies: ['setup']
        },

        {
            name: 'api_tests',
            use: {
                baseURL: process.env.API_URL,
            },
        }
    ]
})