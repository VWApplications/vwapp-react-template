import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { onError } from "apollo-link-error";
import { ApolloLink, Observable } from "apollo-link";
import { createUploadLink } from "apollo-upload-client";
import Cookies from "js-cookie";

let uri = "{{cookiecutter.dev_url}}";

if (process.env.REACT_APP_ENVIRONMENT === "production") {
  uri = "{{cookiecutter.production_url}}";
}

if (process.env.REACT_APP_ENVIRONMENT === "homolog") {
  uri = "{{cookiecutter.homolog_url}}";
}

const request = async operation => {
  const token = Cookies.get("{{cookiecutter.project|lower|replace(' ', '-')}}-token");
  if (token) {
    operation.setContext({
      headers: { authorization: `JWT ${token}` }
    });
  }
};

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable(observer => {
      let handle;
      Promise.resolve(operation)
        .then(oper => request(oper))
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer)
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) {
          handle.unsubscribe();
        }
      };
    })
);

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.forEach(({ message }) => console.log(`[GraphQL error]: Message: ${message}`));
      }
      if (networkError) {
        console.log(`[Network error]: ${networkError}`);
      }
    }),
    requestLink,
    createUploadLink({ uri: uri })
  ]),
  cache: new InMemoryCache()
});

export default client;
