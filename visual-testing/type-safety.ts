import { join } from 'node:path';
import type { VisualServiceOptions } from '@wdio/visual-service';

export const config = defineConfig({
    // ...
    services: [
        [
            "visual",
            {
                // Service options
                baselineFolder: join(process.cwd(), './__snapshots__/'),
                formatImageName: '{tag}-{logName}-{width}x{height}',
                screenshotPath: join(process.cwd(), '.tmp/'),
            } satisfies VisualServiceOptions, // Ensures type safety
        ],
    ],
    // ...
});