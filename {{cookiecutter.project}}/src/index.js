import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/react-hooks";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./reducers";
import store from "./config/store";
import * as serviceWorker from "./config/serviceWorker";
import * as Sentry from "@sentry/browser";
import client from "./config/apollo";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

if (process.env.REACT_APP_ENVIRONMENT === "production" || process.env.REACT_APP_ENVIRONMENT === "homolog") {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DNS,
    environment: process.env.REACT_APP_ENVIRONMENT
  });
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </ApolloProvider>
  </Provider>,
  rootElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
