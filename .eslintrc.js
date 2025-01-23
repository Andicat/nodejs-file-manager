module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:node/recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    "node/no-unsupported-features/es-syntax": [
      "error",
      {
        version: ">=10.0.0",
      },
    ],
    "node/no-unsupported-features/node-builtins": [
      "error",
      {
        version: ">=10.0.0",
        ignores: ["fs.promises"],
      },
    ],
    "no-console": "off",
  },
};
