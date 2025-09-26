import { browser, expect, $ } from '@wdio/globals'

describe('Clipboard: Chrome', () => {
    before(() => browser.url('/example.html'))

    it('should allow the browser to read the clipboard', async () => {
        // set clipboard permissions
        await browser.setPermissions({ name: 'clipboard-read' }, 'granted')

        const btn = await $('#copyBtn')
        await btn.click()

        // Use a focus event to trigger the async clipboard read, then save
        // the result to a global variable on the window object
        // Without this the clipboard read may be blocked
        // with "NotAllowedError: Document is not focused."
        // See: https://stackoverflow.com/questions/56306153/domexception-on-calling-navigator-clipboard-readtext
        await browser.execute(() => {
          const _asyncCopyFn = (async () => {
            setTimeout(async () => {
              window.clipboardText = await navigator.clipboard.readText();
              document.body.removeEventListener("click", _asyncCopyFn);
            }, 200);
          });
          document.body.addEventListener("click", _asyncCopyFn);
        });

        await $('body').click();

        await browser.pause(300);

        // now you can read the clipboard text from the global variable
        const clipboardText = await browser.execute(() => window.clipboardText);
        console.log('Clipboard text:', clipboardText);

        await expect(clipboardText).toBe('Hello from WebdriverIO clipboard test!')
    })

})
