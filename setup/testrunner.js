import { browser, $ } from '@wdio/globals'

describe('DuckDuckGo search', () => {
    it('Searches for WebdriverIO', async () => {
        await browser.url('https://the-internet.herokuapp.com/login')

        await browser.$('aria/Username').setValue('tomsmith')
        await browser.$('aria/Password').setValue('SuperSecretPassword!')
        await browser.$('button[type="submit"]').click()

        await browser.pause(300)

        const url = await browser.getUrl()
        expect(url).toBe('https://the-internet.herokuapp.com/secure')
        // or just
        await expect(browser).toHaveUrl('https://the-internet.herokuapp.com/secure')
    })
})
