import fs from 'node:fs'
import { remote } from 'webdriverio'

const browser = await remote({
    capabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: process.env.CI ? ['headless', 'disable-gpu'] : []
        }
    }
})

await browser.url('https://webdriver.io')
console.log(await browser.getPageSource())
const apiLink = await browser.$('=API')
await apiLink.click()

await browser.saveScreenshot('./screenshot.png')
await browser.deleteSession()

// fails if file was not created
fs.existsSync('./screenshot.png')