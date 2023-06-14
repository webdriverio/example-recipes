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

await browser.url('https://duckduckgo.com')

await browser.$('aria/Search with DuckDuckGo').setValue('WebdriverIO')
await browser.$('aria/Search').click()

const title = await browser.getTitle()
console.log(title) // outputs: "WebdriverIO at DuckDuckGo"

await browser.deleteSession()
assert.equal(title, 'WebdriverIO at DuckDuckGo')