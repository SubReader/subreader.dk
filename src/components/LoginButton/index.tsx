import React, { ReactChildren, ReactElement, useEffect, useState } from "react";
import styled, { css, CSSProp } from "styled-components";

const Submit = styled.button`
  background: #182944;
  border: none;
  border-radius: 4px;
  font-size: 1.25rem;
  width: 100%;
  cursor: pointer;
  margin: 50px auto 0;
  max-width: 400px;
  color: #fff;
  flex-shrink: 0;
  padding: 0.75rem 0;
  pointer-events: none;
  transition: background 0.2s;
`;

const validStyle = css`
  background: var(--blue);
  pointer-events: all;
`;

const buttonDisabled = css`
  pointer-events: none;
`;

interface Props {
  children?: ReactElement | ReactChildren;
  style?: CSSProp;
  disabled: Boolean;
  errors?: Object;
}

const LoginButton = ({
  children,
  style,
  disabled,
  errors,
}: Props): ReactElement => {
  const errorsObj = errors ? errors : {};
  const [initial, setInitial] = useState<boolean>(true);
  useEffect(() => {
    setInitial(false);
  }, []);

  return (
    <Submit
      type="submit"
      css={[
        style,
        Object.keys(errorsObj).length < 1 && !initial && validStyle,
        disabled && buttonDisabled,
      ]}
    >
      {children ? children : "Forsæt"}
    </Submit>
  );
};

export default LoginButton;
