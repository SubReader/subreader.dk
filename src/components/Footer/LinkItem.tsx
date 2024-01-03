import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

const Item = styled.li`
  a {
    text-decoration: none;
    color: var(--p);
    transition: color 0.2s;
    &:hover {
      color: var(--altP);
    }
  }
  svg {
    width: 32px;
  }
`;

const LinkItem = ({ to = null, children, href = null }) => {
  if (to) {
    return (
      <Item>
        <Link to={to}>{children}</Link>
      </Item>
    );
  }

  return (
    <Item>
      <a href={href}>{children}</a>
    </Item>
  );
};

export default LinkItem;
