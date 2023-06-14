import { browser, $ } from '@wdio/globals'

describe('DuckDuckGo search', () => {
    it('Searches for WebdriverIO', async () => {
        await browser.url('https://duckduckgo.com/')

        await browser.$('#search_form_input_homepage').setValue('WebdriverIO')
        await browser.$('#search_button_homepage').click()

        const title = await browser.getTitle()
        expect(title).toBe('WebdriverIO at DuckDuckGo')
        // or just
        await expect(browser).toHaveTitle('WebdriverIO at DuckDuckGo')
    })
})