/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  "rootDir": "src",
  "collectCoverage": true,
  "verbose": true,
  "noStackTrace": true,
  "preset": "ts-jest/presets/js-with-ts",
  "testEnvironment": "jsdom",
  "transformIgnorePatterns": [
      "node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)"
    ]
};
