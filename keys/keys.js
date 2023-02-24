import { Key } from 'webdriverio'

it('should copy&paste from one input to another', async () => {
    const $copyInput = await $('#copy')
    const $pasteInput = await $('#paste')

    // copies text from an input element
    await $copyInput.setValue('some text')
    await browser.keys([Key.Ctrl, 'a'])
    await browser.keys([Key.Ctrl, 'c'])

    // inserts text from clipboard into input element
    await $pasteInput.click()
    await browser.keys([Key.Ctrl, 'v'])

    await expect($pasteInput).toHaveValue('some text')
})

beforeEach(async () => {
    await browser.url('/index.html')
})