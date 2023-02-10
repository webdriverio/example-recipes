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

    it('should miss the button due to passed in x parameter', async () => {
        const myButton = await $('#myButton')
        await myButton.click({ x: 100 })
        await expect($('#someText')).toHaveText('I was not clicked')
    })

    it('should miss the button due to passed in y parameter', async () => {
        const myButton = await $('#myButton')
        await myButton.click({ y: 100 })
        await expect($('#someText')).toHaveText('I was not clicked')
    })

    it('should do a right click', async () => {
        const myButton = await $('#myButton')
        await myButton.click({ button: 2 })
        await expect($('#someText')).toHaveText('I was not clicked')
    })
})