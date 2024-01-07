import React from "react";
import styled from "styled-components";
import ButtonLink from "../../components/Button";
import ContentComponent from "../../components/Content";
// import BackgroundImage from "gatsby-background-image";
import { useStaticQuery, graphql } from "gatsby";
import { useTranslation } from "react-i18next";
import { GatsbyImage } from "gatsby-plugin-image";

const Section = styled.div`
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

const Content = styled(ContentComponent)`
  width: 100%;
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    background: linear-gradient(180deg, rgba(9, 18, 34, 0) 0%, #091222 100%);
    height: 70%;
    width: 100%;
  }
  @media (min-width: 960px) {
    &::after {
      height: 100%;
      width: 60%;
      background: linear-gradient(-90deg, rgba(9, 18, 34, 0) 0%, #091222 100%);
    }
  }
`;

const query = graphql`{
  image: file(name: {eq: "bg"}, relativeDirectory: {eq: "movie"}) {
    childImageSharp {
      gatsbyImageData(quality: 85, layout: FULL_WIDTH)
    }
  }
}`;

const Movie: React.FC = () => {
  const { t } = useTranslation();
  const { image } = useStaticQuery(query);

  return (
    <Section>
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
