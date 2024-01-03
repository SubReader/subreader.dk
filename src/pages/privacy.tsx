import React from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Content from "../components/Content";
import { withTranslation, WithTranslation } from "react-i18next";
import { domainRef } from "../i18n";

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

const i18nArrOptions = {
  returnObjects: true,
  defaultValue: [],
};
type I18nArray = string | TemplateStringsArray;

const Privacy: React.FC<WithTranslation> = ({ t, i18n }) => {
  const listArray = t<I18nArray>("list", i18nArrOptions);
  const paymentOnWebsite: boolean = Object.values(domainRef).find(
    e => e.lang === i18n.language
  ).paymentOnWebsite;

  return (
    <>
      <SEO title={t("seoTitle")} />
      <Layout headerProps={{ altHeader: !paymentOnWebsite }}>
        <ContentContainer>
          <Article>
            <Heading>{t("title")}</Heading>
            <p>{t("p1")}</p>
            <ol>{}</ol>
            <h4>{t("4-2.heading")}</h4>
            <p>{t("4-2.p1")}</p>
            <p>{t("4-2.p2")}</p>
            <ol>
              {Array.isArray(listArray) &&
                listArray.map((item, i) => <li key={i}>{item}</li>)}
            </ol>
            <h4>{t("4-3.heading")}</h4>
            <p>{t("4-3.p1")}</p>
            <p>{t("4-3.p2")}</p>
            <h4>{t("4-4.heading")}</h4>
            <p>{t("4-4.p1")}</p>
            <h4>{t("4-5.heading")}</h4>
            <p>{t("4-5.p1")}</p>
            <h4>{t("4-6.heading")}</h4>
            <p>{t("4-6.p1")}</p>
            <h4>{t("4-7.heading")}</h4>
            <p>{t("4-7.p1")}</p>
            <h4>{t("4-8.heading")}</h4>
            <p>{t("4-8.p1")}</p>
          </Article>
        </ContentContainer>
      </Layout>
    </>
  );
};

export default withTranslation("privacy")(Privacy);
