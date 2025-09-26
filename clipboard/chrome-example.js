import { browser, expect } from '@wdio/globals'

describe('Clipboard: Chrome', () => {
    before(() => browser.url('/example.html'))

    it('should allow the browser to read the clipboard', async () => {
        // set clipboard permissions
        await browser.setPermissions({ name: 'clipboard-read' }, 'granted')

        const btn = await $('#copyBtn')
        await btn.click()

        // now you can read the clipboard via, e.g.
        const clipboardText = await browser.execute(() => navigator.clipboard.readText())

        await expect(clipboardText).toBe('Hello from WebdriverIO clipboard test!')
    })

})
