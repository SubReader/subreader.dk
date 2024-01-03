import React from "react";
import styled from "styled-components";
import List from "./List";
import LinkItem from "./LinkItem";
import { Facebook, Instagram, Youtube } from "../../assets/icons/Socials/";
import { Email, Phone } from "../../assets/icons/Contact/";
import Content from "../../components/Content";
import { useTranslation } from "react-i18next";
const Footer = styled.footer`
  background: var(--bg);
  padding: 3rem 1rem 1rem;
  box-sizing: border-box;
  margin-top: auto;
  h3 {
    margin-top: 1.33rem;
    margin-bottom: 3rem;
  }
  h4,
  h3 {
    color: var(--footerHeading);
    text-transform: uppercase;
    font-size: 0.8125rem;
  }
  p {
    display: flex;
    align-items: center;
    max-width: 650px;
  }
  & > div {
    min-height: 550px;
    display: grid;
    grid-template-columns: 1fr;
    place-content: center;
    column-gap: 5rem;
    @media (min-width: 960px) {
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: 300px 100px;
    }
  }
  @media (min-width: 960px) {
    padding: 0 2rem;
  }
`;

const QuickSection = styled.section`
  & > article:last-child {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  li {
    margin: 0.5rem 0;
  }
  @media (min-width: 960px) {
    & > article:nth-child(2) {
      margin: 0 120px;
    }
    display: flex;
    justify-content: flex-end;
  }
`;

const CVR = styled.p`
  margin: 0;
  @media (min-width: 960px) {
    grid-column: 1;
    grid-row: 2;
  }
`;

const SocialList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 2rem 0 0 0;
  li {
    margin: 0 0 2rem;
    a {
      display: flex;
      align-items: center;
      color: var(--altP);
      font-size: 0.8125rem;
      text-transform: uppercase;
      font-weight: bold;
      svg {
        margin-right: 10px;
      }
    }
  }
  @media (min-width: 960px) {
    grid-column: 1/-1;
    grid-row: 2;
    display: flex;
    justify-content: flex-end;
    li:first-child,
    li:last-child,
    li:nth-child(3) {
      margin: 0;
    }
    li {
      margin: 0 3rem;
    }
  }
`;

interface ListProps {
  title: String;
  links: Object[];
}

interface LinkProps {
  href: String;
  content: String;
}
const i18nArrOptions = {
  returnObjects: true,
  defaultValue: [],
};

type I18nArray = string | TemplateStringsArray;

const FooterComponent: React.FC = () => {
  const { t } = useTranslation(["footer", "info"]);
  const quickLinks = t<I18nArray>("quickLinks", i18nArrOptions);
  return (
    <Footer>
      <Content>
        <article>
          <h3>{t("title")}</h3>
          <p>{t("content")}</p>
        </article>
        <QuickSection>
          {Array.isArray(quickLinks) &&
            quickLinks.map((list: ListProps, i) => (
              <List key={i} title={list.title}>
                {list.links.map((link: LinkProps, i) => (
                  <LinkItem key={i} to={link.href}>
                    {link.content}
                  </LinkItem>
                ))}
              </List>
            ))}
        </QuickSection>
        <SocialList>
          <LinkItem href={t("info:socials.youtube")}>
            <Youtube /> Youtube
          </LinkItem>
          <LinkItem href={t("info:socials.instagram")}>
            <Instagram /> Instagram
          </LinkItem>
          <LinkItem href={t("info:socials.facebook")}>
            <Facebook /> Facebook
          </LinkItem>
          <LinkItem href={`mailto:${t("info:email")}`}>
            <Email /> {t("info:email")}
          </LinkItem>
          <LinkItem href={`tel:${t("info:phone.value")}`}>
            <Phone /> {t("info:phone.content")}
          </LinkItem>
        </SocialList>
        <CVR>{t("info:cvr")}</CVR>
      </Content>
    </Footer>
  );
};

export default FooterComponent;
