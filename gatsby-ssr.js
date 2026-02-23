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

const GA_ID = "G-F86HKGDW1H";

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    // 1) Consent Mode defaults (deny until user decides)
    <script
      key="consent-default"
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}

          gtag('consent', 'default', {
            ad_storage: 'denied',
            analytics_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            functionality_storage: 'denied',
            personalization_storage: 'denied',
            security_storage: 'granted'
          });

          // Optional but recommended: reduce/obfuscate ads data until consent
          gtag('set', 'ads_data_redaction', true);
        `,
      }}
    />,

    // 2) Load GA4 (gtag.js)
    <script async key="gtag-src" src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />,

    // 3) Init GA4
    <script
      key="gtag-init"
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { anonymize_ip: true });
        `,
      }}
    />,
  ]);
};
