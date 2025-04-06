import { defineConfig } from '@wdio/config'

const remoteConfig = defineConfig({
    hostname: 'http://localhost',
    port: '4444', // Error: Type 'string' is not assignable to type 'number'.ts(2322)
    capabilities: {
        browserName: 'chrome'
    }
})

export const config = defineConfig({
  ...remoteConfig
  // Other configs options
})