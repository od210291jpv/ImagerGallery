const { defineConfig } = require("cypress");

module.exports = defineConfig({
	reporter: 'cypress-mochawesome-reporter',
	reporterOptions: {    
    configFile: 'reporter-config.json',
	charts: true,
    reportPageTitle: 'custom-title',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
	  require('cypress-mochawesome-reporter/plugin')(on);
        },
        baseUrl: "http://192.168.88.33:5198",
		},
		video: false,
		viewportHeight: 1080,
		viewportWidth: 1920
});
