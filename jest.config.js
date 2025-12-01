export default {
  testEnvironment: "jsdom",

  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],

  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest"
  },

  // Transform ESM node_modules
  transformIgnorePatterns: [
    "node_modules/(?!(uuid|shadcn-ui)/)"
  ],

  moduleNameMapper: {
    "\\.(css|scss|sass|less)$": "identity-obj-proxy",
    // Map uuid to a manual mock so Jest tests don't need to transform the package ESM build.
    "^uuid$": "<rootDir>/__mocks__/uuid.js"
  },

  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"]
};
