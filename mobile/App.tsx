import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, createContext } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { onError } from "@apollo/client/link/error";
import * as SecureStore from "expo-secure-store";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { setContext } from "@apollo/client/link/context";
import Constants from "expo-constants";
import { REACT_APP_LAMAS_BACK } from '@env';

const App = () => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const httpLink = createHttpLink({
    uri: `${REACT_APP_LAMAS_BACK}/graphql`,
    credentials: 'include',
  });

  const authLink = setContext(async (_, { headers }) => {
    const token = await SecureStore.getItemAsync("userToken");
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) =>
        // eslint-disable-next-line no-console
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
    }
    // eslint-disable-next-line no-console
    if (networkError) console.log(`[Network error]: ${networkError}`);
  });

  const client = new ApolloClient({
    defaultOptions: {
      mutate: {
        errorPolicy: "all",
      },
    },
    link: ApolloLink.from([errorLink, authLink.concat(httpLink)]),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            project: {
              merge: true,
            },
          },
        },
      },
    }),
  });


  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ApolloProvider client={client}>
        <SafeAreaProvider>
          <StatusBar style="light" />
          <Navigation colorScheme={colorScheme} />
        </SafeAreaProvider>
      </ApolloProvider>
    );
  }
};

export default App;
