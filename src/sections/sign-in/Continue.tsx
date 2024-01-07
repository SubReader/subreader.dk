import React, { useCallback, useState } from "react";
import styled, { css } from "styled-components";
import { navigate, Link } from "gatsby";
import ContinueButton from "./ContinueButton";
import EnterName from "./EnterName";
import { Email, SMS, Facebook, Google, Apple } from "../../assets/icons";
// import { GoogleLogin } from "react-google-login";
import { trackAuthentication } from "../../analytics";
import {
  authenticateWithFacebook,
  authenticateWithGoogle,
  registerWithFacebook,
  registerWithGoogle,
} from "../../authentication";
import { useTranslation } from "react-i18next";
import ProgressFlow from "../../components/ProgressFlow";

const Section = styled.section`
  padding: 190px 2rem 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  margin: 0 auto;
  & > button:first-child {
    margin: 0;
  }
  @media (min-width: 960px) {
    padding: 300px 2rem 250px;
  }
`;
/*
const Heading = styled.h2`
  color: var(--altHeading);
  text-align: center;
  font-size: 7vw;
  margin: 0 0 2rem 0;
  @media (min-width: 500px) {
    font-size: 2rem;
  }
`;
 const appleStyle = css`
  background-color: #fff;
  color: #000;
`; */
const googleStyle = css`
  background: #e2584f;
`;

const facebookStyle = css`
  background: #0057ff;
`;

const Span = styled.span`
  margin: 1rem 0 0;
  text-align: center;
  display: block;
`;

const TermsOfService = styled.span`
  text-align: center;
  display: block;
  margin-top: 5rem;
  color: rgba(255, 255, 255, 0.75);
  & > a {
    color: #fff;
    text-decoration: none;
    display: block;
  }
`;

const facebookHandler = ({ setEnterNameProps, redirect }) => {
  // @ts-ignore
  FB.login(async response => {
    if (response.status !== "connected") return;
    const accessToken = response.authResponse.accessToken;
    try {
      const authenticationResult = await authenticateWithFacebook({
        accessToken,
      });
      await trackAuthentication("facebook", authenticationResult);
      if (redirect) {
        navigate(redirect, { state: { progressFlow: true } });
      } else {
        navigate("/");
      }
    } catch (error) {
      setEnterNameProps({
        registerService: registerWithFacebook,
        accessToken,
        formData: {},
        method: "facebook",
      });
    }
  });
};

const windowExist = typeof window !== "undefined";

const Continue: React.FC = () => {
  const { t } = useTranslation("sign-in");
  const [enterNameProps, setEnterNameProps] = useState(null);
  const redirect = windowExist && window.history?.state?.redirect;
  const progressFlow = windowExist && window.history?.state?.progressFlow;

  const goto = page =>
    navigate(page, {
      state: {
        redirect,
        progressFlow,
      },
    });

  const googleHandler = useCallback(async googleUser => {
    const accessToken = googleUser.accessToken;

    try {
      const authenticationResult = await authenticateWithGoogle({
        accessToken,
      });
      await trackAuthentication("google", authenticationResult);
      if (redirect) {
        navigate(redirect, { state: { progressFlow: true } });
      } else {
        navigate("/");
      }
    } catch (error) {
      setEnterNameProps({
        registerService: registerWithGoogle,
        accessToken,
        formData: {},
        method: "google",
      });
    }
  }, []);

  if (enterNameProps)
    return (
      <>
        {progressFlow && <ProgressFlow step={1} />}
        <EnterName props={{ ...enterNameProps, redirect }} />
      </>
    );

  return (
    <>
      {progressFlow && <ProgressFlow step={1} />}
      <Section>
        {/*       <Heading>Fortsæt med følgende login muligheder</Heading>
         */}{" "}
        <ContinueButton
          Icon={SMS}
          style={css`
            background: #39dd54;
          `}
          onClick={() => goto("phone")}
        >
          {t("continue.sms")}
        </ContinueButton>
        <Span>{t("continue.divider")}</Span>
        <ContinueButton Icon={Email} onClick={() => goto("email")}>
          {t("continue.email")}
        </ContinueButton>
        <ContinueButton
          Icon={Facebook}
          style={facebookStyle}
          onClick={() => facebookHandler({ setEnterNameProps, redirect })}
        >
          {t("continue.facebook")}
        </ContinueButton>
        {/* <GoogleLogin
          clientId={process.env.GATSBY_GOOGLE_CLIENT_ID}
          onSuccess={googleHandler}
          onFailure={err => console.log(err)}
          render={renderProps => (
            <ContinueButton
              onClick={renderProps.onClick}
              style={googleStyle}
              Icon={Google}
            >
              {t("continue.google")}
            </ContinueButton>
          )}
          cookiePolicy={"single_host_origin"}
        /> */}
        {/* <ContinueButton
        style={appleStyle}
        Icon={Apple}
        onClick={() => goto("apple")}
      >
        Forsæt med Apple
      </ContinueButton> */}
        <TermsOfService>
          {t("terms.content")}
          <Link to={t("terms.href")}>{t("terms.span")}</Link>
        </TermsOfService>
      </Section>
    </>
  );
};

export default Continue;
