import path from 'node:path'
import url from 'node:url'
import { config as baseConfig } from '../wdio.conf.js'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

const chromeCaps = {
    browserName: 'chrome',
    "goog:chromeOptions": {
        args: ['headless', 'disable-gpu'],
        prefs: {
            "download.default_directory": __dirname
        }
    }
}

const firefoxCaps = {
    browserName: 'firefox',
    "moz:debuggerAddress": true,
    "moz:firefoxOptions": {
        args: ['-headless'],
        prefs: {
            "browser.download.dir": __dirname,
            "browser.download.folderList": 2,
            "browser.download.manager.showWhenStarting": false,
            "browser.helperApps.neverAsk.saveToDisk": "*/*"
        }
    }
}

const edgeCaps = {
    browserName: 'edge',
    "ms:edgeOptions": {
        args: ['--headless'],
        prefs: {
            "download.default_directory": __dirname
        }
    }
}

const browserCapabilities = {
    chrome: chromeCaps,
    firefox: firefoxCaps,
    edge: edgeCaps
}
const capabilities = process.env.BROWSER
    ? browserCapabilities[process.env.BROWSER]
    : chromeCaps

export const config = {
    ...baseConfig,
    capabilities
}