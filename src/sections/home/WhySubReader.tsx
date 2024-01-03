import React from "react";
import styled, { css } from "styled-components";
import Content from "../../components/Content";
import camillaSrc from "../../images/testimonials/camilla.jpg";
import { Quote, Phone, Tv, Ticket } from "../../assets/icons";
import ImageContainer from "../../components/ImageContainer";
import { useTranslation } from "react-i18next";
const Section = styled.section`
  min-height: 734px;
  padding: 4rem 1rem;
  background: #dae7f1;
  box-sizing: border-box;
  & > div {
    width: 100%;
  }
  @media (min-width: 960px) {
    padding: 4rem 2rem;

    & > div {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
`;

const imageCss = css`
  position: relative;
  height: 65px;
  width: 65px;
  margin: 2rem auto;
  &,
  img {
    border-radius: 50%;
  }

  svg {
    position: absolute;
    left: -12%;
    top: -12%;
    width: 35px;
    height: 35px;
  }
  @media (min-width: 960px) {
    flex-shrink: 0;
    margin: 0;
  }
`;

const Article = styled.article`
  text-align: center;
  & > h2 {
    font-size: 2rem;
    margin: 0;
    text-align: center;
  }
  & > p {
    max-width: 500px;
    margin: 1rem auto;
  }
  @media (min-width: 960px) {
    h2 {
      text-align: left;
    }
    & > p {
      text-align: left;
      margin: 20px 0 0 0;
    }
  }
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: minmax(280px, 319px);
  grid-auto-rows: 334px;
  place-content: center;
  row-gap: 20px;
  margin-top: 5rem;
  li {
    padding: 50px 39px 2rem 50px;
    box-sizing: border-box;
    width: 100%;
    background: #fff;
    box-shadow: 0px 9px 13px 1px rgba(0, 0, 0, 0.09);
    border-radius: 7px;
    display: flex;
    flex-direction: column;
    svg {
      width: 64px;
      height: 64px;
      flex-shrink: 0;
      margin-bottom: auto;
    }
    h3 {
      font-size: 1.25rem;
      margin: 0;
    }
    p {
      font-size: 0.875rem;
      margin-bottom: 0;
    }
  }

  @media (min-width: 960px) {
    column-gap: 2rem;
    row-gap: 2rem;
    margin-top: -200px;
    position: relative;
    z-index: 5;
    grid-template-columns: repeat(2, minmax(280px, 319px));
    li:nth-child(2) {
      grid-row: 1/3;
      max-height: 334px;
      place-self: center;
      height: 100%;
      grid-column: 2;
    }
  }
`;

const Testimonial = styled.article`
  & > div {
    margin-bottom: 0.5rem;
  }
  & > span {
    color: #8b93a2;
    font-size: 1rem;
    margin-bottom: 5rem;
    font-weight: 700;
    span {
      display: block;
      color: var(--blue);
      font-size: 0.75rem;
    }
  }
  p {
    font-style: italic;
    letter-spacing: 0.02em;
    max-width: 280px;
    margin: 1rem auto;
  }

  @media (min-width: 960px) {
    text-align: left;
    & > div {
      margin-top: 29px;
      display: flex;
      & > div:first-child {
        margin-right: 20px;
      }
      p {
        max-width: 365px;
        margin: 0;
      }
    }
    & span {
      margin-left: 85px;
    }
  }
`;

const WhySubReader: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Section>
      <Content>
        <Article>
          <h2>{t("whySubReader.testimonial.title")}</h2>
          <p>{t("whySubReader.testimonial.content")}</p>

          <Testimonial>
            <div>
              <ImageContainer
                alt="Billed af Camilla"
                style={imageCss}
                src={camillaSrc}
              >
                <Quote />
              </ImageContainer>
              <p>{t("whySubReader.testimonial.review")}</p>
            </div>
            <span>
              {t("whySubReader.testimonial.author")}
              <span>{t("whySubReader.testimonial.authorSubtitle")}</span>
            </span>
          </Testimonial>
        </Article>

        <FeatureList>
          <li>
            <Phone />
            <h3>{t("whySubReader.feature.title")}</h3>
            <p>{t("whySubReader.feature.content")} </p>
          </li>
          <li>
            <Tv />
            <h3>{t("whySubReader.feature2.title")} </h3>
            <p>{t("whySubReader.feature2.content")} </p>
          </li>
          <li>
            <Ticket />
            <h3>{t("whySubReader.feature3.title")} </h3>
            <p>{t("whySubReader.feature3.content")}</p>
          </li>
        </FeatureList>
      </Content>
    </Section>
  );
};

export default WhySubReader;
