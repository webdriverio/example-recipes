describe('waitForDisplayed Example', () => {
    beforeEach(async () => {
        await browser.url('/index.html')
    })

    it('should detect when element is visible', async () => {
        const elem = await $('#elem')
        await elem.waitForDisplayed({ timeout: 3000 })
    })

    it('should detect when element is no longer visible', async () => {
        const elem = await $('#elem')
        await elem.waitForDisplayed({ reverse: true })
    })
})