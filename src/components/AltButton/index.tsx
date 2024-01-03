import styled from "styled-components";
import Link from "../Link";

const AltButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  border: 1px solid rgba(49, 135, 250, 0.5);
  box-sizing: border-box;
  padding: 0.75rem 1.8rem;
  font-size: 0.875rem;
  border-radius: 32px;
  line-height: 17px;
  font-weight: 700;
  cursor: pointer;
  color: #ffffff;
  text-align: center;
  transition: 0.2s all;
  &:hover {
    transform: scale(1.05);
  }
`;

export default AltButton;
