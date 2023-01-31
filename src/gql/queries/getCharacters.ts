import { graphql } from "@/gql/generated";

export const getCharactersQueryDocument = graphql(`
  query getCharacters($page: Int) {
    characters(page: $page) {
      info {
        count
        next
        pages
        prev
      }
      results {
        id
        image
        name
      }
    }
  }
`);
