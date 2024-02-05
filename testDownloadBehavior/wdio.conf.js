import path from "path";
import {fileURLToPath} from "url";
import {config as baseConfig} from "../wdio.conf.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const Browsers = {
    CHROME: "chrome", FIREFOX: "firefox", MS_EDGE: "msedge",
}

const BrowserCapabilities = {
    [Browsers.CHROME]: {
        browserName: Browsers.CHROME,
        "goog:chromeOptions": {
            prefs: {
                "download.default_directory": __dirname
            }
        }
    },
    [Browsers.FIREFOX]: {
        browserName: Browsers.FIREFOX,
        "moz:debuggerAddress": true,
        "moz:firefoxOptions": {
            prefs: {
                "browser.download.dir": __dirname,
                "browser.download.folderList": 2,
                "browser.download.manager.showWhenStarting": false,
                "browser.helperApps.neverAsk.saveToDisk": "*/*"
            }
        }
    },
    [Browsers.MS_EDGE]: {
        browserName: Browsers.MS_EDGE,
        "ms:edgeOptions": {
            prefs: {
                "download.default_directory": __dirname
            }
        }
    }
}


export const config = {
    ...baseConfig,
    capabilities: [BrowserCapabilities[process.env.EXAMPLE_BROWSER] ?? BrowserCapabilities[Browsers.CHROME]]
}