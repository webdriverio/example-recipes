import { config as baseConfig } from './wdio.conf.js'

// wdio.conf.js
export const config = {
    ...baseConfig,
    // ...
    runner: ['browser', {
        // runner options
        preset: 'svelte', // setup WebdriverIOs Vite server for a Svelte project
        // define code coverage options, see more https://webdriver.io/docs/runner#coverage-options
        coverage: {
            enabled: true,
            statements: 100,
            branches: 50,
            functions: 100,
            lines: 100
        }
    }]
}