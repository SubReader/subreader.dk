import styled from "styled-components";
import Link from "../Link";

const Button = styled(Link)`
  background: linear-gradient(180deg, #419ffb 0%, #1b66f9 100%);
  box-shadow: inset 0px -1px 7px rgba(255, 255, 255, 0.15);
  border-radius: 32px;
  border: none;
  display: inline-block;
  padding: 1.31rem 0;
  font-size: 1rem;
  font-weight: 700;
  width: 100%;
  max-width: 290px;
  cursor: pointer;
  color: #ffffff;
  text-shadow: 0px -2px 0px rgba(0, 0, 0, 0.17);
  text-align: center;
  transition: all 0.2s;

  &:hover {
    background: rgb(26, 66, 255);
    background: linear-gradient(
      0deg,
      rgba(26, 66, 255, 1) 0%,
      rgba(26, 132, 255, 1) 100%
    );
  }

  &:focus {
    outline: none;
  }

  &:active {
    opacity: 0.75;
  }
`;

export default Button;
