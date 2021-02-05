import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';

const link = createHttpLink({
  uri: 'http://localhost:8000/graphql',
  credentials: 'same-origin',
});

// const authLink = setContext((_, { headers }) => {
//   return {
//     headers: {
//       ...headers,
//       // 'Access-Control-Allow-Origin': '*',
//       // 'Access-Control-Allow-Headers': '*',
//       // 'Access-Control-Allow-Methods': [
//       //   'GET',
//       //   'POST',
//       //   'PUT',
//       //   'DELETE',
//       //   'OPTIONS',
//       // ],
//     },
//   };
// });

const client = new ApolloClient({
  // link: authLink.concat(link),
  link,
  cache: new InMemoryCache(),
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
