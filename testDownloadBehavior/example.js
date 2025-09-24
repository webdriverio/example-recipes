import fs from "fs";
import deleteDownloadedFileIfExists, {filePath} from "./helper.js";

describe("File Download Test", () => {
    before(() => {
        deleteDownloadedFileIfExists();
    });

    it("should download file and validate", async () => {
        await browser.url("https://github.com/webdriverio/webdriverio/blob/main/package.json");
        const downloadButton = await $("[data-testid=\"download-raw-button\"]");
        await downloadButton.scrollIntoView();
        await downloadButton.click();

        await driver.waitUntil(async () => {
            return fs.existsSync(filePath);
        }, {timeout: 3000, timeoutMsg: "file not downloaded yet."});

        const fileExists = fs.existsSync(filePath);
        await expect(fileExists).toBeTruthy();

        const fileContents = fs.readFileSync(filePath, { encoding: "utf-8" });
        await expect(fileContents).toContain("webdriverio-monorepo");
    });

    after(() => {
        deleteDownloadedFileIfExists();
    });
});
