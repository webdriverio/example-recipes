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

await client.navigateTo('https://www.google.com/ncr')

const searchInput = await client.findElement('css selector', 'input')
await client.elementSendKeys(searchInput['element-6066-11e4-a52e-4f735466cecf'], 'WebDriver')
await client.elementSendKeys(searchInput['element-6066-11e4-a52e-4f735466cecf'], '\uE007')

const title = await client.getTitle()
console.log(title) // outputs "WebDriver - Google Search"

await client.deleteSession()

Chromedriver.stop()
assert.equal(title, 'WebDriver - Google Search')