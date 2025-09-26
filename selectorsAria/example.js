import { browser, expect } from '@wdio/globals'

describe('ARIA example on a larger page', () => {
    before(() => browser.url('/stackoverflow.html'))

    it('aria query for span=questions', async () => {
        const el = await browser.$('aria/Questions')
        const html = await el.getHTML()
        expect(html).toBe('<span class="-link--channel-name pl8">Questions</span>')
    })

    it('aria query for button=Accept all cookies', async () => {
        const el = await browser.$('aria/Accept all cookies')
        const html = await el.getHTML()
        expect(html).toBe('<button id="onetrust-accept-btn-handler">Accept all cookies</button>')
    })
})
