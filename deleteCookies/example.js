import { browser, expect } from '@wdio/globals'

describe('deleteCookies', () => {
    beforeEach(async () => {
        // a website needs to be open to set/delete cookies
        await browser.url('https://json.org')
    })

    it('should delete one cookie', async () => {
        await browser.setCookies([
            {name: 'test3', value: '789'},
            {name: 'test2', value: '456'},
            {name: 'test', value: '123'}
        ])
    
        let cookies = await browser.getCookies()
        expect(cookies).toMatchObject([
            { name: 'test', value: '123' },
            { name: 'test2', value: '456' },
            { name: 'test3', value: '789' }
        ])
    
        await browser.deleteCookies(['test3'])
        cookies = await browser.getCookies()
        expect(cookies).toMatchObject([
            { name: 'test', value: '123' },
            { name: 'test2', value: '456' }
        ])
    })

    it('should delete all cookies', async () => {
        await browser.deleteCookies()
        const cookies = await browser.getCookies()
        expect(cookies).toMatchObject([])
    })
})
