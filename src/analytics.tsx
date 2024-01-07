import Analytics from "analytics";
import segmentPlugin from "@analytics/segment";
// import googleAnalytics from "@analytics/google-analytics";
import { Token } from "./authentication";

export const analytics = Analytics({
  app: "website",
  plugins: [
    // googleAnalytics({
    //   trackingId: process.env.GATSBY_GOOGLE_TRACKINGID,
    // }),
    segmentPlugin({
      writeKey: process.env.GATSBY_ANALYTICS_WRITE_KEY,
    }),
  ],
});

export type AuthenticationResult = {
  accessToken: Token;
  refreshToken: Token;
  user: {
    id: string;
    name?: string;
    country: string;
    language: string;
    logins: Array<any>;
  };
};

export type RegistrationResult = {
  accessToken: Token;
  refreshToken: Token;
  user: {
    id: string;
    name?: string;
    country: string;
    language: string;
    logins: Array<any>;
  };
};

export function trackAuthentication(
  method: string,
  authenticationResult: AuthenticationResult
): void {
  const { user } = authenticationResult;
  analytics.track("Sign in", { method });
  analytics.identify(user.id, {
    name: user.name ?? null,
    country: user.country,
    language: user.language,
  });
  user.logins.map((login: any) => {
    switch (login.__typename) {
      case "EmailLogin":
        return analytics.identify(user.id, { email: login.email });
      case "PhoneLogin":
        return analytics.identify(user.id, {
          phoneNumber: login.phoneNumber,
        });
      case "GoogleLogin":
        return analytics.identify(user.id, { googleId: login.googleId });
      case "FacebookLogin":
        return analytics.identify(user.id, { facebookId: login.facebookId });
      case "AppleLogin":
        return analytics.identify(user.id, { userId: login.userID });
    }
  });
}

export function trackRegistration(
  method: string,
  registrationResult: RegistrationResult
): void {
  const { user } = registrationResult;
  analytics.track("Sign up", { method });
  analytics.identify(user.id, {
    name: user.name ?? null,
    country: user.country,
    language: user.language,
  });
  user.logins.map((login: any) => {
    switch (login.__typename) {
      case "EmailLogin":
        return analytics.identify(user.id, { email: login.email });
      case "PhoneLogin":
        return analytics.identify(user.id, {
          phoneNumber: login.phoneNumber,
        });
      case "GoogleLogin":
        return analytics.identify(user.id, { googleId: login.googleId });
      case "FacebookLogin":
        return analytics.identify(user.id, { facebookId: login.facebookId });
      case "AppleLogin":
        return analytics.identify(user.id, { userId: login.userID });
    }
  });
}

export default analytics;
