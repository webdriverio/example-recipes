import assert from 'node:assert'
import DevTools from 'devtools'

const client = await DevTools.newSession({
    capabilities: { browserName: 'chrome' }
})

await client.navigateTo('https://www.google.com/ncr')

const searchInput = await client.findElement('css selector', 'input')
await client.elementSendKeys(searchInput['element-6066-11e4-a52e-4f735466cecf'], 'DevTools')
await client.elementSendKeys(searchInput['element-6066-11e4-a52e-4f735466cecf'], '\uE007')

const title = await client.getTitle()
console.log(title) // outputs "DevTools - Google Search"

await client.deleteSession()

assert.equal(title, 'DevTools - Google Search')