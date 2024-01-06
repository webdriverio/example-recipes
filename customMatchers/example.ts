import { $ } from '@wdio/globals'

expect.extend({
    async toHaveLanguage(browser: WebdriverIO.Browser, expectedLanguage: string) {
        const language = await browser.execute(() => navigator.language)
        if (language === expectedLanguage) {
            return {
                message: () => `expected browser not to have language "${expectedLanguage}"`,
                pass: true,
            }
        }

        return {
            message: () => `expected browser to have language "${expectedLanguage}" not "${language}"`,
            pass: false,
        }
    }
})

import { browser, expect } from '@wdio/globals'

expect.extend({
    async toHaveAriaLabel(element: WebdriverIO.Element, expectedAriaLabel) {
        const $el = await element
        const ariaLabel = await browser.execute((el) => el.ariaLabel, $el as unknown as HTMLElement)
        if (ariaLabel === expectedAriaLabel) {
            return {
                message: () => `expected element with selector "${$el.selector}" not to have an aria label "${expectedAriaLabel}"`,
                pass: true,
            }
        }

        return {
            message: () => `expected element with selector "${$el.selector}" to have an aria label "${expectedAriaLabel}" not "${ariaLabel}"`,
            pass: false,
        }
    }
})

declare global {
    namespace ExpectWebdriverIO {
        interface Matchers<R, T> {
            toHaveLanguage(language: string): R;
            toHaveAriaLabel(ariaLabel: string): R;
        }
    }
}

describe('custom matchers', () => {
    it('WebdriverIO.Browser', async () => {
        await expect(browser).toHaveLanguage('en-US')
    })

    it('WebdriverIO.Element', async () => {
        await browser.url('https://webdriver.io')
        await expect($('div[role="region"]')).toHaveAriaLabel('Skip to main content')
    })
})