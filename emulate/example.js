import { browser, expect } from '@wdio/globals'

describe('emulate', () => {
    describe('color scheme', () => {
        it('should open WebdriverIO using light color scheme', async () => {
            await browser.emulate('colorScheme', 'light')
            await browser.url('https://webdriver.io')
            const backgroundColor = await browser.$('nav').getCSSProperty('background-color')
            console.log(backgroundColor.parsed.hex) // outputs: "#efefef"
        })
        
        it('should open WebdriverIO using dark color scheme', async () => {
            await browser.emulate('colorScheme', 'dark')
            await browser.url('https://webdriver.io')
            const backgroundColor = await browser.$('nav').getCSSProperty('background-color')
            console.log(backgroundColor.parsed.hex) // outputs: "#000000"
        })
    })

    describe('geolocation', () => {
        it('should find my emulated geo location', async () => {
            await browser.emulate('geolocation', {
                latitude: 52.52,
                longitude: 13.39,
                accuracy: 100
            })
            await browser.url('https://www.google.com/maps')

            const btnMyLocation = await browser.$('#mylocation')
            await btnMyLocation.waitForClickable()
            await btnMyLocation.click()
            await expect(browser).toHaveUrl(
                expect.stringContaining('@52.52,13.39,16z?')
            )
        })
    })
})
