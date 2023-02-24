import { Key } from 'webdriverio'
describe('waitForDisplayed Example', () => {
    beforeEach(async () => {
        await browser.url('/example.html')
    })

    it('should get text a menu link', async () => {
        const menu$ = await $('#menu') // or `browser.$('#menu')`
        console.log(await menu$.$$('li')[2].$('a').getText()) // outputs: "API"
    })
    
    it('should get text a menu link - JS Function', async () => {
        /**
         * fetch element by injected JavaScript function
         */
        const menu$ = await $(function() { // Arrow function is not allowed here.
            // this is Window https://developer.mozilla.org/en-US/docs/Web/API/Window
            // TypeScript users may do something like this
            // return (this as Window).document.querySelector('#menu')
            return this.document.querySelector('#menu') // Element
        })
        console.log(await menu$.$$('li')[2].$('a').getText()) // outputs: "API"
    })
    
    it('should allow to convert protocol result of an element into a WebdriverIO element', async () => {
        /**
         * verify body as active tab element
         */
        const activeElementBefore = await browser.getActiveElement()
        expect(await $(activeElementBefore).getTagName()).toBe('body')

        /**
         * press tab to make link active element
         */
        await browser.keys([Key.Tab])

        /**
         * transform active element (reference) into WebdriverIO element
         */
        const activeElement = await browser.getActiveElement()
        console.log(await $(activeElement).getTagName()) // outputs active element

        expect(await $(activeElement).getTagName()).toBe('a')
    })
})