import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Router from './Router';
import * as serviceWorker from './serviceWorker';

import ApolloClient from 'apollo-client';
import { WebSocketLink } from 'apollo-link-ws';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import 'bootstrap/dist/css/bootstrap.min.css';

const createApolloClient = () => {
    return new ApolloClient({
        link: new WebSocketLink({
            options: {
                reconnect: true,
            },
            uri: 'ws://localhost:8080/v1/graphql',
        }),
        cache: new InMemoryCache(),
    });
};

const client = createApolloClient();

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <Router />
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
