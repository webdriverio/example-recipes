import { browser, expect } from '@wdio/globals'

describe('WebDriver API', () => {
    it('status', async () => {
        console.log(await browser.status())
        /**
         * returns e.g.:
         * {
         *   build: {
         *     version: '110.0.5481.77 (65ed616c6e8ee3fe0ad64fe83796c020644d42af-refs/branch-heads/5481@{#839})'
         *   },
         *   message: 'ChromeDriver ready for new sessions.',
         *   os: { arch: 'arm64', name: 'Mac OS X', version: '12.1.0' },
         *   ready: true
         * }
         */
    })

    it('getTimeouts', async () => {
        console.log(await browser.getTimeouts())
        /**
         * returns, e.g.:
         * { implicit: 0, pageLoad: 300000, script: 30000 }
         */
    })

    it('setTimeouts', async () => {
        await browser.setTimeouts(123, 456, 789)
        console.log(await browser.getTimeouts())
        /**
         * returns, e.g.:
         * { implicit: 123, pageLoad: 456, script: 789 }
         */

        await browser.setTimeouts(0, 300000, 30000)
    })

    it('getUrl', async () => {
        await browser.url('https://webdriver.io')
        console.log(await browser.getUrl())
        /**
         * returns: "https://webdriver.io/"
         */
    })

    it('getUrl', async () => {
        await browser.navigateTo('https://webdriver.io')
        console.log(await browser.getUrl())
        /**
         * returns: "https://webdriver.io/"
         */
    })

    it('back', async () => {
        await browser.navigateTo('https://webdriver.io')
        await $('=API Reference').click()
        await expect(browser).toHaveUrl('https://webdriver.io/docs/api')
        await browser.back()
        await expect(browser).toHaveUrl('https://webdriver.io/')
    })

    it('forward', async () => {
        await browser.navigateTo('https://webdriver.io')
        await $('=API Reference').click()
        await expect(browser).toHaveUrl('https://webdriver.io/docs/api')
        await browser.back()
        await expect(browser).toHaveUrl('https://webdriver.io/')
        await browser.forward()
        await expect(browser).toHaveUrl('https://webdriver.io/docs/api')
    })

    it('refresh', async () => {
        await browser.navigateTo('https://webdriver.io')
        await browser.execute(() => { window.foobar = '123' })
        expect(await browser.execute(() => window.foobar )).toBe('123')
        await browser.refresh()
        await browser.pause(200) // wait for page refresh to happen
        expect(await browser.execute(() => window.foobar )).toBe(null)
    })

    it('getTitle', async () => {
        await browser.navigateTo('https://webdriver.io')
        console.log(await browser.getTitle())
        /**
         * returns: "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO"
         */
    })

    it('getWindowHandle', async () => {
        console.log(await browser.getWindowHandle())
        /**
         * returns e.g.: "CDwindow-2D68A4601C2DDE4F756AC374BB588712"
         */
    })

    it('closeWindow', async () => {
        await browser.navigateTo('https://webdriver.io')
        await browser.newWindow('http://json.org')
        await $('body').waitForExist()
        console.log((await browser.getWindowHandles()).length) // returns `2`
        await browser.closeWindow()
        
        const handles = await browser.getWindowHandles()
        console.log(handles.length) // returns `1`
        
        const err = await browser.getTitle()
            .catch((err) => err)
        console.log(err.message) // returns "no such window: target window already closed"

        /**
         * make sure to switch to previous window before continuing
         */
        await browser.switchToWindow(handles[0])
        console.log(await browser.getTitle())
        /**
         * returns: "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO"
         */
    })

    it('switchToWindow', async () => {
        await browser.navigateTo('https://webdriver.io')
        await browser.newWindow('http://json.org')
        console.log(await browser.getTitle()) // returns "JSON"
        
        const handles = await browser.getWindowHandles()
        await browser.switchToWindow(handles[0])
        console.log(await browser.getTitle())
        /**
         * returns: "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO"
         */
    })

    it('createWindow', async () => {
        await browser.createWindow('tab')
        console.log((await browser.getWindowHandles()).length) // returns `2`
        console.log(await browser.getUrl()) // returns "data:,"
    })

    it('getWindowHandles', async () => {
        console.log(await browser.getWindowHandles())
        /**
         * returns e.g.: `["CDwindow-2D68A4601C2DDE4F756AC374BB588712"]`
         */
    })

    /**
     * only works in headless mode for Chrome, see https://bugs.chromium.org/p/chromium/issues/detail?id=753118
     */
    it.skip('printPage', async () => {
        const printedPage = await browser.printPage()
        console.log(printedPage) // returns "aW1wb3J0IHsgYnJvd3NlciwgZXhw...."
    })

    it('switchToFrame', async () => {
        await browser.navigateTo('https://the-internet.herokuapp.com/iframe')
        const getDocumentText = () => browser.executeScript(
            'return document.documentElement.outerText',
            []
        )

        expect(await getDocumentText())
            .toContain('An iFrame containing the TinyMCE WYSIWYG Editor')
        const iframe = await browser.findElement('css selector', 'iframe')
        await browser.switchToFrame(iframe)

        await browser.pause(1000)
        expect(await getDocumentText())
            .toContain('Your content goes here.')
    })

    it('switchToParentFrame', async () => {
        await browser.navigateTo('https://the-internet.herokuapp.com/iframe')
        const getDocumentText = () => browser.executeScript(
            'return document.documentElement.outerText',
            []
        )

        expect(await getDocumentText())
            .toContain('An iFrame containing the TinyMCE WYSIWYG Editor')
        const iframe = await browser.findElement('css selector', 'iframe')
        await browser.switchToFrame(iframe)

        await browser.pause(1000)
        expect(await getDocumentText())
            .toContain('Your content goes here.')
        
        await browser.switchToParentFrame()
        expect(await getDocumentText())
            .toContain('An iFrame containing the TinyMCE WYSIWYG Editor')
    })

    it('getWindowRect', async () => {
        console.log(await browser.getWindowRect())
        /**
         * returns `{ height: 2091, width: 1200, x: 22, y: 47 }`
         */
    })

    it('setWindowRect', async () => {
        await browser.setWindowRect(100, 200, 500, 600)
        console.log(await browser.getWindowRect())
        /**
         * returns `{ height: 600, width: 500, x: 100, y: 200 }`
         */
    })

    it('maximizeWindow', async () => {
        await browser.maximizeWindow()
        console.log(await browser.getWindowRect())
        /**
         * returns e.g. `{ height: 2135, width: 5120, x: 0, y: 25 }`
         */
    })

    it('minimizeWindow', async () => {
        await browser.minimizeWindow()
    })

    it('fullscreenWindow', async () => {
        await browser.fullscreenWindow()

        await browser.maximizeWindow()
    })

    it('findElement', async () => {
        await browser.navigateTo('https://webdriver.io')
        const elementRef = await browser.findElement('css selector', '.hero__subtitle')
        console.log(elementRef) // returns e.g. `{ 'element-6066-11e4-a52e-4f735466cecf': '5931d77a-5668-4882-9ff7-ecd7fbea0857' }`

        // transform into WebdriverIO element object
        const element = await $(elementRef)
        await expect(element).toHaveText('Next-gen browser and mobile automation test framework for Node.js')
    })

    it('findElementFromShadowRoot', async () => {
        await browser.navigateTo('https://polymer-library.polymer-project.org/3.0/api/elements/array-selector')

        await browser.pause(1000)
        const element = await browser.findElement('tag name', 'pw-footer')
        const shadowRoot = await browser.getElementShadowRoot(
            element['element-6066-11e4-a52e-4f735466cecf'])
        const elementRef = await browser.findElementFromShadowRoot(
            shadowRoot['shadow-6066-11e4-a52e-4f735466cecf'],
            'css selector',
            '.copyright'
        )
        expect(await browser.getElementText(elementRef['element-6066-11e4-a52e-4f735466cecf']))
            .toContain('Brought to you by The Polymer Project')
    })

    it('findElements', async () => {
        await browser.navigateTo('https://webdriver.io')
        const elementRefs = await browser.findElements('css selector', 'img')
        console.log(elementRefs.length) // returns e.g. `32`
    })

    it('findElementsFromShadowRoot', async () => {
        await browser.navigateTo('https://polymer-library.polymer-project.org/3.0/api/elements/array-selector')

        const element = await browser.findElement('tag name', 'pw-footer')
        const shadowRoot = await browser.getElementShadowRoot(
            element['element-6066-11e4-a52e-4f735466cecf'])
        const elementRefs = await browser.findElementsFromShadowRoot(
            shadowRoot['shadow-6066-11e4-a52e-4f735466cecf'],
            'css selector',
            'div'
        )
        console.log(elementRefs.length) // returns e.g. `3`
    })

    it('findElementFromElement', async () => {
        await browser.navigateTo('http://guinea-pig.webdriver.io')
        const nested = await browser.findElement('css selector', '.nested')
        const header = await browser.findElementFromElement(
            nested['element-6066-11e4-a52e-4f735466cecf'],
            'css selector',
            '.findme'
        )
        await expect($(header)).toHaveText('NESTED ELEMENTS')
    })

    it('findElementsFromElement', async () => {
        await browser.navigateTo('http://guinea-pig.webdriver.io')
        const nested = await browser.findElement('css selector', '.nested')
        const spans = await browser.findElementsFromElement(
            nested['element-6066-11e4-a52e-4f735466cecf'],
            'css selector',
            'span'
        )
        console.log(spans.length) // returns `2`
    })

    it('getElementShadowRoot', async () => {
        await browser.navigateTo('https://polymer-library.polymer-project.org/3.0/api/elements/array-selector')

        const element = await browser.findElement('tag name', 'pw-footer')
        const shadowRoot = await browser.getElementShadowRoot(
            element['element-6066-11e4-a52e-4f735466cecf'])
        const elementRef = await browser.findElementFromShadowRoot(
            shadowRoot['shadow-6066-11e4-a52e-4f735466cecf'],
            'css selector',
            '.copyright'
        )
        expect(await browser.getElementText(elementRef['element-6066-11e4-a52e-4f735466cecf']))
            .toContain('Brought to you by The Polymer Project')
    })

    it('getActiveElement', async () => {
        await browser.navigateTo('http://guinea-pig.webdriver.io')

        const activeElementReference = await browser.getActiveElement()
        console.log(await $(activeElementReference).getTagName()) // returns "body"

        await $('textarea').click()
        const newActiveElementReference = await browser.getActiveElement()
        console.log(await $(newActiveElementReference).getTagName()) // returns "textarea"
    })

    it('isElementSelected', async () => {
        await browser.navigateTo('http://guinea-pig.webdriver.io')

        const selectedCheckbox = await browser.findElement('css selector', '.checkbox_selected')
        expect(await browser.isElementSelected(selectedCheckbox['element-6066-11e4-a52e-4f735466cecf'])).toBe(true)
        const notSelectedCheckbox = await browser.findElement('css selector', '.checkbox_notselected')
        expect(await browser.isElementSelected(notSelectedCheckbox['element-6066-11e4-a52e-4f735466cecf'])).toBe(false)
    })

    it('isElementDisplayed', async () => {
        await browser.navigateTo('http://guinea-pig.webdriver.io')

        const selectedCheckbox = await browser.findElement('css selector', 'body')
        console.log(await browser.isElementDisplayed(selectedCheckbox['element-6066-11e4-a52e-4f735466cecf']))
        // returns `true`
    })

    it('getElementAttribute', async () => {
        await browser.navigateTo('http://guinea-pig.webdriver.io')

        const link = await browser.findElement('css selector', '#secondPageLink')
        console.log(await browser.getElementAttribute(link['element-6066-11e4-a52e-4f735466cecf'], 'href'))
        // returns "./two.html"
    })

    it('getElementProperty', async () => {
        await browser.navigateTo('http://guinea-pig.webdriver.io')

        const link = await browser.findElement('css selector', '#secondPageLink')
        console.log(await browser.getElementProperty(link['element-6066-11e4-a52e-4f735466cecf'], 'tagName'))
        // returns "A"
    })

    it('getElementCSSValue', async () => {
        await browser.navigateTo('http://guinea-pig.webdriver.io')

        const link = await browser.findElement('css selector', '#secondPageLink')
        console.log(await browser.getElementCSSValue(link['element-6066-11e4-a52e-4f735466cecf'], 'color'))
        // returns "rgba(0, 136, 204, 1)"
    })

    it('getElementText', async () => {
        await browser.navigateTo('http://guinea-pig.webdriver.io')

        const link = await browser.findElement('css selector', '#secondPageLink')
        console.log(await browser.getElementText(link['element-6066-11e4-a52e-4f735466cecf']))
        // returns "two"
    })

    it('getElementTagName', async () => {
        await browser.navigateTo('http://guinea-pig.webdriver.io')

        const link = await browser.findElement('css selector', '#secondPageLink')
        console.log(await browser.getElementTagName(link['element-6066-11e4-a52e-4f735466cecf']))
        // returns "a"
    })

    it('getElementRect', async () => {
        await browser.navigateTo('http://guinea-pig.webdriver.io')

        const link = await browser.findElement('css selector', '#secondPageLink')
        console.log(await browser.getElementRect(link['element-6066-11e4-a52e-4f735466cecf']))
        // returns `{ height: 16, width: 23, x: 15, y: 142 }`
    })

    it('isElementEnabled', async () => {
        await browser.navigateTo('http://guinea-pig.webdriver.io')

        const disabledInput = await browser.findElement('css selector', 'input[value="d"]')
        console.log(await browser.isElementEnabled(disabledInput['element-6066-11e4-a52e-4f735466cecf'])) // returns `false`
        const enabledInput = await browser.findElement('css selector', 'input[value="a"]')
        console.log(await browser.isElementEnabled(enabledInput['element-6066-11e4-a52e-4f735466cecf'])) // returns `true`
    })

    it('elementClick', async () => {
        await browser.navigateTo('http://guinea-pig.webdriver.io')

        const link = await browser.findElement('css selector', '#secondPageLink')
        await browser.elementClick(link['element-6066-11e4-a52e-4f735466cecf'])
        console.log(await browser.getTitle()) // returns "two"
    })

    it('elementClear', async () => {
        await browser.navigateTo('http://guinea-pig.webdriver.io')

        const elem = await browser.findElement('css selector', 'form input')
        console.log(await browser.getElementProperty(elem['element-6066-11e4-a52e-4f735466cecf'], 'value')) // returns "a"
        await browser.elementClear(elem['element-6066-11e4-a52e-4f735466cecf'])
        console.log(await browser.getElementProperty(elem['element-6066-11e4-a52e-4f735466cecf'], 'value')) // returns ""
    })

    it('elementSendKeys', async () => {
        await browser.navigateTo('http://guinea-pig.webdriver.io')

        const elem = await browser.findElement('css selector', 'form input')
        console.log(await browser.getElementProperty(elem['element-6066-11e4-a52e-4f735466cecf'], 'value')) // returns "a"
        await browser.elementSendKeys(elem['element-6066-11e4-a52e-4f735466cecf'], 'foobar')
        console.log(await browser.getElementProperty(elem['element-6066-11e4-a52e-4f735466cecf'], 'value')) // returns "afoobar"
    })

    it('getPageSource', async () => {
        await browser.navigateTo('https://webdriver.io')
        console.log(await browser.getPageSource()) // returns "<html lang="en" dir="ltr" class="plugin-page...</footer></div>"
    })

    it('executeScript', async () => {
        const result = await browser.executeScript('return `foo${arguments[0]}`', ['bar'])
        console.log(result) // returns "foobar"
    })

    it('executeAsyncScript', async () => {
        const result = await browser.executeAsyncScript(
            'setTimeout(() => arguments[arguments.length - 1](`foo${arguments[0]}`), 2000)',
            ['bar']
        )
        console.log(result) // returns "foobar"
    })

    it('getAllCookies', async () => {
        await browser.navigateTo('https://webdriver.io')
        console.log(await browser.getAllCookies())
        /**
         * returns e.g.:
         *  [
         *    {
         *      domain: '.webdriver.io',
         *      expiry: 1677095685,
         *      httpOnly: false,
         *      name: '_gat',
         *      path: '/',
         *      sameSite: 'Lax',
         *      secure: false,
         *      value: '1'
         *    },
         *    ...
         *  ]
         */
    })

    it('addCookie', async () => {
        await browser.navigateTo('https://webdriver.io')
        await browser.addCookie({ name: 'foo', value: 'bar' })
        console.log(await browser.getAllCookies())
        /**
         * returns e.g.:
         *  [
         *    ...
         *    {
         *      domain: 'webdriver.io',
         *      httpOnly: false,
         *      name: 'foo',
         *      path: '/',
         *      sameSite: 'Lax',
         *      secure: true,
         *      value: 'bar'
         *    },
         *    ...
         *  ]
         */
    })

    it('deleteAllCookies', async () => {
        await browser.navigateTo('https://webdriver.io')
        console.log((await browser.getAllCookies()).length) // returns e.g. `3`

        await browser.deleteAllCookies()
        console.log((await browser.getAllCookies()).length) // returns e.g. `0`
    })

    it('getNamedCookie', async () => {
        await browser.navigateTo('https://webdriver.io')
        await browser.addCookie({ name: 'foo', value: 'bar' })
        console.log(await browser.getNamedCookie('foo'))
        /**
         * returns e.g.:
         * {
         *   domain: 'webdriver.io',
         *   httpOnly: false,
         *   name: 'foo',
         *   path: '/',
         *   sameSite: 'Lax',
         *   secure: true,
         *   value: 'bar'
         * }
         */
    })

    it('deleteCookie', async () => {
        await browser.navigateTo('https://webdriver.io')
        console.log((await browser.getAllCookies()).length) // returns e.g. `3`
        await browser.addCookie({ name: 'foo', value: 'bar' })
        console.log((await browser.getAllCookies()).length) // returns e.g. `4`
        await browser.deleteCookie('foo')
        console.log((await browser.getAllCookies()).length) // returns e.g. `3`
    })

    it('dismissAlert', async () => {
        await browser.execute(() => alert('Hello Alert!'))
        await browser.dismissAlert()
    })

    it('getAlertText', async () => {
        await browser.execute(() => alert('Hello Alert!'))
        console.log(await browser.getAlertText()) // returns "Hello Alert!"

        await browser.dismissAlert()
    })
})