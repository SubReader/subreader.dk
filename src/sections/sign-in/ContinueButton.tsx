import React, { ReactChildren, ReactElement } from "react";
import styled, { CSSProp } from "styled-components";

const Button = styled.button`
  position: relative;
  width: 100%;
  background: #296bf0;
  cursor: pointer;
  height: 50px;
  border: none;
  border-radius: 4px;
  max-width: 500px;
  color: #fff;
  margin-top: 1rem;
  font-size: 1rem;
  font-weight: 700;
  svg {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
  }
`;

interface Props {
  children: ReactChildren;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  id?: string;
  style?: CSSProp;
  Icon: any;
}

const ContinueButton = ({
  children,
  onClick,
  id,
  style,
  Icon,
}: Props): ReactElement => {
  return (
    <>
      <Button id={id} css={style} onClick={onClick}>
        <Icon fill="#fff" />
        {children}
      </Button>
    </>
  );
};

export default ContinueButton;
