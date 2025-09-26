import { browser, expect } from '@wdio/globals'

describe('Clipboard: Firefox', () => {
    before(() => browser.url('/example.html'))

    it('should allow the browser to read the clipboard', async () => {
        const btn = await $('#copyBtn')
        await btn.click()

        // now you can read the clipboard via, e.g.
        const clipboardText = await browser.execute(() => navigator.clipboard.readText())

        await expect(clipboardText).toBe('Hello from WebdriverIO clipboard test!')
    })

})
