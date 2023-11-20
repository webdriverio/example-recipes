import { browser, $, expect } from '@wdio/globals'

describe('click examples', () => {
    beforeEach(async () => {
        await browser.url('/example.html')
    })

    it('should demonstrate the click command', async () => {
        const myButton = await $('#myButton')
        await myButton.click()
        await expect($('#someText')).toHaveText('I was clicked')
    })

    it('should do a right click', async () => {
        const myButton = await $('#myButton')
        await myButton.click({ button: 2 })
        await expect($('#someText')).toHaveText('I was not clicked')
    })
})