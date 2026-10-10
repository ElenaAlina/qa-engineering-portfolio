const {defineConfig} = require('cypress')
module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    //to don't executes the tests by its own
    watchForFileChanges: false,
    "reporter":"mochawesome",
    "reporterOptions": {
      "reportDir": "cypress/reports",
      "overwrite": false,
      "html": false,
      "json": true,
      "charts": true
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
