import assert from 'node:assert'
import { remote } from 'webdriverio'

const browser = await remote({
    capabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: process.env.CI ? ['headless', 'disable-gpu', 'window-size=1200,800'] : []
        }
    }
})

await browser.url('https://the-internet.herokuapp.com/login')

await browser.$('aria/Username').setValue('tomsmith')
await browser.$('aria/Password').setValue('SuperSecretPassword!')
await browser.$('button[type="submit"]').click()

await browser.pause(300)

const url = await browser.getUrl()
console.log(url) // outputs: "https://the-internet.herokuapp.com/secure"
assert.ok(url.includes('secure'))

const bannerText = await browser.$('#flash').getText()
console.log(bannerText) // outputs "You logged into a secure area!"

assert.ok(bannerText.includes('You logged into a secure area!'))

await browser.deleteSession()
