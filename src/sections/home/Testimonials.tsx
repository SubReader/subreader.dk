import React from "react";
import styled, { css } from "styled-components";
import { Link as GatsbyLink } from "gatsby";
import Quote from "../../assets/icons/Quote";
import ImageContainer from "../../components/ImageContainer";
import camillaSrc from "../../images/testimonials/camilla.jpg";
import christianSrc from "../../images/testimonials/christian.jpg";
import loneSrc from "../../images/testimonials/lone.jpg";
import Content from "../../components/Content";
import { useTranslation } from "react-i18next";

const Section = styled.section`
  min-height: 722px;
  background: var(--altBg);
  box-sizing: border-box;
  padding: 3rem 1rem;
  text-align: center;

  & > div {
    flex-direction: column;
    justify-content: center;
    display: flex;
    margin: 0 auto;
  }
  @media (min-width: 960px) {
    padding: 3rem 2rem;
  }
`;
const Heading = styled.h2`
  color: var(--primaryHeading);
  font-size: 1.6875rem;
  max-width: 340px;
  font-size: 1.6875rem;
  margin: 1rem auto 0;
`;

const Link = styled(GatsbyLink)`
  color: #2f84fa;
  text-decoration: none;
  margin: 0 auto 0.5rem;
  font-weight: 400;
  font-size: 0.9375rem;
  display: block;
`;
const Testimonial = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 3rem 0;
  min-height: 330px;
  p {
    max-width: 320px;
    margin: 0 auto;
  }
  & > svg {
    width: 60px;
    display: block;
    margin: 0 0 auto 0;
    height: 60px;
  }
  & > span {
    color: #8b93a2;
    font-size: 1rem;
    font-weight: 700;
    span {
      display: block;
      margin-top: 3px;
      color: var(--blue);
      font-size: 0.75rem;
    }
  }
  @media (min-width: 960px) {
    margin: 0;
  }
`;

const imageCss = css`
  height: 65px;
  width: 65px;
  margin: auto auto 1rem;
  &,
  img {
    border-radius: 50%;
  }
`;

const TestimonialList = styled.ul`
  list-style: none;
  margin: 0 auto;
  padding: 0;
  @media (min-width: 960px) {
    margin-top: 100px;
    display: flex;
    align-items: center;
    li:nth-child(2) {
      margin: 0 8rem;
    }
  }
`;

const Testimonials: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Section>
      <Content>
        <Heading>
          {/*           <Link to="/?">Vi samler på glade kunder</Link>
           */}{" "}
          {t("testimonials.title")}
        </Heading>
        <TestimonialList>
          <Testimonial>
            <Quote />
            <p>{t("testimonials.1.content")}</p>
            <ImageContainer
              style={imageCss}
              alt={t("testimonials.1.alt")}
              src={camillaSrc}
            />
            <span>
              {t("testimonials.1.author")}
              <span>{t("testimonials.1.authorSubtitle")}</span>
            </span>
          </Testimonial>
          <Testimonial>
            <Quote />
            <p>{t("testimonials.2.content")}</p>

            <ImageContainer
              style={imageCss}
              alt={t("testimonials.2.alt")}
              src={loneSrc}
            />
            <span>
              {t("testimonials.2.author")}
              <span>{t("testimonials.2.authorSubtitle")}</span>
            </span>
          </Testimonial>
          <Testimonial>
            <Quote />
            <p>{t("testimonials.3.content")}</p>

            <ImageContainer
              style={imageCss}
              alt={t("testimonials.3.alt")}
              src={christianSrc}
            />
            <span>
              {t("testimonials.3.author")}
              <span>{t("testimonials.3.authorSubtitle")}</span>
            </span>
          </Testimonial>
        </TestimonialList>
      </Content>
    </Section>
  );
};

export default React.memo(Testimonials);
