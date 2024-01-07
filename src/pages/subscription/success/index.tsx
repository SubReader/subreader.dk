import React, { useCallback } from "react";
import Layout from "../../../components/Layout";
import styled, { css } from "styled-components";
import SEO from "../../../components/SEO";
import Content from "../../../components/Content";
import ProgressFlow from "../../../components/ProgressFlow";
import DownloadyButton from "../../../components/DownloadButton";
import { navigate } from "gatsby";
import { getAccessToken } from "../../../authentication";
import Lottie from "lottie-react";
import fireworksAnimation from "../../../assets/animations/fireworks.json";
import { useTranslation } from "react-i18next";
import { useQuery, gql } from "@apollo/client";
const Heading = styled.h1`
  margin-top: 3rem;
  text-align: center;
  font-size: 7vw;
  color: var(--altHeading);
  @media (min-width: 600px) {
    font-size: 2.5rem;
  }
`;

const ButtonContainer = styled.div`
  width: 60%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const Article = styled.article`
  margin: 200px auto 100px;
  padding: 0 1rem;
  p {
    text-align: center;
    max-width: 500px;
    margin: 1rem auto;
    color: var(--altP);
  }
  @media (min-width: 960px) {
    margin: 200px auto 200px;
  }
`;

const VIEWER = gql`
  query {
    user: viewer {
      logins {
        __typename
        ... on PhoneLogin {
          phoneNumber
        }
        ... on EmailLogin {
          email
        }
      }
    }
  }
`;

const AccountNotice = styled.p`
  margin-top: 50px !important;
  max-width: initial !important;
  span {
    font-weight: bold;
  }
`;

const LottieContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 100px;
  pointer-events: none;
  height: 550px;
  transform: translateX(-50%);
  z-index: 1;
  @media (min-width: 960px) {
    top: 60px;
  }
`;

const progressStyle = css`
  @media (min-width: 960px) {
    margin-bottom: -100px !important;
  }
`;

const Video = styled.div`
  position: relative;
  display: block;
  margin: 100px auto 0;
  width: 100%;
  padding-bottom: 56.25%;
  max-width: 1000px;
  z-index: 0;
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  @media (min-width: 1000px) {
    padding-bottom: 562px;
  }
`;

const inBrowser = typeof window !== "undefined";

const SuccessPage: React.FC = () => {
  if (
    (typeof window !== "undefined" && !getAccessToken()) ||
    (typeof window !== "undefined" && !window.history.state)
  ) {
    navigate("/");
    return null;
  }
  const { data } = useQuery(VIEWER);
  const state = inBrowser && window.history.state;
  const progressFlow: Boolean = state.progressFlow;
  const { t } = useTranslation("subscription");
  const loginString = useCallback(
    string => {
      switch (string) {
        case "FacebookLogin":
          return t("success.facebook");
        case "EmailLogin":
          return t("success.email", {
            email: `"${data.user.logins[0].email}"`,
          });
        case "PhoneLogin":
          return t("success.phone", {
            phoneNumber: `"${data.user.logins[0].phoneNumber}"`,
          });
        case "GoogleLogin":
          return t("success.google");
      }
    },
    [data]
  );

  return (
    <Layout headerProps={{ altHeader: true }}>
      <SEO title={t("success.seoTitle")} />
      <Content>
        {progressFlow && <ProgressFlow step={3} style={progressStyle} />}

        <Article>
          <Heading>{t("success.title")}</Heading>
          <p>{t("success.content")}</p>
          <AccountNotice>
            {t("success.accountNotice.part1")}
            <span>
              {" "}
              {data && loginString(data.user.logins[0].__typename)}
            </span>{" "}
            {t("success.accountNotice.part2")}
          </AccountNotice>
          <ButtonContainer>
            <DownloadyButton apple />
            <DownloadyButton />
          </ButtonContainer>

          <LottieContainer>
            <Lottie
              options={{
                loop: false,
                animationData: fireworksAnimation,
              }}
            />
          </LottieContainer>
          <Video>
            <iframe
              src={t("success.video-src")}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen={true}
            ></iframe>
          </Video>
        </Article>
      </Content>
    </Layout>
  );
};

export default SuccessPage;
{
}
