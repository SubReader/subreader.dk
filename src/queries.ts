import { gql } from "@apollo/client";
export const REGISTRATION_FRAGMENT = gql`
  fragment RegistrationFragment on RegistrationResult {
    accessToken {
      expiresIn
      value
    }
    refreshToken {
      value
    }
  }
`;

export const CANCEL_SUBSCRIPTION = gql`
  mutation CancelSubscription($id: ID!) {
    cancelSubscription(id: $id) {
      id
    }
  }
`;

export const REFRESH_ACCESSTOKEN = gql`
  mutation RefreshAccessToken($refreshToken: String!) {
    refreshAccessToken(refreshToken: $refreshToken) {
      accessToken {
        value
        expiresIn
      }
    }
  }
`;

export const AUTHENTICATION_FRAGMENT = gql`
  fragment AuthenticationFragment on AuthenticationResult {
    accessToken {
      expiresIn
      value
    }
    refreshToken {
      value
    }
  }
`;

export const REQUEST_PHONE_AUTH_CODE = gql`
  mutation RequestPhoneAuthCode($phoneNumber: String!) {
    requestPhoneCode(phoneNumber: $phoneNumber)
  }
`;

export const UPDATE_VIEWER_FRAGMENT = gql`
  fragment UpdateViewerFragment on User {
    name
  }
`;

export const REQUEST_EMAIL_AUTH_CODE = gql`
  mutation RequestEmailAuthCode($email: String!) {
    requestEmailCode(email: $email)
  }
`;

export const ANALYTICS_FRAGMENT = gql`
  fragment AnalyticsFragment on User {
    id
    name
    country
    language
    logins {
      __typename
      ... on EmailLogin {
        email
      }
      ... on PhoneLogin {
        phoneNumber
      }
      ... on GoogleLogin {
        googleId
      }
      ... on FacebookLogin {
        facebookId
      }
      ... on AppleLogin {
        userID
      }
    }
  }
`;

export const AUTHENTICATE_WITH_EMAIL_CODE = gql`
  mutation AuthenticateWithEmailCode($email: String!, $code: String!) {
    authenticationResult: authenticateWithEmailCode(
      email: $email
      code: $code
    ) {
      ...AuthenticationFragment
      user {
        ...AnalyticsFragment
      }
    }
  }
  ${AUTHENTICATION_FRAGMENT}
  ${ANALYTICS_FRAGMENT}
`;

export const REGISTER_WITH_EMAIL_CODE = gql`
  mutation RegisterWithEmailCode(
    $email: String!
    $code: String!
    $viewer: ViewerInput
  ) {
    registrationResult: registerWithEmailCode(
      email: $email
      code: $code
      viewer: $viewer
    ) {
      ...RegistrationFragment
      user {
        ...UpdateViewerFragment
        ...AnalyticsFragment
      }
    }
  }
  ${REGISTRATION_FRAGMENT}
  ${UPDATE_VIEWER_FRAGMENT}
  ${ANALYTICS_FRAGMENT}
`;

export const AUTHENTICATE_WITH_PHONE_CODE = gql`
  mutation AuthenticateWithPhoneCode($phoneNumber: String!, $code: String!) {
    authenticationResult: authenticateWithPhoneCode(
      phoneNumber: $phoneNumber
      code: $code
    ) {
      ...AuthenticationFragment
      user {
        ...AnalyticsFragment
      }
    }
  }
  ${AUTHENTICATION_FRAGMENT}
  ${ANALYTICS_FRAGMENT}
`;

export const VIEWER = gql`
  query {
    viewer {
      name
    }
  }
`;

export const REGISTER_WITH_PHONE_CODE = gql`
  mutation RegisterWithPhoneCode(
    $phoneNumber: String!
    $code: String!
    $viewer: ViewerInput
  ) {
    registrationResult: registerWithPhoneCode(
      phoneNumber: $phoneNumber
      code: $code
      viewer: $viewer
    ) {
      ...RegistrationFragment
      user {
        ...UpdateViewerFragment
        ...AnalyticsFragment
      }
    }
  }
  ${REGISTRATION_FRAGMENT}
  ${UPDATE_VIEWER_FRAGMENT}
  ${ANALYTICS_FRAGMENT}
`;

