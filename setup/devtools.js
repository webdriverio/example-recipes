import assert from 'node:assert'
import DevTools from 'devtools'

const client = await DevTools.newSession({
    capabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: process.env.CI ? ['headless', 'disable-gpu'] : []
        }
    }
})

await client.navigateTo('https://www.google.com/ncr')

const approveCookieBtns = await client.findElements('css selector', 'button div[role="none"]')
if (approveCookieBtns.length) {
    await client.elementClick(approveCookieBtns[approveCookieBtns.length - 1]['element-6066-11e4-a52e-4f735466cecf'])
}

const searchInput = await client.findElement('css selector', 'textarea')
await client.elementSendKeys(searchInput['element-6066-11e4-a52e-4f735466cecf'], 'DevTools')
const submitBtns = await client.findElements('css selector', 'input[value="Google Search"]')
await client.elementClick(submitBtns[1]['element-6066-11e4-a52e-4f735466cecf'])

// pause
await new Promise((resolve) => setTimeout(resolve, 1000))

const title = await client.getTitle()
console.log(title) // outputs "DevTools - Google Search"
const url = await client.getUrl()
console.log(url) // sometimes this goes to /sorry/ page as Google thinks you are a bot

await client.deleteSession()

assert.ok(title.includes('Google Search') || url.includes('sorry'))
