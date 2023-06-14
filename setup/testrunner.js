import { browser, $ } from '@wdio/globals'

describe('DuckDuckGo search', () => {
    it('Searches for WebdriverIO', async () => {
        await browser.url('https://duckduckgo.com/')

        const inputElem = await browser.$('aria/Search with DuckDuckGo')
        await inputElem.setValue('WebdriverIO')

        const submitBtn = await browser.$('aria/Search')
        await submitBtn.click()

        const title = await browser.getTitle()
        expect(title).toBe('WebdriverIO at DuckDuckGo')
        // or just
        await expect(browser).toHaveTitle('WebdriverIO at DuckDuckGo')
    })
})