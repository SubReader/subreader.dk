import React, { useCallback, useState } from "react";
import styled, { css } from "styled-components";
import Logo from "../../assets/icons/Logo/Logo.svg";
import Link from "../Link";
import { navigate } from "gatsby";
import AltButton from "../AltButton";
import HeaderContainer from "./HeaderContainer";
import { NavigationContainer } from "./Navigation/NavigationContainer";
import NavigationItemList from "./Navigation/NavigationItemList";
import NavigationItem from "./Navigation/NavigationItem";
import NavigationLink from "./Navigation/NavigationLink";
import { BurgerMenu } from "../../assets/icons";
import { RiCloseLine } from "react-icons/ri";
import { analytics } from "../../analytics";
import { useTranslation } from "react-i18next";
import { isAuthenticated, getAccessToken, logout } from "../../authentication";
import LanguageSelector from "../LanguageSelector";
import { domainRef } from "../../i18n";

const trackingButton = async (): Promise<void> => {
  analytics.track("Lead", {
    reason: "Header Trial Button",
    planID: null,
  });
};

const LogoLink = styled(Link)`
  display: inline-block;
  margin-right: auto;
`;

const HeaderLogo = styled(Logo)`
  display: block;
  width: 167px;
`;

const MobileNavigationContainer = styled.div`
  padding: 1.5rem 0;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  svg {
    cursor: pointer;
    font-size: 3rem;
    z-index: 3;
  }
`;

const dekstopIcon = css`
  @media (min-width: 960px) {
    display: none;
  }
`;

const headerMenuOpenStyle = css`
  @media (max-width: 960px) {
    position: fixed;
  }
`;

const langStyle = css`
  position: absolute;
  right: 17rem;
`;

const langAlt = css`
  @media (min-width: 960px) {
    position: static;
  }
`;

const langStyleOpen = css`
  @media (max-width: 960px) {
    bottom: 2rem;
    left: 0;
  }
`;

const closeButton = css`
  @media (min-width: 960px) {
    display: none;
  }
`;

const Button = styled(AltButton)`
  display: none;
  white-space: pre;
  @media (min-width: 960px) {
    display: block;
  }
`;

const altCss = css`
  @media (min-width: 960px) {
    justify-content: flex-end;
  }
`;

export type HeaderProps = {
  altHeader?: boolean;
  menuButtonColor?: string | undefined;
};

const Header: React.FC<HeaderProps> = ({ altHeader, menuButtonColor }) => {
  const { t, i18n } = useTranslation("header");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [renderLogin, setRenderLogin] = useState<any>(getAccessToken());
  const schoolSupport: boolean = Object.values(domainRef).find(
    e => e.lang === i18n.language
  ).schoolSupport;
  const logoutHandler = useCallback(async (): Promise<void> => {
    await logout();
    setIsMenuOpen(false);
    setRenderLogin(isAuthenticated());
    navigate("/");
  }, []);

  return (
    <HeaderContainer css={isMenuOpen && headerMenuOpenStyle} id="nav">
      <MobileNavigationContainer>
        <LogoLink onDragStart={e => e.preventDefault()} to="/">
          <HeaderLogo />
        </LogoLink>
        {isMenuOpen ? (
          <RiCloseLine
            fill="#fff"
            css={closeButton}
            onClick={() => setIsMenuOpen(false)}
            id="close-icon"
          />
        ) : (
          <BurgerMenu
            css={dekstopIcon}
            fill={menuButtonColor}
            onClick={() => setIsMenuOpen(true)}
            id="open-icon"
          />
        )}
      </MobileNavigationContainer>
      <NavigationContainer isMenuOpen={isMenuOpen} id="nav-container">
        <NavigationItemList css={altHeader && altCss}>
          <NavigationItem>
            <NavigationLink onClick={() => setIsMenuOpen(false)} to="/">
              {t("nav.index")}
            </NavigationLink>
          </NavigationItem>
          <NavigationItem>
            <NavigationLink onClick={() => setIsMenuOpen(false)} to="/faq">
              {t("nav.faq")}
            </NavigationLink>
          </NavigationItem>
          <NavigationItem>
            <NavigationLink onClick={() => setIsMenuOpen(false)} to="/cinemas">
              {t("nav.bio")}
            </NavigationLink>
          </NavigationItem>

          {schoolSupport && (
            <NavigationItem>
              <NavigationLink
                onClick={() => setIsMenuOpen(false)}
                to="/schools/"
              >
                {t("nav.schools")}
              </NavigationLink>
            </NavigationItem>
          )}
          <NavigationItem>
            <NavigationLink onClick={() => setIsMenuOpen(false)} to="/blog">
              {t("nav.blog")}
            </NavigationLink>
          </NavigationItem>
          {renderLogin && (
            <NavigationItem onClick={() => logoutHandler()}>
              <p>{t("nav.log-out")}</p>
            </NavigationItem>
          )}
          <NavigationItem
            css={[langStyle, isMenuOpen && langStyleOpen, altHeader && langAlt]}
          >
            <LanguageSelector isMenuOpen={isMenuOpen} />
          </NavigationItem>
        </NavigationItemList>
      </NavigationContainer>
      {!altHeader && (
        <Button onClick={trackingButton} to="/subscription/monthly">
          {t("trial-btn")}
        </Button>
      )}
    </HeaderContainer>
  );
};

export default React.memo(Header);
