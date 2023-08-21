import { browser, $ } from '@wdio/globals'

describe('DuckDuckGo search', () => {
    it('Searches for WebdriverIO', async () => {
        await browser.url('https://duckduckgo.com/')

        await browser.$('aria/Search with DuckDuckGo').setValue('WebdriverIO')
        await browser.$('aria/Search').click()

        const title = await browser.getTitle()
        expect(title).toBe('WebdriverIO at DuckDuckGo')
        // or just
        await expect(browser).toHaveTitle('WebdriverIO at DuckDuckGo')
    })
})