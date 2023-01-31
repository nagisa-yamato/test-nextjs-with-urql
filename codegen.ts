// NOTE:
// https://the-guild.dev/graphql/codegen/docs/guides/react-vue#installation
import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "https://rickandmortyapi.com/graphql",
  // https://the-guild.dev/graphql/codegen/docs/config-reference/documents-field#document-scanner
  documents: "src/**/!(*.d).{ts,tsx}",
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./src/gql/generated/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