export const AUTHENTICATE_WITH_FACEBOOK = gql`
  mutation AuthenticateWithFacebook($facebookToken: String!) {
    authenticationResult: authenticateWithFacebook(
      facebookToken: $facebookToken
    ) {
      ...AuthenticationFragment
      user {
        ...AnalyticsFragment
      }
    }
  }
  ${AUTHENTICATION_FRAGMENT}
  ${ANALYTICS_FRAGMENT}
`;

export const REGISTER_WITH_FACEBOOK = gql`
  mutation RegisterWithFacebook($facebookToken: String!, $viewer: ViewerInput) {
    registrationResult: registerWithFacebook(
      facebookToken: $facebookToken
      viewer: $viewer
    ) {
      ...RegistrationFragment
      user {
        ...UpdateViewerFragment
        ...AnalyticsFragment
      }
    }
  }
  ${REGISTRATION_FRAGMENT}
  ${UPDATE_VIEWER_FRAGMENT}
  ${ANALYTICS_FRAGMENT}
`;

export const AUTHENTICATE_WITH_GOOGLE = gql`
  mutation AuthenticateWithGoogle($googleToken: String!) {
    authenticationResult: authenticateWithGoogle(googleToken: $googleToken) {
      ...AuthenticationFragment
      user {
        ...AnalyticsFragment
      }
    }
  }
  ${AUTHENTICATION_FRAGMENT}
  ${ANALYTICS_FRAGMENT}
`;

export const REGISTER_WITH_GOOGLE = gql`
  mutation RegisterWithGoogle($googleToken: String!, $viewer: ViewerInput) {
    registrationResult: registerWithGoogle(
      googleToken: $googleToken
      viewer: $viewer
    ) {
      ...RegistrationFragment
      user {
        ...UpdateViewerFragment
        ...AnalyticsFragment
      }
    }
  }
  ${REGISTRATION_FRAGMENT}
  ${UPDATE_VIEWER_FRAGMENT}
  ${ANALYTICS_FRAGMENT}
`;

export const AUTHENTICATE_WITH_MVIDSIGNON = gql`
  mutation AuthenticateWithMVIDSignOn($sessionID: String!) {
    authenticationResult: authenticateWithMVIDSignOn(sessionID: $sessionID) {
      ...AuthenticationFragment
      user {
        ...AnalyticsFragment
      }
    }
  }
  ${AUTHENTICATION_FRAGMENT}
  ${ANALYTICS_FRAGMENT}
`;

export const REGISTER_WITH_MVIDSIGNON = gql`
  mutation RegisterWithMVIDSignOn($sessionID: String!, $viewer: ViewerInput) {
    registrationResult: registerWithMVIDSignOn(
      sessionID: $sessionID
      viewer: $viewer
    ) {
      ...RegistrationFragment
      user {
        ...UpdateViewerFragment
        ...AnalyticsFragment
      }
    }
  }
  ${REGISTRATION_FRAGMENT}
  ${UPDATE_VIEWER_FRAGMENT}
  ${ANALYTICS_FRAGMENT}
`;

export const USER_EXISTS_WITH_APPLE_LOGIN = gql`
  query UserExistsWithAppleLogin($userID: String!) {
    exists: userExistsWithAppleLogin(userID: $userID)
  }
`;

export const AUTHENTICATE_WITH_APPLE = gql`
  mutation AuthenticateWithApple($authorizationCode: String!) {
    authenticationResult: authenticateWithApple(
      authorizationCode: $authorizationCode
    ) {
      ...AuthenticationFragment
      user {
        ...AnalyticsFragment
      }
    }
  }
  ${AUTHENTICATION_FRAGMENT}
  ${ANALYTICS_FRAGMENT}
`;

export const REGISTER_WITH_APPLE = gql`
  mutation RegisterWithApple(
    $authorizationCode: String!
    $viewer: ViewerInput
  ) {
    registrationResult: registerWithApple(
      authorizationCode: $authorizationCode
      viewer: $viewer
    ) {
      ...RegistrationFragment
      user {
        ...UpdateViewerFragment
        ...AnalyticsFragment
      }
    }
  }
  ${REGISTRATION_FRAGMENT}
  ${UPDATE_VIEWER_FRAGMENT}
  ${ANALYTICS_FRAGMENT}
`;
