import React from "react";
import styled from "styled-components";
import { useStaticQuery, graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { useTranslation } from "react-i18next";
const Section = styled.section`
  padding: 150px 1rem;
  box-sizing: Border-box;
  max-width: 1750px;
  margin: 0 auto;
  @media (min-width: 960px) {
    padding: 200px 1rem 100px;
  }
`;

const Heading = styled.h2`
  text-align: Center;
  font-size: 1.75rem;
  margin-bottom: 2rem;
`;

const Video = styled.div`
  position: relative;
  display: block;
  margin: 0 auto;
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

const Article = styled.article`
  margin: 50px auto 0;
  @media (min-width: 960px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1200px;
  }
`;
const ImagesContainer = styled.aside`
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
`;
const InfoContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const ImageContainer = styled.div`
  width: 70%;
  margin: 1rem auto;

  @media (min-width: 600px) {
    width: 100%;
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const InfoHeading = styled.h3`
  font-size: 8vw;
  margin-top: 100px;
  text-align: center;

  @media (min-width: 400px) {
    font-size: 1.75rem;
  }
  @media (min-width: 960px) {
    margin-top: 0;
    text-align: left;
  }
`;

export const SERVICES_QUERY = graphql`{
  cfu: file(relativePath: {eq: "partners/cfu-logo.png"}) {
    data: childImageSharp {
      gatsbyImageData(quality: 85, layout: FULL_WIDTH)
    }
  }
  fc: file(relativePath: {eq: "partners/film-centralen-logo.png"}) {
    data: childImageSharp {
      gatsbyImageData(quality: 85, layout: FULL_WIDTH)
    }
  }
  vitec: file(relativePath: {eq: "partners/vitec.jpg"}) {
    data: childImageSharp {
      gatsbyImageData(quality: 85, layout: FULL_WIDTH)
    }
  }
  urplay: file(relativePath: {eq: "partners/urplay.jpg"}) {
    data: childImageSharp {
      gatsbyImageData(quality: 85, layout: FULL_WIDTH)
    }
  }
  filmochskola: file(relativePath: {eq: "partners/film-och-skola.jpg"}) {
    data: childImageSharp {
      gatsbyImageData(quality: 85, layout: FULL_WIDTH)
    }
  }
}`;
type Service = {
  logo: string;
  alt: string;
  maxWidth: string;
};
type StringArray = string | TemplateStringsArray;
type ServicesArray = string | TemplateStringsArray;

const VideoSection: React.FC = () => {
  const services = useStaticQuery(SERVICES_QUERY);
  const { t } = useTranslation("schools");
  const localServices = t<ServicesArray>("videoSection.services", {
    returnObjects: true,
  });
  const textContent = t<StringArray>("videoSection.info.p", {
    returnObjects: true,
  });

  return (
    <Section>
      <Heading>{t("videoSection.heading")}</Heading>
      <Video>
        <iframe
          src={t("videoSection.videoUrl")}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen={true}
        />
      </Video>

      <Article>
        <ImagesContainer>
          {Array.isArray(localServices) &&
            localServices.map(({ logo, alt, maxWidth }: Service, i: number) => (
              <ImageContainer style={{ maxWidth }} key={i}>
                <GatsbyImage alt={alt} key={logo} loading={"eager"} {...services[logo].data} />
              </ImageContainer>
            ))}
        </ImagesContainer>
        <InfoContainer>
          <InfoHeading>{t("videoSection.info.heading")}</InfoHeading>
          {Array.isArray(textContent) &&
            textContent.map((txt, i) => <p key={i}>{txt}</p>)}
        </InfoContainer>
      </Article>
    </Section>
  );
};

export default VideoSection;
