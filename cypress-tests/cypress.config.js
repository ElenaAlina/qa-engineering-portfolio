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
  e2e: {
    
    setupNodeEvents(on, config) {
      // implement node event listeners here

      //added for download file plugin
      require('cypress-downloadfile/lib/addPlugin')(on, config);
      return config;
    },
  },
};
