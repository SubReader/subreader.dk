import React, { useState } from "react";
import styled, { css } from "styled-components";
import { withTranslation, WithTranslation } from "react-i18next";
import { IoIosGlobe } from "react-icons/io";
import { domainRef } from "../../i18n";
const Button = styled.button`
  background: none;
  border: none;
  font-weight: 700;
  white-space: pre;
  color: #fff;
  font-size: 1rem;
  padding: 0;
  display: flex;
  user-select: none;
  align-items: center;
  cursor: pointer;
  & svg {
    font-size: 1.5rem;
    padding: 0 0.5rem 0 1rem;
  }
`;
const Container = styled.div`
  position: relative;
  display: none;
  @media (min-width: 1200px) {
    display: block;
  }
`;
const List = styled.ul`
  position: absolute;
  background-color: var(--bg);
  list-style: none;
  padding: 0rem 3rem 1rem;
  z-index: -1;
  margin: 0;
  @media (max-width: 960px) {
    padding: 0rem 2rem 1rem;
  }
`;

const Item = styled.li`
  cursor: pointer;
  font-weight: 700;
  white-space: pre;
  user-select: none;
  text-align: left;
  font-size: 1rem;
  margin-top: 1rem;
  transition: color 0.2s;
  &:hover {
    color: #3366c2;
  }
`;

const menuStyle = css`
  @media (max-width: 960px) {
    display: block;
    z-index: 9999999;
    button {
      svg {
        padding-left: 0;
      }
    }
    ul {
      top: 0;
      transform: translateY(-100%);
    }
  }
`;

const i18nLangs = [...new Set(Object.values(domainRef))];

type Props = WithTranslation & {
  isMenuOpen: boolean;
};

const LanguageSelector: React.FC<Props> = ({ i18n, t, isMenuOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const langs: Object = t("langs", { returnObjects: true });
  const currentLang = langs[i18n.language];
  const supportedLangs = Object.fromEntries(
    Object.entries(langs).filter(
      ([key, value]) =>
        Object.values(i18nLangs).find(e => e.lang == key) &&
        value !== currentLang
    )
  );

  return (
    <Container css={isMenuOpen && menuStyle}>
      <Button onClick={() => setIsOpen(!isOpen)}>
        <IoIosGlobe />
        {currentLang}
      </Button>
      {isOpen && (
        <List>
          {Object.entries(supportedLangs).map(([lang]) => (
            <Item
              key={lang}
              onClick={() => {
                i18n.changeLanguage(lang);
                sessionStorage.setItem("lang", lang);
                setIsOpen(false);
              }}
            >
              {supportedLangs[lang]}
            </Item>
          ))}
        </List>
      )}
    </Container>
  );
};

export default withTranslation("info")(LanguageSelector);
