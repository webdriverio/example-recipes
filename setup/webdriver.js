import assert from 'node:assert'
import Chromedriver from 'chromedriver'
Chromedriver.start(['--port=4444'])

import WebDriver from 'webdriver'

const client = await WebDriver.newSession({
    capabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: process.env.CI ? ['headless', 'disable-gpu'] : []
        }
    }
})

await client.setTimeouts(2000, 2000, 0)
await client.navigateTo('https://www.google.com/ncr')

const approveCookieBtns = await client.findElements('css selector', 'button div[role="none"]')
if (approveCookieBtns.length) {
    await client.elementClick(approveCookieBtns[approveCookieBtns.length - 1]['element-6066-11e4-a52e-4f735466cecf'])
}

const searchInput = await client.findElement('css selector', 'textarea')
await client.elementSendKeys(searchInput['element-6066-11e4-a52e-4f735466cecf'], 'WebDriver')
const submitBtns = await client.findElements('css selector', 'input[value="Google Search"]')
await client.elementClick(submitBtns[1]['element-6066-11e4-a52e-4f735466cecf'])

const title = await client.getTitle()
console.log(title) // outputs "WebDriver - Google Search"

await client.deleteSession()

Chromedriver.stop()
assert.equal(title, 'WebDriver - Google Search')