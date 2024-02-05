import fs from "fs";
import deleteDownloadedFileIfExists, {filePath} from "./helper.js";

describe("File Download Test", () => {
    before(() => {
        deleteDownloadedFileIfExists();
    });

    it("go to fastest fish website", async () => {
        await browser.url("https://fastest.fish/test-files");
    });

    it("should download file and validate", async () => {
        const byteCount = await $("#byteCount");
        await byteCount.scrollIntoView();
        await byteCount.setValue("1");

        const downloadButton = await $("div.form-row button");
        await downloadButton.click();

        await driver.waitUntil(async () => {
            return fs.existsSync(filePath);
        }, {timeout: 3000, timeoutMsg: "file not downloaded yet."});

        const fileExists = fs.existsSync(filePath);
        await expect(fileExists).toBeTruthy();
    });

    after(() => {
        deleteDownloadedFileIfExists();
    });
});
