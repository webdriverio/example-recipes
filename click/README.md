# WebdriverIO Click Examples

This example directory contains test files that demonstrate WebdriverIO's [`click`](https://webdriver.io/docs/api/element/click) command.

## Prerequisite

Make sure to run this first, to set up the example repository:

```sh
npm install
```

## Examples

### Basic Click
In this example, a click on a button changes the text of a `div` element.

```sh
npm run click -- --mochaOpts.grep 'should demonstrate the click command'
```

### Click with x and y Parameter
In this example, the click does not happen due to the applied `x` or `y` parameters which cause the click happens outside of the button's hit area.

```sh
npm run click -- --mochaOpts.grep 'should miss the button'
```

### Right Click
In this example, the click does not happen as a right click gets executed.

```sh
npm run click -- --mochaOpts.grep 'should do a right click'
```