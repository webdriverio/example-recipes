import path from 'node:path'
import url from 'node:url'
import { config as baseConfig } from './wdio.conf.js'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

const chromeOptions = {
    capabilities: {
        browserName: 'chrome',
        "goog:chromeOptions": {
          args: process.env.CI ? ['headless', 'disable-gpu'] : ['disable-gpu'],
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
            args: process.env.CI ? ['-headless'] : [],
            prefs: {
                "browser.download.dir": __dirname,
                "browser.download.folderList": 2,
                "browser.download.manager.showWhenStarting": false,
                "browser.helperApps.neverAsk.saveToDisk": "*/*"
            }
        }
    }
}

const firefoxNightlyOptions = {
    capabilities: {
        browserName: 'firefox',
        "moz:debuggerAddress": true,
        "moz:firefoxOptions": {
            args: process.env.CI ? ['-headless'] : [],
            prefs: {
                "browser.download.dir": __dirname,
                "browser.download.folderList": 2,
                "browser.download.manager.showWhenStarting": false,
                "browser.helperApps.neverAsk.saveToDisk": "*/*"
            }
        }
    }
}

if (!process.env.CI) {
  // TODO: this could be a env var also?
  const firefoxNightlyBinaryPath = '/Applications/Firefox Nightly.app/Contents/MacOS/firefox';
  firefoxNightlyOptions.capabilities['moz:firefoxOptions'].binary = firefoxNightlyBinaryPath;
}

const edgeOptions = {
    capabilities: {
        browserName: 'edge',
        "ms:edgeOptions": {
            args: process.env.CI ? ['--headless'] : [],
            prefs: {
                "download.default_directory": __dirname
            }
        }
    }
}

const safariOptions = {
    capabilities: {
        browserName: 'safari'
    }
}

const browserCapabilities = {
    chrome: chromeOptions.capabilities,
    firefox: firefoxOptions.capabilities,
    firefoxNightly: firefoxNightlyOptions.capabilities,
    edge: edgeOptions.capabilities,
    safari: safariOptions.capabilities
}

const capabilities = [
    process.env.BROWSER && browserCapabilities[process.env.BROWSER]
        ? browserCapabilities[process.env.BROWSER]
        : browserCapabilities['chrome']
]

export const config = {
    ...baseConfig,
    capabilities
}
