describe('Custom Strategy Example', () => {
    before(() => {
        browser.addLocatorStrategy('myCustomStrategy', (selector, root) => {
            /**
             * scope should be document if called on browser object
             * and `root` if called on an element object
             */
            const scope = root ? root : document
            return scope.querySelector(selector)
        })
    })

    it('should fetch the right elements', async () => {
        await browser.url('/example.html')

        const elem = await browser.custom$('myCustomStrategy', '.foobar')
        console.log(await elem.getAttribute('id')) // returns "first"
        const nestedElem = await elem.custom$('myCustomStrategy', '.foobar')
        console.log(await nestedElem.getAttribute('id')) // returns "second"

        expect(await elem.getAttribute('id')).toBe('first')
        expect(await nestedElem.getAttribute('id')).toBe('second')
    })
})