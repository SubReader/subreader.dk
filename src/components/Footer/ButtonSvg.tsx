import React from "react";
import styled, { css } from "styled-components";

const Svg = styled.svg`
  appearance: none;
  border: none;
  background: none;
  cursor: pointer;
  width: 26px;
`;

const isOpenStyle = css`
  transform: rotate(90deg);
`;

const ButtonSvg = ({ isOpen }) => (
  <Svg
    css={isOpen && isOpenStyle}
    fill="none"
    viewBox="0 0 26 26"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="m20.312 12.999h-14.625"
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
      strokeWidth="2"
    />
    <path
      d="M14.625 7.3125L20.3125 13L14.625 18.6875"
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
      strokeWidth="2"
    />
  </Svg>
);

export default ButtonSvg;
