import React, { useState } from "react";
import styled, { css } from "styled-components";
import ButtonSvg from "./ButtonSvg";

const Article = styled.article`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;

  div {
    user-select: none;
    display: flex;
    cursor: pointer;
    justify-content: space-between;
    align-items: center;
  }

  ul {
    @keyframes SlideDown {
      0% {
        transform: translateY(-30%);
        opacity: 0;
      }
      100% {
        transform: translateY(0%);
        opacity: 1;
      }
    }

    list-style: none;
    padding: 0;
    display: none;
  }
  @media (min-width: 960px) {
    border: none !important;
    div {
      pointer-events: none;
    }
    svg {
      display: none;
      height: 26px;
    }
    ul {
      display: block;
    }
  }
`;

const isOpenStyle = css`
  ul {
    animation: SlideDown 0.2s;
    display: block;
  }
`;
const List = ({ children, title }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Article css={isOpen && isOpenStyle}>
      <div onClick={() => setIsOpen(!isOpen)}>
        <h4>{title}</h4>
        <ButtonSvg isOpen={isOpen} />
      </div>
      <ul>{children}</ul>
    </Article>
  );
};

export default List;
