const ARIA_SELECTOR = 'aria2/'

browser.addCommand('ariaQuery', async function (selector = '') {
    const label = selector.slice(ARIA_SELECTOR.length);
    if (typeof this.getPuppeteer === 'function') {
        const puppeteerBrowser = await this.getPuppeteer()
        const page = (await puppeteerBrowser.pages())[0]
        const h = await page.locator(`aria/${label}`).waitHandle();
        h.evaluate(el => {
            // we may need a random id here to avoid collisions?
            el.setAttribute('data-wdio-ax', 'true')
        });
        return await this.$('[data-wdio-ax="true"]');
    }

    throw new Error('Only supported in Puppeteer')
})

describe('Puppeteer ARIA example', () => {

  describe('On a small page', () => {
      before(() => browser.url('/aria.html'))

      it('axy query', async () => {
        const el = await browser.ariaQuery('aria2/Some Heading!');
        await el.getHTML();
      });

      it('out of the box', async () => {
        const el = await browser.$('aria/Some Heading!');
        await el.getHTML();
      });
  });

  describe('On a large page', () => {
      before(() => browser.url('/stackoverflow.html'))

      it('axy query', async () => {
        console.time('new puppeteerBrowser aria query')
        const el = await browser.ariaQuery('aria2/Questions');
        console.timeEnd('new puppeteerBrowser aria query')
        await el.getHTML();
      });

      it('out of the box', async () => {
        console.time('existing xpath based aria query')
        const el = await browser.$('aria/Questions');
        console.timeEnd('existing xpath based aria query')
        await el.getHTML();
      });
  });

})
