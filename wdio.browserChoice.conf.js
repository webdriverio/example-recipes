import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'
import { config as baseConfig } from './wdio.conf.js'

// Create downloads directory if it doesn't exist
export const downloadsDir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'downloads')
if (!fs.existsSync(downloadsDir)){
    fs.mkdirSync(downloadsDir);
}

// Get custom Firefox binary path from environment variable if set
const { FIREFOX_BINARY_PATH } = process.env

const chromeOptions = {
    capabilities: {
        browserName: 'chrome',
        "goog:chromeOptions": {
          args: process.env.CI ? ['headless', 'disable-gpu'] : ['disable-gpu'],
            prefs: {
                "download.default_directory": downloadsDir
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
                "browser.download.dir": downloadsDir,
                "browser.download.folderList": 2,
                "browser.download.manager.showWhenStarting": false,
                "browser.helperApps.neverAsk.saveToDisk": "*/*"
            }
        }
    }
}

// Set custom Firefox binary path if provided, e.g., for using Nightly or a specific version
if (FIREFOX_BINARY_PATH) {
  firefoxOptions.capabilities['moz:firefoxOptions'].binary = FIREFOX_BINARY_PATH;
}

const edgeOptions = {
    capabilities: {
        browserName: 'edge',
        "ms:edgeOptions": {
            args: process.env.CI ? ['--headless'] : [],
            prefs: {
                "download.default_directory": downloadsDir
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
