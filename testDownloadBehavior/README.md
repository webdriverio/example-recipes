# WebdriverIO `Download Behavior` Examples

This example repository contains test file that demonstrates WebdriverIO's download behavior.

## Prerequisite

Make sure to run this first, to set up the example repository:

```sh
npm install
```

## For Google Chrome

**NOTE**: Ensure that the download directory specified in `helper.js` matches the directory you've set in capabilities.

For **Chrome**, use these capabilities,

```javascript
{
    browserName: "chrome",
    "goog:chromeOptions":{
        prefs: {
            "download.default_directory":"/path/to/downloads/directory"
        }
    }
}
```

To test download behavior in **Chrome**,

```sh
npm run testDownload:chrome
```

## For Microsoft Edge

**NOTE**: Ensure that the download directory specified in `helper.js` matches the directory you've set in capabilities.

For **Edge**, use these capabilities,

```javascript
{
    browserName: "msedge",
    "ms:edgeOptions":{
        prefs: {
            "download.default_directory":"/path/to/downloads/directory"
        }
    }
}
```

To test download behavior in **Edge**,

```sh
npm run testDownload:msedge
```

## For Mozilla Firefox

**NOTE**: Ensure that the download directory specified in `helper.js` matches the directory you've set in capabilities.

For **Firefox**, use these capabilities.

```javascript
{
    browserName: "firefox",
    "moz:debuggerAddress":true,
    "moz:firefoxOptions":{
        prefs: {
            "browser.download.dir":"/path/to/downloads/directory",
            "browser.download.folderList":2,
            "browser.download.manager.showWhenStarting":false,
            "browser.helperApps.neverAsk.saveToDisk":"*/*"
        }
    }
}
```

To test download behavior in **Firefox**,

```sh
npm run testDownload:firefox
```

## For Apple Safari

Unfortunately, **Safari** doesn't support defining download dirs through WebDriver capabilities.

## Test Download Behavior

**IMPORTANT NOTE**: Ensure that the download directory specified in `helper.js` matches the directory you've set in
capabilities.

To test download behavior across all browsers, i.e. **Google Chrome**, **Mozilla Firefox**, and **Microsoft Edge**,

```sh
npm run testDownloadBehavior
```
