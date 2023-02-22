# WebdriverIO Setup Types

Read on WebdriverIO Setup Types in the [project docs](https://webdriver.io/docs/setuptypes). These examples demonstrate each setup type with a script or execution.

## Prerequisite

Make sure to run this first, to set up the example repository:

```sh
npm install
```

## Protocol Bindings

For basic interactions with the WebDriver and other automation protocols, WebdriverIO uses its protocol bindings based on the [`webdriver`](https://www.npmjs.com/package/webdriver) and [`devtools`](https://www.npmjs.com/package/devtools) NPM package:

### WebDriver

```sh
npm run setup:webdriver
```

### Devtools

```sh
npm run setup:devtools
```

## Standalone Mode

```sh
npm run setup:standalone
```

## The WDIO Testrunner

```sh
npm run setup:testrunner
```