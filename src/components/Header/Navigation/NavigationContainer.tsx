import React, { ReactChild } from "react";
import styled, { css } from "styled-components";

const NavContainer = styled.nav`
  display: none;
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  @media screen and (min-width: 960px) {
    position: static;
    height: initial;
    display: block;
    margin: 0 auto;
  }
`;

const OpenMenuStyle = css`
  @media (max-width: 960px) {
    display: block;
    & > ul {
      justify-content: flex-start;
      padding: 6rem 2rem 2rem 2rem;
    }
    li {
      text-align: left;
    }
  }
`;

interface Props {
  id: string;
  children: ReactChild;
  isMenuOpen: boolean;
}

export const NavigationContainer: React.FC<Props> = ({
  id,
  children,
  isMenuOpen,
}) => (
  <NavContainer css={isMenuOpen && OpenMenuStyle} id={id}>
    {children}
  </NavContainer>
);
