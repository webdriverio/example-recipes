# WebdriverIO `emulate` Examples

This example directory contains test files that demonstrate WebdriverIO's [`emulate`](https://webdriver.io/docs/api/browser/emulate) command.

## Prerequisite

Make sure to run this first, to set up the example repository:

```sh
npm install
```

## Examples

### Emulate Color Scheme

In this example, we emulate the color scheme settings.

```sh
npm run emulate -- --mochaOpts.grep 'color scheme'
```

### Emulate Geolocation

In this example, we emulate a different geo location of the browser.

```sh
npm run emulate -- --mochaOpts.grep 'geolocation'
```
