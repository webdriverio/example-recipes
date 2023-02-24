import { Key } from 'webdriverio'
describe('waitForDisplayed Example', () => {
    it('should get text a menu link', async () => {
        await browser.url('/example.html')

        const text = await $$('#menu')[0]
        console.log(await text.$$('li')[2].$('a').getText()) // outputs: "API"

        await expect(text.$$('li')[2].$('a')).toHaveText('API')
    })
    
    it('should get text a menu link - JS Function', async () => {
        await browser.url('/example.html')

        /**
         * fetch element by injected JavaScript function
         */
        const text = await $$(function() { // Arrow function is not allowed here.
            // this is Window https://developer.mozilla.org/en-US/docs/Web/API/Window
            // TypeScript users may do something like this
            // return (this as Window).document.querySelectorAll('#menu')
            return this.document.querySelectorAll('#menu') // Element[]
        })[0]
        console.log(await text.$$('li')[2].$('a').getText()) // outputs: "API"

        await expect(text.$$('li')[2].$('a')).toHaveText('API')
    })
    
    it('can create element array out of single elements', async () => {
        await browser.url('http://guinea-pig.webdriver.io/')

        /**
         * transform single WebdriverIO elements into element array
         */
        const red = await $('.red')
        const green = await $('.green')
        const elems = $$([red, green])
        console.log(await elems.map((e) => e.getAttribute('class')))
        // returns "[ 'box red ui-droppable', 'box green' ]"

        expect(await elems.map((e) => e.getAttribute('class')))
            .toEqual(['box red ui-droppable', 'box green'])
    })
})