# WebdriverIO Custom Matchers Examples

This example directory contains test files that demonstrate how to extend WebdriverIO's `expect` set of matchers.

## Prerequisite

Make sure to run this first, to set up the example repository:

```sh
npm install
```

## Examples

### Custom `WebdriverIO.Browser` Matcher
In this example, we start setting 3 cookies and attempt to delete one:

```sh
npm run customMatchers -- --mochaOpts.grep 'WebdriverIO.Browser'
```

### Custom `WebdriverIO.Element` Matcher
In this example, we then delete all (the remaining 2) cookies.

```sh
npm run customMatchers -- --mochaOpts.grep 'WebdriverIO.Element'
```
