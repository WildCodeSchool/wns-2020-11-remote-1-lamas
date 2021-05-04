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

const { manifest } = Constants;

const App = () => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const httpLink = createHttpLink({
    uri: `http://${manifest?.debuggerHost?.split(":").shift()}:8000/graphql`,
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

  const link = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
        console.warn(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
    if (networkError) console.warn(`[Network error]: ${networkError}`);
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
    }

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
