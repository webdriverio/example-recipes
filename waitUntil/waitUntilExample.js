describe('waitForDisplayed Example', () => {
    beforeEach(async () => {
        await browser.url('/index.html')
    })

    it('should wait until text has changed', async () => {
        const elem = await $('#someText')
        await elem.waitUntil(async function () {
            return (await this.getText()) === 'I am now different'
        }, {
            timeout: 5000,
            timeoutMsg: 'expected text to be different after 5s'
        })
    })
})