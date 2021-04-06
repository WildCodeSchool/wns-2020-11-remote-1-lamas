import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, createContext } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { onError } from "@apollo/client/link/error";
import * as SecureStore from "expo-secure-store";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import LoginScreen from "./screens/LoginScreen";
import { MMKV } from "react-native-mmkv";

import { setContext } from "@apollo/client/link/context";
import { NavigationContainer } from "@react-navigation/native";

import Constants from "expo-constants";
import { getMainDefinition } from "@apollo/client/utilities";
import { createStackNavigator } from "@react-navigation/stack";
import { LamasToolsParamList } from "./types";
import LamasToolsScreen from "./screens/LamasToolsScreen";
const { manifest } = Constants;

const App = () => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  // obtient une error 404 avec cette méthode
  const httpLink = createHttpLink({
    uri: `http://${manifest?.debuggerHost?.split(":").shift()}:8000/graphql`,
    // uri: "http://46.193.68.20:8000/graphql",
  });

  const authLink = setContext((_, { headers }) => {
    console.log(headers);
    // const token = MMKV.getString("token");
    // console.warn("token set context", token);
    // return {
    //   headers: {
    //     ...headers,
    //     Authorization: token ? `Bearer ${token}` : "",
    //   },
    // };
  });

  const link = onError(({ graphQLErrors, networkError }) => {
    console.warn(graphQLErrors, "graphQLErrors");
    console.warn(networkError, "networkError");
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
        // eslint-disable-next-line no-console
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
    }
    // eslint-disable-next-line no-console
    if (networkError) console.log(`[Network error]: ${networkError}`);
  });

  const clients = new ApolloClient({
    defaultOptions: {
      mutate: {
        errorPolicy: "all",
      },
    },
    link: ApolloLink.from([errorLink, authLink.concat(httpLink)]),
    // link,
    cache: new InMemoryCache(),
  });

  // const client = new ApolloClient({
  //   // uri: "46.193.68.20:8000/graphql",
  //   uri: "http://46.193.68.20:8000/graphql",
  //   cache: new InMemoryCache(),
  // });

  const client = new ApolloClient({
    uri: `http://${manifest?.debuggerHost?.split(":").shift()}:8000/graphql`,
    // uri: `http://localhost:8000/graphql`,
    // uri:'10.188.160.29:19000'

    cache: new InMemoryCache(),
    defaultOptions: { watchQuery: { fetchPolicy: "cache-and-network" } },
  });

  console.log(
    `http://${manifest?.debuggerHost?.split(":").shift()}:8000/graphql`
  );

  // const isLogged = MMKV.set("isLogged", false);
  // const logged = MMKV.getBoolean("isLogged");

  // verifier token du client

  const Navigator = createStackNavigator<LamasToolsParamList>();

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
  // } else {
  //   return (
  //     <ApolloProvider client={client}>
  //       <StatusBar style="light" />

  //       <NavigationContainer>
  //         <Navigator.Navigator>

  //           {/* <LoginScreen /> */}
  //         </Navigator.Navigator>
  //       </NavigationContainer>
  //     </ApolloProvider>
  //   );
  // }
};

export default App;

// const link = split(
//   ({ query }) => {
//     const definition = getMainDefinition(query);
//     return (
//       definition.kind === 'OperationDefinition' &&
//       definition.operation === 'subscription'
//     );
//   },
//   wsLink,
//   httpAuthLink,
// );
