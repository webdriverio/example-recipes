import { defineConfig } from '@wdio/config'

export const config = defineConfig({
    // ...
    // =====
    // Setup
    // =====
    services: [
        [
            "visual",
            {
                // The options
            },
        ],
    ],
    // ...
});