import fs from 'node:fs'
import { remote } from 'webdriverio'

const browser = await remote({
    capabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: process.env.CI ? ['headless', 'disable-gpu', 'window-size=1200,800'] : []
        }
    }
})

await browser.url('https://webdriver.io')
const apiLink = await browser.$('=API')
await apiLink.click()

await browser.saveScreenshot('./screenshot.png')
await browser.deleteSession()

// fails if file was not created
fs.existsSync('./screenshot.png')