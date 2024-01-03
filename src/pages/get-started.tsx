import React from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Content from "../components/Content";
import { useTranslation } from "react-i18next";

const Article = styled.article`
  min-height: 100vh;
  padding: 200px 1rem 200px;
  box-sizing: Border-box;
  max-width: 1750px;
  margin: 0 auto;
  font-size: 1.25em;
  h4 {
    margin-top: 4rem;
    color: var(--primaryHeading);
  }
  ol {
    color: var(--p);
    li {
      margin: 1rem 0;
    }
  }
  @media (min-width: 500px) {
    padding: 200px 2rem 200px;
  }
`;
const Heading = styled.h2`
  margin: 2rem 0 4rem;
  font-weight: 900;
  color: var(--primaryHeading);
  font-size: 7vw;
  border-bottom: 1px #e6e7e9 solid;
  text-align: Center;
  padding-bottom: 3rem;
  @media (min-width: 500px) {
    font-size: 2.5rem;
  }
`;

const ContentContainer = styled(Content)`
  background: #fff;
  max-width: initial;
`;

const getStarted: React.FC = () => {
  const { t } = useTranslation("get-started");

  return (
    <>
      <SEO title={t("seoTitle")} />
      <Layout>
        <ContentContainer>
          <Article>
            <Heading>Kom i gang</Heading>
          </Article>
        </ContentContainer>
      </Layout>
    </>
  );
};

export default getStarted;
