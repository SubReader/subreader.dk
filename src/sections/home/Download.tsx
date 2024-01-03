import React from "react";
import styled from "styled-components";
import { useStaticQuery, graphql } from "gatsby";
import Image from "gatsby-image";
import DownloadButton from "../../components/DownloadButton";
import { withTranslation, WithTranslation } from "react-i18next";

const Section = styled.section`
  min-height: 509px;
  background: var(--blueGradient);
  position: relative;
  display: flex;
`;

const Article = styled.article`
  max-width: 1750px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 1rem;

  p {
    max-width: 340px;
    width: 95%;
    color: var(--altP);
  }
  @media (min-width: 960px) {
    flex-direction: row;
    align-items: center;
    padding: 0 0 0 2rem;
    & > article {
      margin-right: 2rem;
    }
  }
  @media (min-width: 1350px) {
    padding: 0 2rem;
    & > article {
      margin-right: 5rem;
    }
  }
`;

const Img = styled(Image)`
  height: 100%;
  width: 100%;
`;

const Heading = styled.h2`
  padding-top: 80px;
  color: var(--altHeading);
  font-size: 1.6875rem;
  max-width: 340px;
  font-size: 1.6875rem;
  @media (min-width: 960px) {
    font-size: 2.5rem;
    max-width: 420px;
    padding-top: 0px;
  }
`;

const Container = styled.aside`
  right: 0;
  width: 130px;
  position: absolute !important;
  bottom: 0;
  @media (max-width: 960px) {
    & > div > div {
      padding-bottom: 238.462% !important;
    }
  }

  @media (min-width: 960px) {
    height: 100%;
    padding-bottom: initial;
    flex-grow: 0;
    flex: 1;
    position: static !important;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 92%;
  @media (min-width: 960px) {
    width: 100%;
  }
`;

const query = graphql`
  query {
    mobileImage: file(
      name: { eq: "phonesMobile" }
      relativeDirectory: { eq: "download" }
    ) {
      childImageSharp {
        fluid(quality: 85) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    desktopImage: file(
      name: { eq: "phones" }
      relativeDirectory: { eq: "download" }
    ) {
      childImageSharp {
        fluid(quality: 85) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;
const Download: React.FC<WithTranslation> = ({ t }) => {
  const data = useStaticQuery(query);
  const sources = [
    data.mobileImage.childImageSharp.fluid,
    {
      ...data.desktopImage.childImageSharp.fluid,
      media: `(min-width: 960px)`,
    },
  ];

  return (
    <Section id="Download">
      <Article>
        <article>
          <Heading>{t("download.title")}</Heading>
          <p>{t("download.content")}</p>
          <ButtonContainer>
            <DownloadButton apple />
            <DownloadButton />
          </ButtonContainer>
        </article>
        <Container>
          <Img loading={"eager"} fluid={sources} alt={t("download.alt")} />
        </Container>
      </Article>
    </Section>
  );
};

export default withTranslation()(Download);
