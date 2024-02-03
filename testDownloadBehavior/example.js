import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { browser, expect } from "@wdio/globals";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe("File Download Test", () => {
  it("go to fastest fish", async () => {
    await browser.url("https://fastest.fish/test-files");
    await browser.pause(1000);
  });

  it("should download file and validate", async () => {
    const expectedFileName = "1KiB.bin";

    // Ensure that the directory specified here
    // matches the directory you've set in capabilities.
    const downloadDirectory = __dirname;

    const byteCount = await $("#byteCount");
    await byteCount.scrollIntoView();
    await byteCount.setValue("1");

    const downloadButton = await $("div.form-row button");
    await downloadButton.click();

    await browser.pause(2000);

    const downloadedFilePath = path.join(downloadDirectory, expectedFileName);
    const fileExists = fs.existsSync(downloadedFilePath);
    await expect(fileExists).toBeTruthy();
  });
});
