// NPM
import React from 'react';
import ReactDOM from 'react-dom';
import { getMainDefinition } from '@apollo/client/utilities'
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
    split,
    HttpLink
} from "@apollo/client";
import { WebSocketLink } from '@apollo/client/link/ws';
import { Provider} from "react-redux";
// Files
import 'bootstrap/dist/css/bootstrap.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { store } from "./features";

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
          <ApolloProvider client={ client }>
              <App />
          </ApolloProvider>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
