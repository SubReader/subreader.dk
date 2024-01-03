import React from "react";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import {
  getAccessToken,
  refreshAccessToken,
  tokenHasExpired,
  isAuthenticated,
} from "./authentication";

const cache = new InMemoryCache();
const httpLink = createHttpLink({
  uri: process.env.GATSBY_API_ENDPOINT,
  headers: {
    "Accept-Language": "da",
  },
});

const authLink = setContext(
  async (context, { authenticate = true, ...options }) => {
    if (authenticate) {
      if (!(await isAuthenticated())) {
        throw new Error("User is not authenticated.");
      }

      const accessToken = (await tokenHasExpired())
        ? await refreshAccessToken()
        : await getAccessToken();

      return {
        ...options,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          ...options.headers,
        },
      };
    }

    return options;
  }
);

const link = ApolloLink.from([authLink, httpLink]);
const client = new ApolloClient({ link, cache });
const Provider = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);
export default Provider;
