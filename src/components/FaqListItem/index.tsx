import React, { ReactElement, useRef, useState } from "react";
import styled, { css } from "styled-components";

const ListItem = styled.li`
  font-size: 1.25rem;
  font-weight: bold;
  overflow: hidden;
  width: 100%;
  padding-bottom: 2rem;
  margin: 2rem 0;
  list-style: none;
  .hide {
    display: none !important;
  }
  @media (min-width: 960px) {
    padding: initial;
  }
`;

const ChildrenContainer = styled.div`
  padding-left: 30px;
  ul {
    list-style: none;
    color: var(--p);
  }
  @keyframes SlideDown {
    0% {
      transform: translateY(-100%);
      opacity: 0;
      max-height: 0;
    }
    100% {
      transform: translateY(0%);
      opacity: 1;
      max-height: 500px;
    }
  }
  @keyframes SlideUp {
    0% {
      transform: translateY(0%);
      opacity: 1;
      max-height: 500px;
    }

    100% {
      opacity: 0;
      transform: translateY(-100%);
      max-height: 0;
    }
  }
  position: relative;
  z-index: 0;
  font-size: 4vw;
  & > p {
    color: var(--p);
  }

  @media (min-width: 500px) {
    font-size: 1rem;
  }
`;

const Heading = styled.h4`
  color: #000;
  cursor: pointer;
  width: 100%;
  margin: 0;
  min-width: 0;
  white-space: initial;
  user-select: none;
  font-size: 5vw;
  @media (min-width: 500px) {
    font-size: 1.5rem;
    width: max-content;
  }
`;

const slideDown = css`
  animation: SlideDown 0.3s;
`;
const slideUp = css`
  animation: SlideUp 0.3s;
`;

const HeadingContainer = styled.span`
  position: relative;
  z-index: 2;
  display: flex;
  flex-shrink: 1;
  align-items: center;
  justify-content: flex-start;
  background: #fff;
`;

const iconOpen = css`
  &::before {
    display: none;
  }
`;

const Icon = styled.i`
  position: Relative;
  padding-right: 10px;
  cursor: pointer;
  width: 17px;
  height: 18px;
  &::after,
  &::before {
    content: "";
    display: block;
    position: Absolute;
    left: 0;
    background: #ccc;
    width: 17px;
    height: 7px;
    top: 50%;
    transform: translateY(-50%);
  }

  &::before {
    transform: translateY(-50%) rotate(90deg);
  }
`;

type Title = string;
type Children = ReactElement | ReactElement[];
interface Props {
  title: Title;
  children: Children;
}

const FaqListItem: React.FC<Props> = ({
  title,
  children,
}: Props): ReactElement => {
  const containerRef = useRef<any>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [initial, setInitial] = useState<boolean>(true);
  return (
    <ListItem>
      <HeadingContainer>
        <Icon
          onClick={() => {
            setIsOpen(!isOpen);
            if (initial) setInitial(false);
          }}
          css={isOpen && iconOpen}
          role="Toggle Button"
        />
        <Heading
          onClick={() => {
            setIsOpen(!isOpen);
            if (initial) setInitial(false);
          }}
        >
          {title}
        </Heading>
      </HeadingContainer>
      <ChildrenContainer
        ref={containerRef}
        onAnimationEnd={e =>
          e.animationName === "SlideUp" &&
          containerRef.current.classList.add("hide")
        }
        css={[
          isOpen ? slideDown : slideUp,
          initial &&
            css`
              display: none;
            `,
        ]}
      >
        {children}
      </ChildrenContainer>
    </ListItem>
  );
};

export default FaqListItem;
