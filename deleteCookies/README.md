# WebdriverIO `deleteCookies` Examples

This example directory contains test files that demonstrate WebdriverIO's [`deleteCookies`](https://webdriver.io/docs/api/browser/deleteCookies) command.

## Prerequisite

Make sure to run this first, to set up the example repository:

```sh
npm install
```

## Examples

### Delete a Single Cookie
In this example, we start setting 3 cookies and attempt to delete one:

```sh
npm run deleteCookies -- --mochaOpts.grep 'should delete one cookie'
```

### Delete All Cookies
In this example, we then delete all (the remaining 2) cookies.

```sh
npm run deleteCookies -- --mochaOpts.grep 'should delete all cookies'
```
