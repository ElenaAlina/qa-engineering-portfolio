const {defineConfig} = require('cypress');
module.exports = {
  //watchForFileChanges: true so that Cypress to take care of automatically re-running the tests when a file is changed
    watchForFileChanges: false,
    "reporter": "mochawesome",
    "reporterOptions":{
      "charts": true,
      "reportDir": "cypress/reports",
      "overwrite": false,
      "html": false,
      "json": true
    },
  fixturesFolder: 'cypress-tests/cypress/fixtures',
  supportFile: 'support/e2e.js',
  specPattern: 'cypress-tests/**/*.cy.js',
  e2e: {
    
    setupNodeEvents(on, config) {
      
      return config;
    },
  },
};
