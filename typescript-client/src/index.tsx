// NPM
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";

// Files
import App from './App';
import 'bootstrap/dist/css/bootstrap.css'
import './index.css';
import { store } from "./features";
import {ApolloClient, ApolloProvider, HttpLink, InMemoryCache, split} from "@apollo/client";
import {getMainDefinition} from "@apollo/client/utilities";
import {WebSocketLink} from "@apollo/client/link/ws";

const httpLink = new HttpLink({
    uri: 'http://localhost:5000/graphql'
})

const wsLink = new WebSocketLink({
    uri: 'ws://localhost:5000/graphql',
    options: {
        reconnect: true
    }
})

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query)
        return (
            definition.kind === 'OperationDefinition' &&
                definition.operation === 'subscription'
        )
    },
    wsLink,
    httpLink
)

const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache()
})

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <ApolloProvider client={client}>
            <App />
          </ApolloProvider>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
