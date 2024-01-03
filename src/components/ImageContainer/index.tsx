import React, { ReactElement, ReactChildren } from "react";
import styled, { CSSProp } from "styled-components";
const Image = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  margin: 0;
`;
const Container = styled.div`
  width: 50px;
  display: block;
  height: auto;
`;

interface Props {
  src: string;
  alt: string;
  style?: CSSProp;
  children?: ReactChildren | ReactElement;
  inline?: object;
}

const ImageContainer = ({
  src,
  alt,
  style,
  children,
  inline,
}: Props): ReactElement => {
  return (
    <Container css={style} style={inline}>
      <Image onDragStart={e => e.preventDefault()} src={src} alt={alt} />
      {children}
    </Container>
  );
};

export default ImageContainer;
