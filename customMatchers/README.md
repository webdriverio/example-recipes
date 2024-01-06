# WebdriverIO Custom Matchers Examples

This example directory contains test files that demonstrate how to extend WebdriverIO's `expect` set of matchers.

## Prerequisite

Make sure to run this first, to set up the example repository:

```sh
npm install
```

## Examples

### Custom Browser Matcher
In this example, we add a custom matcher to assert the browser language setting.

```sh
npm run customMatchers -- --mochaOpts.grep 'browser object'
```

### Custom Element Matcher
In this example, we add a custom matcher to assert the aria-label of a given element.

```sh
npm run customMatchers -- --mochaOpts.grep 'element object'
```
