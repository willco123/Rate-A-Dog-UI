import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  verbose: true,
  // testPathIgnorePatterns: [`<rootDir>/src/config/`],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.ts",
    "\\.(css|less)$": "identity-obj-proxy",
    "^.+/(.*\\.svg)": "jest-transform-stub",
  },

  setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
};
export default config;
