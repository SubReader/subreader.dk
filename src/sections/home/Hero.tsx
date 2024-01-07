import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { useStaticQuery, graphql } from "gatsby";
import ButtonLink from "../../components/Button";
import PlayButton from "../../assets/icons/PlayButton/index";
import { GatsbyImage } from "gatsby-plugin-image";
import VideoModal from "../../components/VideoModal";
import { analytics } from "../../analytics";
import { withTranslation, WithTranslation } from "react-i18next";
const GlobalStyle = createGlobalStyle`
  header{
    background:transparent !important;
  }
  #open-icon{
    fill:#000;
  }
`;

const HeroContainer = styled.section`
  height: 821px;
  position: relative;
  background: #091222;
  padding: 0;
  &::after {
    content: "";
    position: absolute;
    bottom: 150px;
    left: 0;
    z-index: 1;
    background: linear-gradient(180deg, rgba(9, 18, 34, 0) 0%, #091222 100%);
    height: 60%;
    width: 100%;
  }

  @media (min-width: 960px) {
    height: 910px;
    padding-top: 100px;
    &::after {
      display: none;
    }
  }
  .ReactModal__Overlay--after-open {
    opacity: 1;
  }

  .ReactModal__Overlay--before-close {
    opacity: 0;
  }
`;

const Button = styled(ButtonLink).attrs({
  as: "button",
})`
  padding: 1.35rem 0;
  font-size: 0.95rem;
`;

const HeroHeading = styled.h1`
  color: var(--altHeading);
  margin: 60px 0 0 0;
  @media (max-width: 380px) {
    font-size: 10.5vw;
  }
  @media (min-width: 960px) {
    font-size: 4vw;
  }
  @media (min-width: 1500px) {
    font-size: 4.5rem;
  }
`;

const ContentContainer = styled.article`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  bottom: 230px;
  width: 80%;
  z-index: 2;

  img {
    margin: 0;
  }

  & > a:last-child {
    margin-top: 28px;
  }
  @media (min-width: 960px) {
    text-align: left;
    flex: 1;
    position: static;
    transform: none;
    max-width: 800px;
    margin-right: auto;
  }
`;

const Info = styled.button`
  margin: 1.75rem auto;
  font-size: 1rem;
  font-family: Lato, -apple-system, Arial, Helvetica, sans-serif;
  padding-right: 5px;
  color: #fff;
  justify-content: center;
  display: flex;
  background: none;
  border: none;
  cursor: pointer;
  align-items: center;
  white-space: pre;
  width: max-content;

  svg {
    margin-right: 6px;
  }
  @media (min-width: 960px) {
    justify-content: left;
    margin: 4rem 0 3rem;
  }
`;

const HeroImage = styled(GatsbyImage)`
  height: 650px;
  img {
    object-position: top !important;
  }

  @media (min-width: 960px) {
    width: 100%;
    height: 100%;
  }
  @media (min-width: 1550px) {
    width: 1200px;
  }
`;

const HeroContent = styled.div`
  max-width: 1800px;
  margin: 0 auto;
  height: 100%;
  @media (min-width: 960px) {
    padding: 0 2rem;
    display: flex;
    position: relative;
    align-items: center;
    flex-direction: row-reverse;
  }
`;

const HeroImageContainer = styled.aside`
  flex-grow: 1;
  flex: 1;

  @media (min-width: 1550px) {
    position: absolute;
    bottom: -280px;
    min-height: 1165px;
  }
`;

export const DesktopImageFragment = graphql`fragment DesktopImageSharp on File {
  childImageSharp {
    gatsbyImageData(quality: 75, layout: FULL_WIDTH)
  }
}`;
export const LaptopImageFragment = graphql`fragment LaptopImageSharp on File {
  childImageSharp {
    gatsbyImageData(quality: 10, width: 750, layout: CONSTRAINED)
  }
}`;
const query = graphql`{
  mobile: file(name: {eq: "posterMobile"}) {
    childImageSharp {
      gatsbyImageData(quality: 85, layout: FULL_WIDTH)
    }
  }
  tablet: file(name: {eq: "posterTablet"}) {
    childImageSharp {
      gatsbyImageData(quality: 85, layout: FULL_WIDTH)
    }
  }
  laptop_da: file(name: {eq: "posterDesktop_da"}) {
    ...LaptopImageSharp
  }
  laptop_nl: file(name: {eq: "posterDesktop_nl"}) {
    ...LaptopImageSharp
  }
  desktop_da: file(name: {eq: "posterDesktop_da"}) {
    ...DesktopImageSharp
  }
  desktop_nl: file(name: {eq: "posterDesktop_nl"}) {
    ...DesktopImageSharp
  }
}`;

const Hero: React.FC<WithTranslation> = ({ t, i18n }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const imagesData = useStaticQuery(query);
  const { mobile, tablet } = imagesData;
  // const sources = [
  //   mobile.childImageSharp.gatsbyImageData,
  //   {
  //     ...(imagesData[`desktop_${i18n.language}`]?.childImageSharp?.gatsbyImageData ||
  //       imagesData["desktop_da"].childImageSharp.gatsbyImageData),
  //     media: `(min-width: 1530px)`,
  //   },
  //   {
  //     ...(imagesData[`laptop_${i18n.language}`]?.childImageSharp?.gatsbyImageData ||
  //       imagesData["laptop_da"].childImageSharp.gatsbyImageData),
  //     media: `(min-width: 950px)`,
  //   },
  //   {
  //     ...tablet.childImageSharp.gatsbyImageData,
  //     media: `(min-width: 500px)`,
  //   },
  // ];

  console.log(imagesData);


  return (
    <HeroContainer>
      <GlobalStyle />
      <HeroContent>
        <HeroImageContainer>
          <HeroImage
            // loading={"eager"}
            image={imagesData.desktop_da.childImageSharp.gatsbyImageData}
            alt={t("hero.alt")}
          />
        </HeroImageContainer>
        <ContentContainer>
          <HeroHeading>{t("hero.title")}</HeroHeading>
          <Info
            onClick={() => {
              analytics.track("Movie About SubReader", {
                reason: `Clicked on watch movie about SubReader button`,
              });
              setIsModalOpen(true);
            }}
          >
            <PlayButton />
            {t("hero.movie-btn")}
          </Info>
          {/* @ts-ignore */}
          <Button
            onClick={() => {
              document.getElementById("HowAppWorks").scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            {t("hero.button")}
          </Button>
          <VideoModal
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
            src="https://www.youtube.com/embed/PyBERTWQFKU"
          />
        </ContentContainer>
      </HeroContent>
    </HeroContainer>
  );
};

export default withTranslation()(Hero);
