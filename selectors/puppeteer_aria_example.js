describe('Puppeteer ARIA example', () => {

  describe('On a small page', () => {
      before(async () => {
        await browser.url('/aria.html')
      });

      it('axy query', async () => {
        const el = await browser.$('aria/Some Heading!');
        await el.getHTML();
      });

  });

  describe('On a large page', () => {
      before(() => browser.url('/stackoverflow.html'))

      it('axy query', async () => {
        console.time('new puppeteerBrowser aria query')
        const el = await browser.$('aria/Questions');
        console.timeEnd('new puppeteerBrowser aria query')
        await el.getHTML();
      });
  });

})
