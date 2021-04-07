const { remote } = require('webdriverio')

let browser
;(async () => {
    browser = await remote({
        capabilities: {
            browserName: 'chrome'
        }
    })

    const pptr = await browser.getPuppeteer()
    const page = (await pptr.pages())[0]
    console.log((await pptr.pages()).length);
    await page.emulateTimezone('Atlantic/Bermuda')

    await browser.url('https://whatismytimezone.com')
    const timezoneContainer = (await browser.$$('article'))[0]
    console.log(await timezoneContainer.getText())

    return browser.deleteSession()
})().catch((e) => {
    console.error(e)
    return browser.deleteSession()
})