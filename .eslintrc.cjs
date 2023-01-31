// NOTE:
// https://prettier.io/docs/en/integrating-with-linters.html
// https://the-guild.dev/graphql/eslint/docs/getting-started
// https://typescript-eslint.io/getting-started
// https://typescript-eslint.io/linting/typed-linting
module.exports = {
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  parserOptions: {
    project: ["./tsconfig.json"],
    tsconfigRootDir: __dirname,
  },
  overrides: [
    {
      files: ["*.js", "*.jsx", "*.ts", "*.tsx"],
      processor: "@graphql-eslint/graphql",
    },
    {
      files: ["*.graphql"],
      extends: "plugin:@graphql-eslint/operations-recommended",
      parserOptions: {
        operations: "./src/**/*.(ts|tsx)",
        schema: "https://rickandmortyapi.com/graphql",
      },
    },
  ],
};
