import { browser, expect } from '@wdio/globals'

describe('overwriteCommand', () => {
    beforeEach(async () => {
        // print milliseconds before pause and return its value.
        browser.overwriteCommand('pause', async (origPauseFunction, ms) => {
            console.log(`Sleeping for ${ms}`)
            await origPauseFunction(ms)
            return ms
        })
    })

    it('should use my overwrite command', async () => {
        await browser.url('https://webdriver.io')
        await browser.pause(1000) // outputs "Sleeping for 1000"
    })
})
