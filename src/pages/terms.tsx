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
const Terms: React.FC<WithTranslation> = ({ t, i18n }) => {
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
            <h4>{t("1.heading")}</h4>
            <p>
              {t("1.p1", {
                CVR: t("info:cvr"),
                address: `${t("info:address.street")}, ${t(
                  "info:address.city"
                )}`,
              })}{" "}
            </p>
            <p>{t("1.p2")}</p>
            <p>{t("1.p3")} </p>
            <h4>{t("2.heading")}</h4>
            <p>{t("2.p1")} </p>
            <p>{t("2.p2")}</p>
            <ol>
              {/*@ts-ignore*/}
              {t<Array<string>>("2.list", i18nArrOptions).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ol>
            <p>{t("2.p3")}</p>
            <h4>{t("3.heading")}</h4>
            <p>{t("3.p1")} </p>
            <p>{t("3.p2")} </p>
            <h4>{t("4.heading")} </h4>
            <p>{t("4.p1")} </p>
            <ol>
              {/*@ts-ignore*/}
              {t<Array<string>>("4.list", i18nArrOptions).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ol>
            <h4>{t("4-1.heading")}</h4>
            <p>{t("4-1.p1")}</p>
            <ol>
              {/*@ts-ignore*/}
              {t<Array<string>>("4-1.list", i18nArrOptions).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ol>
            <h4>{t("4-2.heading")}</h4>
            <p>{t("4-2.p1")}</p>
            <p>{t("4-2.p2")}</p>
            <ol>
              {/*@ts-ignore*/}
              {t<Array<string>>("4-2.list", i18nArrOptions).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
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
            <p>
              {t("4-8.p1")} &nbsp;<em>{t("4-8.email")}. &nbsp;</em>
              {t("4-8.p2")} &nbsp;
              <a href={t("4-8.link.href")}>{t("4-8.link.content")}</a>.
            </p>
            <h4>{t("5.heading")}</h4>
            <p>{t("5.p1")}</p>
            <p>
              {t("5.email")}&nbsp;
              <a href={"mailto:" + t("info:email")}>{t("info:email")}</a>
              <br />
              {t("5.tlf")}
              {t("info:phone.content")}
            </p>

            <p>
              {t("5.aps")}
              <br />
              {t("5.att")}
              <br />
              {t("info:address.street")}
              <br />
              {t("info:address.city")}
              <br />
              {t("info:cvr")}
            </p>
          </Article>
        </ContentContainer>
      </Layout>
    </>
  );
};

export default withTranslation(["terms", "info"])(Terms);
