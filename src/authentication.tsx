import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import {
  AUTHENTICATE_WITH_FACEBOOK,
  REGISTER_WITH_FACEBOOK,
  REGISTER_WITH_EMAIL_CODE,
  REFRESH_ACCESSTOKEN,
  REGISTER_WITH_GOOGLE,
  AUTHENTICATE_WITH_GOOGLE,
  REGISTER_WITH_PHONE_CODE,
  AUTHENTICATE_WITH_PHONE_CODE,
  REQUEST_PHONE_AUTH_CODE,
  REQUEST_EMAIL_AUTH_CODE,
  AUTHENTICATE_WITH_EMAIL_CODE,
} from "./queries";
import fetch from "isomorphic-fetch";
const cache = new InMemoryCache();
const link = createHttpLink({
  uri: process.env.GATSBY_API_ENDPOINT,
  headers: {
    "Accept-Language": "da",
  },
});
/* @ts-ignore */
const client = new ApolloClient({ link, cache, fetch });

//Token
export function getAccessToken() {
  if (typeof window !== "undefined")
    return localStorage.getItem("access-token");
}

export function setAccessToken(accessToken: string) {
  return localStorage.setItem("access-token", accessToken);
}

export function removeAccessToken() {
  return localStorage.removeItem("access-token");
}

export function getRefreshToken() {
  return localStorage.getItem("refresh-token");
}

export function setTokenExpiration(tokenExpiration: number) {
  return localStorage.setItem("token-expiration", tokenExpiration.toString());
}

export async function refreshAccessToken(): Promise<string> {
  const refreshToken = await getRefreshToken();
  const { data } = await client.mutate({
    mutation: REFRESH_ACCESSTOKEN,
    variables: {
      refreshToken,
    },
  });

  const { accessToken } = data.refreshAccessToken;
  await setAccessToken(accessToken.value);
  await setTokenExpiration(Date.now() + accessToken.expiresIn * 1000);
  return accessToken.value;
}

export const setTokens = result => {
  setAccessToken(result.accessToken.value);
  setTokenExpiration(result.accessToken.expiresIn);
  setRefreshToken(result.refreshToken.value);
};

export function setRefreshToken(refreshToken: string) {
  return localStorage.setItem("refresh-token", refreshToken);
}

export function removeRefreshToken() {
  return localStorage.removeItem("refresh-token");
}

export function getTokenExpiration() {
  const value = localStorage.getItem("token-expiration");
  return value ? parseInt(value, 10) : null;
}

export function removeTokenExpiration() {
  return localStorage.removeItem("token-expiration");
}

export function logout(): Promise<Array<void>> {
  return Promise.all([
    removeAccessToken(),
    removeRefreshToken(),
    removeTokenExpiration(),
  ]);
}

export async function tokenHasExpired(): Promise<boolean> {
  const tokenExpiration = await getTokenExpiration();
  if (tokenExpiration) {
    return Date.now() > tokenExpiration - 2000;
  } else {
    return true;
  }
}

export function isAuthenticated(): boolean {
  return getAccessToken() !== null;
}

//Facebook
export async function registerWithFacebook({ accessToken, viewer }) {
  const { data } = await client.mutate({
    mutation: REGISTER_WITH_FACEBOOK,
    variables: {
      facebookToken: accessToken,
      viewer,
    },
  });
  setTokens(data.registrationResult);
  return data.registrationResult;
}

export async function authenticateWithFacebook({ accessToken }) {
  const { data } = await client.mutate({
    mutation: AUTHENTICATE_WITH_FACEBOOK,
    variables: {
      facebookToken: accessToken,
    },
  });
  setTokens(data.authenticationResult);
  return data.authenticationResult;
}

//Phone
export async function registerWithPhoneCode({ phoneNumber, code, viewer }) {
  const { data } = await client.mutate({
    mutation: REGISTER_WITH_PHONE_CODE,
    variables: {
      phoneNumber,
      code,
      viewer,
    },
  });
  setTokens(data.registrationResult);
  return data.registrationResult;
}

export async function requestPhoneCode({ phoneNumber }) {
  const { data } = await client.mutate({
    mutation: REQUEST_PHONE_AUTH_CODE,
    variables: {
      phoneNumber,
    },
  });
  return data;
}

export async function authenticateWithPhoneCode({ phoneNumber, code }) {
  const { data } = await client.mutate({
    mutation: AUTHENTICATE_WITH_PHONE_CODE,
    variables: {
      phoneNumber,
      code,
    },
  });
  setTokens(data.authenticationResult);
  return data.authenticationResult;
}

//Email
export async function requestEmailCode({ email }) {
  const { data } = await client.mutate({
    mutation: REQUEST_EMAIL_AUTH_CODE,
    variables: {
      email,
    },
  });
  return data;
}

export async function registerWithEmail({ email, code, viewer }) {
  const { data } = await client.mutate({
    mutation: REGISTER_WITH_EMAIL_CODE,
    variables: {
      email,
      code,
      viewer,
    },
  });
  setTokens(data.registrationResult);
  return data.registrationResult;
}

export async function authenticateWithEmail({ email, code }) {
  const { data } = await client.mutate({
    mutation: AUTHENTICATE_WITH_EMAIL_CODE,
    variables: {
      email,
      code,
    },
  });
  setTokens(data.authenticationResult);
  return data.authenticationResult;
}

//Google
export async function authenticateWithGoogle({ accessToken }) {
  const { data } = await client.mutate({
    mutation: AUTHENTICATE_WITH_GOOGLE,
    variables: {
      googleToken: accessToken,
    },
  });
  setTokens(data.authenticationResult);
  return data.authenticationResult;
}

export async function registerWithGoogle({ accessToken, name, viewer }) {
  const { data } = await client.mutate({
    mutation: REGISTER_WITH_GOOGLE,
    variables: {
      googleToken: accessToken,
      name,
      viewer,
    },
  });
  setTokens(data.registrationResult);
  return data.registrationResult;
}
export type Token = {
  value: string;
  expiresIn?: number;
};
