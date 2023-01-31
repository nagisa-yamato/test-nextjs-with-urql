import Image from "next/image";
import styles from "@/styles/GetServerSideProps.module.css";
import {
  cacheExchange,
  dedupExchange,
  fetchExchange,
  ssrExchange,
  useQuery,
} from "urql";
import { initUrqlClient, withUrqlClient } from "next-urql";
import { getCharactersQueryDocument } from "@/gql/queries/getCharacters";
import { devtoolsExchange } from "@urql/devtools";

// NOTE:
// https://formidable.com/open-source/urql/docs/advanced/server-side-rendering/#ssr-with-getstaticprops-or-getserversideprops
export const getServerSidePrpos = async () => {
  const ssrCache = ssrExchange({ isClient: false });
  const client = initUrqlClient(
    {
      url: "https://rickandmortyapi.com/graphql",
    },
    false
  );
  if (!client) {
    return;
  }

  await client.query(getCharactersQueryDocument, { page: 1 }).toPromise();

  return {
    props: {
      urqlState: ssrCache.extractData(),
    },
  };
};

const PageGetServerSideProps = () => {
  const [res] = useQuery({
    query: getCharactersQueryDocument,
    variables: { page: 1 },
  });

  return (
    <main className={styles.main}>
      {res.data?.characters?.results?.map((character) => (
        <article key={character?.id}>
          <h2>{character?.name}</h2>
          {character?.image && (
            <Image
              src={character.image}
              alt={`Picture of ${
                character?.name ?? "a Rick and Morty character"
              }`}
              width={250}
              height={250}
            />
          )}
        </article>
      ))}
    </main>
  );
};

export default withUrqlClient((ssrExchange) => ({
  url: "https://rickandmortyapi.com/graphql",
  exchanges: [
    devtoolsExchange,
    dedupExchange,
    cacheExchange,
    ssrExchange,
    fetchExchange,
  ],
}))(PageGetServerSideProps);
