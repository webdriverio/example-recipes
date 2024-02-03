# WebdriverIO `Download Behavior` Examples

This example directory contains test files that demonstrate WebdriverIO's download behavior.

## Prerequisite

Make sure to run this first, to set up the example repository:

```sh
npm install
```

## For Google Chrome

**NOTE**: Ensure that the directory specified in `example.js` matches the directory you've set in capabilities.

To test download behavior in **Google Chrome**, use these capabilties.

```javascript
{
    browserName: "chrome",
    "goog:chromeOptions": {
        prefs: {
            "download.default_directory": "/path/to/downloads/directory",
        },
    },
}
```

## For Microsoft Edge

**NOTE**: Ensure that the directory specified in `example.js` matches the directory you've set in capabilities.

To test download behavior in **Microsoft Edge**, use these capabilties.

```javascript
{
    browserName: "msedge",
    "ms:edgeOptions": {
        prefs: {
            "download.default_directory": "/path/to/downloads/directory",
        },
    },
}
```

## For Mozilla Firefox

**NOTE**: Ensure that the directory specified in `example.js` matches the directory you've set in capabilities.

To test download behavior in **Mozilla Firefox**, use these capabilties.

```javascript
{
    browserName: "firefox",
    "moz:debuggerAddress": true,
    "moz:firefoxOptions": {
        prefs: {
            "browser.download.dir": "/path/to/downloads/directory",
            "browser.download.folderList": 2,
            "browser.download.manager.showWhenStarting": false,
            "browser.helperApps.neverAsk.saveToDisk": "*/*",
        },
    },
}
```

## For Apple Safari

I have tried overriding default **Safari** download directory using:

```javascript
{
    browserName: "safari",
    "safari.safariOptions":{
        dataDir: "/path/to/downloads/directory"
    }
}
```

But it **didn't** work out.

### Verify Safari Download Setup

Safari downloads can still be verified.

- **Setup to Verify**

  Apply the following changes to `Apple Safari`:

  - Open Safari > Preferences
    - In `Advanced`, Check the `show feature for web developer` option.
    - In `General`, Set default download directory.
    - In `Websites > Downloads`, Allow all website to download (to remove popup that asks if you want to allow downloads from this website)

**NOTE**: Ensure that the directory specified in `example.js` matches the directory you've set in **Safari** as default download directory.

To test download behavior in **Apple Safari**, use these capabilties.

```javascript
{
    browserName: "safari",
}
```

## Test Download Behavior

**IMPORTANT NOTE**: Ensure that the directory specified in `example.js` matches the directory you've set in capabilities.

Test download behavior using:

```sh
npm run testDownloadBehavior
```
