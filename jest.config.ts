/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */
import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,

  // A set of global variables that need to be available in all test environments
  globals: {
    window: {},
  },

  // An array of file extensions your modules use
  moduleFileExtensions: ["js", "ts"],

  // Automatically reset mock state before every test
  resetMocks: true,

  // The test environment that will be used for testing
  testEnvironment: "node",

  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  testPathIgnorePatterns: ["\\\\node_modules\\\\", "\\\\dist\\\\"],

  // A map from regular expressions to paths to transformers
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },

  // The glob patterns Jest uses to detect test files
  testMatch: ["**/tests/**/?(*.)+(test).[tj]s?(x)"],
};

export default config;
