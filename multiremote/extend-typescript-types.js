import { defineConfig } from '@wdio/config'

export const config = defineConfig({
    // ...
    capabilities: {
        myAppiumDriver: {
            // ...
        },
        myChromeDriver: {
            // ...
        }
    }
    // ...
})