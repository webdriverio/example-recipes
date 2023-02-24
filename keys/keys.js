import { Key } from 'webdriverio'

it('should copy&paste from one input to another', async () => {
    const $copyInput = await $('aria/copy')
    const $pasteInput = await $('aria/paste')

    await $copyInput.setValue('some text')
    await browser.keys([Key.Ctrl, 'a'])
    await browser.keys([Key.Ctrl, 'c'])
    await $pasteInput.click()
    await browser.keys([Key.Ctrl, 'v'])

    await expect($pasteInput).toHaveValue('some text')
})

beforeEach(async () => {
    await browser.url('/index.html')
})