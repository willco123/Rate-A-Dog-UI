import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  verbose: true,
  // testPathIgnorePatterns: [`<rootDir>/src/config/`],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.ts",
    "\\.(css|less|scss)$": "identity-obj-proxy",
    "^.+/(.*\\.svg)": "jest-transform-stub",
    "(.+)\\.js": "$1", //for .js in imports
  },

  setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
  moduleDirectories: ["node_modules", "src"],
  transform: { "\\.[jt]sx?$": ["ts-jest", { useESM: true }] }, //for .js in imports

  extensionsToTreatAsEsm: [".ts"], //for .js in imports
};
export default config;
