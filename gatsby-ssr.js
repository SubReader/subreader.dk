import React from "react";
import ApolloProvider from "./src/ApolloProvider";
import i18n from "./src/i18n";
import { I18nextProvider } from "react-i18next";

export const wrapRootElement = ({ element }) => (
  <I18nextProvider i18n={i18n}>
    <ApolloProvider>{element}</ApolloProvider>
  </I18nextProvider>
);

//Scripts - Insert Scripts Once
export const onRenderBody = ({ setHeadComponents }) => {
  if (process.env.NODE_ENV === "production") {
    return setHeadComponents([
      <script
        type="text/javascript"
        src="//script.crazyegg.com/pages/scripts/0101/9145.js"
        async="async"
      ></script>,
      <script
        type="text/javascript"
        src="https://checkout.reepay.com/checkout.js"
        defer
      ></script>,
    ]);
  } else {
    return setHeadComponents([
      <script
        type="text/javascript"
        src="https://checkout.reepay.com/checkout.js"
        defer
      ></script>,
    ]);
  }
};
