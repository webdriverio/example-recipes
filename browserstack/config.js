import { defineConfig } from '@wdio/config'

export const config = defineConfig({
  //...
  user: '<browserstack_username>' || process.env.BROWSERSTACK_USERNAME,
  key: '<browserstack_access_key>' || process.env.BROWSERSTACK_ACCESS_KEY,
  commonCapabilities: {
    'bstack:options': {
      projectName: "Your static project name goes here",
      buildName: "Your static build/job name goes here"
    }
  },
  services: [
    ['browserstack', {
      accessibility: true,
      // Optional configuration options
      accessibilityOptions: {
        'wcagVersion': 'wcag21a',
        'includeIssueType': {
          'bestPractice': false,
          'needsReview': true
        },
        'includeTagsInTestingScope': ['Specify tags of test cases to be included'],
        'excludeTagsInTestingScope': ['Specify tags of test cases to be excluded']
      },
    }]
  ],
  //...
});