import { browser, expect } from '@wdio/globals'

describe('selectors', () => {
    it('css selector', async () => {
        await browser.url('https://webdriver.io/docs/gettingstarted')

        const elem = await $('nav a.navbar__brand')
        await elem.click()

        await expect(browser).toHaveUrl('https://webdriver.io/')
    })

    it('link text', async () => {
        await browser.url('/example.html')

        const link = await $('=WebdriverIO')
        await expect(link).toHaveText('WebdriverIO')
        await expect(link).toHaveAttribute('href', 'https://webdriver.io')
    })

    it('partial link text', async () => {
        await browser.url('/example.html')

        const link = await $('*=driver')
        await expect(link).toHaveText('WebdriverIO')
        await expect(link).toHaveAttribute('href', 'https://webdriver.io')

        const elem = await $('header').$('*=driver')
        await expect(elem).toBePresent()
    })

    it('element text', async () => {
        await browser.url('/example.html')

        let header = await $('h1=Welcome to my Page')
        await expect(header).toHaveText('Welcome to my Page')
        header = await $('h1.=WeLcOme tO My PAge')
        await expect(header).toHaveText('Welcome to my Page')
    })

    it('partial element text', async () => {
        await browser.url('/example.html')

        let header = await $('h1*=Welcome')
        await expect(header).toHaveText('Welcome to my Page')
        header = await $('h1.*=WeLcoMe')
        await expect(header).toHaveText('Welcome to my Page')

        let classNameAndText = await $('.someElem=WebdriverIO is the best')
        await expect(classNameAndText).toHaveText('WebdriverIO is the best')
        classNameAndText = await $('.someElem.=WeBdRivErIO iS tHe Best')
        await expect(classNameAndText).toHaveText('WebdriverIO is the best')

        let idAndText = await $('#elem=WebdriverIO is the best')
        await expect(idAndText).toHaveText('WebdriverIO is the best')
        idAndText = await $('#elem.=WEBdrIVerIO Is tHe bESt')
        await expect(idAndText).toHaveText('WebdriverIO is the best')

        let classNameAndPartialText = await $('.someElem*=WebdriverIO')
        await expect(classNameAndPartialText).toHaveText('WebdriverIO is the best')
        classNameAndPartialText = await $('.someElem.*=WeBDRivErIO')
        await expect(classNameAndPartialText).toHaveText('WebdriverIO is the best')

        let idAndPartialText = await $('#elem*=WebdriverIO')
        await expect(idAndPartialText).toHaveText('WebdriverIO is the best')
        idAndPartialText = await $('#elem.*=WebdRivErIO')
        await expect(idAndPartialText).toHaveText('WebdriverIO is the best')
    })

    it('name attribute', async () => {
        await browser.url('/example.html')

        const elem = await $('[name="username"]')
        await expect(elem).toHaveValue('foobar')
    })

    it('xpath', async () => {
        await browser.url('/xpath.html')

        const paragraph = await $('//body/p[2]')
        await expect(paragraph).toHaveText('barfoo')

        const parent = await paragraph.parentElement();
        expect(await parent.getTagName()).toBe('body')
    })

    describe('aria', () => {
        it('aria-label', async () => {
            await browser.url('/aria.html')

            const elem = await $('aria/foobar')
            await expect(elem).toHaveText('Hello World!')
        })

        it('aria-labelledby', async () => {
            await browser.url('/aria.html')

            const elem = await $('aria/Some Button')
            await expect(elem).toHaveText('Click Me!')
        })

        it('by content', async () => {
            await browser.url('/aria.html')

            const elem = await $('aria/Some Heading!')
            await expect(elem).toHaveText('Some Heading!')
        })

        it('by title', async () => {
            await browser.url('/aria.html')

            const elem = await $('aria/foobar')
            await expect(elem).toHaveText('Hello World!')
        })

        it('by alt property', async () => {
            await browser.url('/aria.html')

            const elem = await $('aria/Some Picture')
            await expect(elem).toHaveAttribute('src', '/some/image.png')
        })

        /**
         * fails due to https://github.com/webdriverio/webdriverio/issues/8826
         */
        it.skip('by for property', async () => {
            await browser.url('/aria.html')

            const elem = await $('aria/Search')
            await expect(elem).toHaveValue('Hello World!')
        })

        it('by role attribute', async () => {
            await browser.url('/aria.html')

            const button = await $('[role=button]')
            await button.click()
        })
    })

    it('js function', async () => {
        await browser.url('/js.html')

        const elem = await $('#elem') // or $(() => document.getElementById('elem'))
        await expect(
            // (first sibling is #text with value ("↵"))
            elem.$(function () { return this.nextSibling.nextSibling })
        ).toHaveText('barfoo')
    })

    it('deep selector', async () => {
        await browser.url('https://the-internet.herokuapp.com/shadowdom')
        await $('h1').waitForDisplayed()
        await expect($('ul[slot="my-text"] li:last-child')).toHaveText('In a list!')
    })
})
