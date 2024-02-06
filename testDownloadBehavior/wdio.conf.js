import path from 'node:path'
import url from 'node:url'
import { config as baseConfig } from '../wdio.conf.js'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

const chromeOptions = {
    capabilities: {
        browserName: 'chrome',
        "goog:chromeOptions": {
            args: ['headless', 'disable-gpu'],
            prefs: {
                "download.default_directory": __dirname
            }
        }
    }
}

const firefoxOptions = {
    capabilities: {
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
}

const edgeOptions = {
    capabilities: {
        browserName: 'edge',
        "ms:edgeOptions": {
            args: ['--headless'],
            prefs: {
                "download.default_directory": __dirname
            }
        }
    }
}

const browserCapabilities = {
    chrome: chromeOptions.capabilities,
    firefox: firefoxOptions.capabilities,
    edge: edgeOptions.capabilities
}
const capabilities = [
    process.env.BROWSER && browserCapabilities[process.env.BROWSER]
        ? browserCapabilities[process.env.BROWSER]
        : chromeCaps
]

export const config = {
    ...baseConfig,
    capabilities
}