import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  ApolloLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UseCache } from './cache';

const httpLink = createHttpLink({
  uri: `${process.env.REACT_APP_LAMAS_BACK}/graphql`,
  credentials: 'include',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
      AccessControlAllowOrigin: `${process.env.REACT_APP_LAMAS_BACK}`,
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log('graphQLErrors', graphQLErrors);
  }
  if (networkError) {
    console.log('networkError', networkError);
  }
});

export const link = ApolloLink.from([errorLink, authLink.concat(httpLink)]);

const cache = UseCache();

const client = new ApolloClient({
  link,
  cache,
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
