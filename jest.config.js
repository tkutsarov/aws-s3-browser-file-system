/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\.tsx?$": ["ts-jest",{ diagnostics: { ignoreCodes: ['TS151001'] }}],
    "\\.(scss|sass|css)$": "<rootDir>/jest-config/style-mock.cjs"
  },
};
