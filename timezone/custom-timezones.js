import assert from 'node:assert'
import { remote } from 'webdriverio'

const browser = await remote({
    capabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: process.env.CI ? ['headless', 'disable-gpu'] : []
        }
    }
})

const pptr = await browser.getPuppeteer()
const page = (await pptr.pages())[0]
await page.emulateTimezone('Africa/Douala')

await browser.url('https://webbrowsertools.com/timezone/')
await browser.waitUntil(async () => (
    (await browser.getTitle()) !== 'Just a moment...'),
    { timeout: 10 * 1000 }
)

assert.equal(
    await browser.$('#timeZone').getText(),
    'Africa/Douala'
)

await browser.deleteSession()