import React from "react";
import styled from "styled-components";
import ButtonLink from "../../components/Button";
import Content from "../../components/Content";
import { useStaticQuery, graphql } from "gatsby";
import { useTranslation } from "react-i18next";
import { GatsbyImage } from "gatsby-plugin-image";

const Section = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  min-height: 741px;
  padding: 2rem 1rem;
  box-sizing: border-box;
  background-position: 57% 0%;
  @media (min-width: 960px) {
    padding: 2rem 2rem;
    align-items: center;
  }
`;

const Button = styled(ButtonLink).attrs({
  as: "button",
})`
  margin-top: 2rem;
  padding: 1.4rem 0;
  font-size: 0.85rem;
`;

const Article = styled.article`
  position: relative;
  text-align: center;
  padding: 0rem;
  box-sizing: border-box;
  z-index: 2;

  h3 {
    color: var(--altHeading);
    @media (max-width: 380px) {
      font-size: 8vw;
    }
  }
  p {
    color: var(--altP);
  }
  @media (min-width: 960px) {
    max-width: 425px;
    text-align: left;
    a {
      margin-top: 2rem;
    }
  }
`;

const BackgroundImage = styled(GatsbyImage)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;


const query = graphql`{
  image: file(name: {eq: "bg"}, relativeDirectory: {eq: "movie"}) {
    childImageSharp {
      gatsbyImageData(quality: 100, layout: FULL_WIDTH)
    }
  }
}`;

const Movie: React.FC = () => {
  const { t } = useTranslation();
  const { image } = useStaticQuery(query);

  return (
    <Section>
      <BackgroundImage alt="" image={image.childImageSharp.gatsbyImageData} />
      <Content>
        <Article>
          <h3>{t("movie.title")}</h3>
          <p>{t("movie.content")}</p>
          {/* @ts-ignore */}
          <Button
            onClick={() => {
              document.getElementById(t("movie.scrollInto")).scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            {t("movie.button")}
          </Button>
        </Article>
      </Content>
    </Section>
  );
};

export default Movie;
