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

await client.navigateTo('https://the-internet.herokuapp.com/')

const addRemoveElementsBtn = await client.findElements('css selector', 'a[href="/add_remove_elements/"]')
if (addRemoveElementsBtn.length) {
    await client.elementClick(addRemoveElementsBtn[addRemoveElementsBtn.length - 1]['element-6066-11e4-a52e-4f735466cecf'])
}

const addElementBtn = await client.findElement('css selector', '.example button')
await client.elementClick(addElementBtn['element-6066-11e4-a52e-4f735466cecf'])

await client.navigateTo('https://the-internet.herokuapp.com/login')
const usernameInput = await client.findElement('css selector', '#username')
await client.elementSendKeys(usernameInput['element-6066-11e4-a52e-4f735466cecf'], 'tomsmith')
const passwordInput = await client.findElement('css selector', '#password')
await client.elementSendKeys(passwordInput['element-6066-11e4-a52e-4f735466cecf'], 'SuperSecretPassword!')
const loginBtn = await client.findElement('css selector', 'button[type="submit"]')
await client.elementClick(loginBtn['element-6066-11e4-a52e-4f735466cecf'])

// pause
await new Promise((resolve) => setTimeout(resolve, 300))

const url = await client.getUrl()
console.log(url)
assert.ok(url.includes('secure'))

const youAreLoggedInBanner = await client.findElement('css selector', '#flash')
const bannerText = await client.getElementText(youAreLoggedInBanner['element-6066-11e4-a52e-4f735466cecf'])
console.log(bannerText) // outputs "You logged into a secure area!"

assert.ok(bannerText.includes('You logged into a secure area!'))

await client.deleteSession()

