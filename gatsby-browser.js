import React, { Suspense } from "react";
import ApolloProvider from "./src/ApolloProvider";
import analytics from "./src/analytics";
import smoothscroll from "smoothscroll-polyfill";
import i18n from "./src/i18n";
import { I18nextProvider } from "react-i18next";

smoothscroll.polyfill();

export const onRouteUpdate = () => {
  analytics.page();
};
export const wrapRootElement = ({ element }) => (
  <ApolloProvider>
    <Suspense fallback={null}>
      <I18nextProvider i18n={i18n}>{element}</I18nextProvider>
    </Suspense>
  </ApolloProvider>
);
