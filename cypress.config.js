const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
        },
        baseUrl: "http://192.168.88.33:5198",
		},
		video: false,
		viewportHeight: 1080,
		viewportWidth: 1920
});
