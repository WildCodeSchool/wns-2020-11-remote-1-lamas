import { InMemoryCache } from '@apollo/client/cache/inmemory/inMemoryCache';
import { makeVar } from '@apollo/client/cache/inmemory/reactiveVars';

export const currentUser = makeVar<any | null>(null);

export const UseCache = (): InMemoryCache => {
  const memoryCache: InMemoryCache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          authUser: {
            read() {
              return currentUser();
            },
          },
        },
      },
    },
  });

  return memoryCache;
};
