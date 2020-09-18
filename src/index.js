import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { API_URL, AUTH_TOKEN } from "./components/constants";
import { onError } from "apollo-link-error";

const httpLink = createHttpLink({
    uri: `${API_URL}/graphql`
});

const authLink = setContext((_, { headers }) => {
    const token = sessionStorage.getItem(AUTH_TOKEN);
    return {
        headers: {
            ...headers,
            authorization: token ? `${token}` : ''
        }
    }
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) => {
            return console.log(
                `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(locations)}, Path: ${path}`
            )
        });
    }
    if (networkError) {
        console.log(`[Network error]: ${networkError}`)
    }
});

const client = new ApolloClient({
    link: errorLink.concat(authLink.concat(httpLink)),
    cache: new InMemoryCache()
});

ReactDOM.render(
  <BrowserRouter>
      <ApolloProvider client={client}>
          <ApolloHooksProvider client={client}>
              <App />
          </ApolloHooksProvider>
      </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
