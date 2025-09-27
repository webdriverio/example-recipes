import path from 'node:path'
import url from 'node:url'
import { defineConfig } from '@wdio/config'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const extensionPath = path.resolve(__dirname, `web-extension.xpi`)

export const config = defineConfig({
    // ...
    before: async (capabilities) => {
        const browserName = (capabilities as WebdriverIO.Capabilities).browserName
        if (browserName === 'firefox') {
            const extension = await fs.readFile(extensionPath)
            await browser.installAddOn(extension.toString('base64'), true)
        }
    }
}