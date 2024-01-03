import React, { ReactElement } from "react";
import styled from "styled-components";
import GatsbyImage from "gatsby-image";
import { graphql, useStaticQuery } from "gatsby";
import { FaDownload } from "react-icons/fa";
import { useTranslation } from "react-i18next";
const Section = styled.section`
  background: #dae7f1;
`;

const Content = styled.div`
  max-width: 1750px;
  padding: 40px 2rem 100px;
  margin: 0 auto;
  @media (min-width: 960px) {
    padding: 40px 2rem 150px;
  }
`;

const Image = styled(GatsbyImage)`
  width: 100px;
`;

const Heading = styled.h2`
  text-align: center;
  font-size: 2rem;
  span {
    color: var(--p);
    display: block;
    margin-top: 10px;
    font-size: 0.5em;
  }
`;

const List = styled.ul`
  padding: 0;
  margin: 7rem auto 0;
  list-style: none;
  max-width: 1200px;

  @media (min-width: 960px) {
    grid-auto-rows: minmax(350px, 350px);
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 500px));
    place-content: center;
    grid-row-gap: 6rem;
    margin: 10rem auto 0;
    grid-column-gap: 6rem;
    li:nth-last-child(1),
    li:nth-last-child(2) {
      height: 280px;
    }
  }
`;
const Item = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  max-width: 500px;
  margin: 6rem auto;
  @media (min-width: 960px) {
    margin: initial;
    max-width: initial;
    p {
      margin: auto 0;
    }
  }
`;
const ItemHeading = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0;
`;
const DownloadButton = styled.a`
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  color: #666;
  border-color: #ebebeb;
  background-color: #ebebeb;
  border-radius: 5px;
  padding: 1rem 2rem;
  min-width: 200px;
  &:hover {
    background-color: #d8d8d8;
  }
`;
const DownloadIcon = styled(FaDownload)`
  margin-right: 10px;
`;
const IMAGEQUERY = graphql`
  query {
    operator: file(name: { eq: "operator" }) {
      data: childImageSharp {
        fluid(quality: 85, maxWidth: 3000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    presse: file(name: { eq: "presse" }) {
      data: childImageSharp {
        fluid(quality: 85, maxWidth: 3000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    some: file(name: { eq: "some" }) {
      data: childImageSharp {
        fluid(quality: 85, maxWidth: 3000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    graphic: file(name: { eq: "graphic" }) {
      data: childImageSharp {
        fluid(quality: 85, maxWidth: 3000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;
const StarterPackage = (): ReactElement => {
  const { t } = useTranslation("cinema");
  const { operator, presse, some, graphic } = useStaticQuery(IMAGEQUERY);
  return (
    <Section>
      <Content>
        <Heading>
          {t("StarterPackage.heading.content")}
          <span>{t("StarterPackage.heading.span")}</span>
        </Heading>
        <List>
          <Item>
            <Image
              alt={t("StarterPackage.list.graphic.imageAlt")}
              {...graphic.data}
              loading={"eager"}
            />
            <ItemHeading>
              {t("StarterPackage.list.graphic.heading")}
            </ItemHeading>
            <p>{t("StarterPackage.list.graphic.content")} </p>
            <DownloadButton
              target="_blank"
              href="https://drive.google.com/open?id=1k3I6muGZ_KYqJ7povGAAL6Qu-kFzjRtC"
            >
              <DownloadIcon />
              {t("StarterPackage.list.graphic.buttonText")}
            </DownloadButton>
          </Item>
          <Item>
            <Image
              alt={t("StarterPackage.list.operator.imageAlt")}
              {...operator.data}
              loading={"eager"}
            />
            <ItemHeading>
              {t("StarterPackage.list.operator.heading")}
            </ItemHeading>
            <p>{t("StarterPackage.list.operator.content")} </p>
            <DownloadButton
              target="_blank"
              href="https://drive.google.com/open?id=1ymK0GdLW2TWplyID6tM3JGtixJ3oAgE6"
            >
              <DownloadIcon /> {t("StarterPackage.list.operator.buttonText")}
            </DownloadButton>
          </Item>
          <Item>
            <Image
              alt={t("StarterPackage.list.some.imageAlt")}
              {...some.data}
              loading={"eager"}
            />
            <ItemHeading>{t("StarterPackage.list.some.heading")}</ItemHeading>
            <p>{t("StarterPackage.list.some.content")} </p>
          </Item>
          <Item>
            <Image
              alt={t("StarterPackage.list.pressMaterial.imageAlt")}
              {...presse.data}
              loading={"eager"}
            />
            <ItemHeading>
              {t("StarterPackage.list.pressMaterial.heading")}
            </ItemHeading>
            <p>{t("StarterPackage.list.pressMaterial.content")}</p>
          </Item>
        </List>
      </Content>
    </Section>
  );
};

export default StarterPackage;
