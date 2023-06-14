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

await browser.$('#search_form_input_homepage').setValue('WebdriverIO')
await browser.$('#search_button_homepage').click()

const title = await browser.getTitle()
console.log(title) // outputs: "WebdriverIO at DuckDuckGo"

await browser.deleteSession()
assert.equal(title, 'WebdriverIO at DuckDuckGo')