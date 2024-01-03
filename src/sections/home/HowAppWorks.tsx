import React from "react";
import styled from "styled-components";
import ButtonLink from "../../components/Button";
import { useStaticQuery, graphql } from "gatsby";
import Image from "gatsby-image";
import { withTranslation, WithTranslation } from "react-i18next";
import { analytics } from "../../analytics";
import { domainRef } from "../../i18n";

const Section = styled.section`
  padding-bottom: 1rem;
  background: #fff;
  article:nth-child(odd) {
    flex-direction: row-reverse;
    .gatsby-image-wrapper {
      right: -70px;
      width: 100%;
      margin-left: auto;
      @media (min-width: 960px) {
        right: 0;
        margin-left: initial;
      }
    }
  }
  article:nth-child(even) {
    flex-direction: row;
  }
  article:last-child {
    .gatsby-image-wrapper {
      left: -60px;
      width: 110%;
      max-width: 1050px;
      @media (min-width: 800px) {
        left: 0;
        width: 100%;
      }
    }
    @media (min-width: 960px) {
      article {
        max-width: 407px;
        margin-left: -150px;
      }
    }
  }
  @media (min-width: 960px) {
    padding-bottom: 200px;
  }
`;
const Heading = styled.h2`
  text-align: center;
  margin: 0 0 1rem;
  padding: 1rem 1rem 0;
  @media (max-width: 380px) {
    font-size: 8vw;
  }
`;
const CancelAnytime = styled.span`
  font-weight: 900;
  color: #575757;
  font-size: 0.75rem;
  text-align: Center;
  margin-top: 5px;
`;
const Button = styled(ButtonLink)`
  position: relative;
`;
const Article = styled.article`
  display: block;
  position: relative;
  margin: 4rem 0;
  @media (min-width: 960px) {
    display: flex;
    margin: 4rem 0;
    align-items: center;
  }
  @media (min-width: 1400px) {
    margin: -3rem 0;
  }
`;
const Img = styled(Image)`
  max-width: 800px;
  flex-grow: 1;
  position: relative;
  width: 80%;
  right: 0;
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 290px;
  margin: 2rem auto 0;
`;
const InfoContainer = styled.article`
  text-align: center;
  padding: 0 1rem;
  box-sizing: border-box;
  h3 {
    text-align: center;
    @media (max-width: 380px) {
      font-size: 8vw;
    }
  }
  @media (min-width: 960px) {
    max-width: 391px;
    text-align: left;
    margin: 0 7rem;
    a {
      margin-top: 2rem;
    }
  }
`;
const query = graphql`
  query {
    download: file(
      name: { eq: "download" }
      relativeDirectory: { eq: "howAppWorks" }
    ) {
      childImageSharp {
        fluid(quality: 85) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    downloadMobile: file(
      name: { eq: "downloadMobile" }
      relativeDirectory: { eq: "howAppWorks" }
    ) {
      childImageSharp {
        fluid(quality: 85) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    search: file(
      name: { eq: "search" }
      relativeDirectory: { eq: "howAppWorks" }
    ) {
      childImageSharp {
        fluid(quality: 85) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    searchMobile: file(
      name: { eq: "searchMobile" }
      relativeDirectory: { eq: "howAppWorks" }
    ) {
      childImageSharp {
        fluid(quality: 85) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    listen: file(
      name: { eq: "listen" }
      relativeDirectory: { eq: "howAppWorks" }
    ) {
      childImageSharp {
        fluid(quality: 85) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    listenMobile: file(
      name: { eq: "listenMobile" }
      relativeDirectory: { eq: "howAppWorks" }
    ) {
      childImageSharp {
        fluid(quality: 85) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

const sourceArr = (desktop, mobile) => [
  mobile.childImageSharp.fluid,
  {
    ...desktop.childImageSharp.fluid,
    media: `(min-width: 500px)`,
  },
];

const trackButton = (): void => {
  analytics.track("Lead", {
    reason: "Subscription Button from HowAppWorks section",
  });
};

const HowWorks: React.FC<WithTranslation> = ({ t, i18n }) => {
  const {
    download,
    downloadMobile,
    search,
    searchMobile,
    listen,
    listenMobile,
  } = useStaticQuery(query);

  const paymentOnWebsite: boolean = Object.values(domainRef).find(
    e => e.lang === i18n.language
  ).paymentOnWebsite;

  return (
    <Section id="HowAppWorks">
      <Heading>{t("howAppWorks.title")}</Heading>
      <Article>
        <Img
          loading={"eager"}
          draggable={false}
          fluid={sourceArr(download, downloadMobile)}
          alt={t("howAppWorks.info.alt")}
        />
        <InfoContainer>
          <h3>{t("howAppWorks.info.title")}</h3>
          <p>{t("howAppWorks.info.content")}</p>
          <ButtonContainer>
            <Button to={t("howAppWorks.to")} onClick={trackButton}>
              {t("howAppWorks.info.button")}
            </Button>
            {paymentOnWebsite && (
              <CancelAnytime>{t("howAppWorks.info.binding")}</CancelAnytime>
            )}
          </ButtonContainer>
        </InfoContainer>
      </Article>
      <Article>
        <Img
          loading={"eager"}
          draggable={false}
          fluid={sourceArr(search, searchMobile)}
          alt={t("howAppWorks.info2.alt")}
        />
        <InfoContainer>
          <h3>{t("howAppWorks.info2.title")}</h3>
          <p>{t("howAppWorks.info2.content")}</p>
          <ButtonContainer>
            <Button to={t("howAppWorks.to")} onClick={trackButton}>
              {t("howAppWorks.info2.button")}
            </Button>
            {paymentOnWebsite && (
              <CancelAnytime>{t("howAppWorks.info2.binding")}</CancelAnytime>
            )}
          </ButtonContainer>
        </InfoContainer>
      </Article>
      <Article>
        <Img
          loading={"eager"}
          draggable={false}
          alt={t("howAppWorks.info3.alt")}
          fluid={sourceArr(listen, listenMobile)}
        />
        <InfoContainer>
          <h3>{t("howAppWorks.info3.title")}</h3>
          <p>{t("howAppWorks.info3.content")}</p>
          <ButtonContainer>
            <Button to={t("howAppWorks.to")} onClick={trackButton}>
              {t("howAppWorks.info3.button")}
            </Button>
            {paymentOnWebsite && (
              <CancelAnytime>{t("howAppWorks.info3.binding")}</CancelAnytime>
            )}
          </ButtonContainer>
        </InfoContainer>
      </Article>
    </Section>
  );
};

export default withTranslation()(HowWorks);
