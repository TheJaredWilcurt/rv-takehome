// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
    'default e2e tests': function (browser) {
        // automatically uses dev Server port from /config.index.js
        // default: http://localhost:8080
        // see nightwatch.conf.js
        var devServer = browser.globals.devServerURL;

        browser
            .url(devServer)
            .waitForElementVisible('#app', 5000)
            .assert.elementPresent('.well')
            .assert.containsText('.well', '0 dealers in 28205\nFilter Results\nService\nInstallation\nResidential\nCommercial\n?')
            .assert.elementCount('img', 7)
            .end();
    }
};
