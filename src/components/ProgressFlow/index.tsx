import React, { ReactElement } from "react";
import styled, { css, CSSProp } from "styled-components";
import { MdSupervisorAccount, MdPayment } from "react-icons/md";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { useTranslation } from "react-i18next";
const List = styled.ul`
  padding: 0;
  margin: 200px 0 -100px 0;
  display: none;
  list-style: none;
  justify-content: center;
  transform: scale(0.8);
  user-select: none;
  li:last-child {
    margin-right: 10rem;
    &::before {
      display: none;
    }
  }
  @media (min-width: 960px) {
    margin: 200px 0 -200px 0;
    transform: none;
  }
  @media (min-width: 500px) {
    display: flex;
  }
`;
const Item = styled.li`
  @keyframes progress-bar-shine {
    to {
      transform: translateX(5rem);
      opacity: 0.1;
    }
  }
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 2rem;
  width: 50px;
  margin-left: 10rem;
  height: 50px;
  position: relative;
  background: #363c4d;
  &::before {
    content: "";
    display: block;
    width: 10rem;
    height: 5px;
    left: 0;
    top: 50%;
    transform: translate(31%, -50%);
    background: #363c4d;
    position: absolute;
  }
`;

const Heading = styled.h4`
  position: absolute;
  left: 50%;
  bottom: -50px;
  transform: translateX(-50%);
  font-size: 1rem;
  color: #363c4d;
  white-space: nowrap;
`;

const done = css`
  background: #00c8ff;
  h4 {
    color: #fff;
  }
  &::before {
    background: #00c8ff;
  }
`;
const active = css`
  background: #00c8ff;
  h4 {
    color: #fff;
  }
  &::before {
    background: linear-gradient(90deg, #00c8ff 25%, #363c4d 50%);
  }
`;

type Step = 1 | 2 | 3;
interface Props {
  step: Step;
  style?: CSSProp;
}
const ProgressFlow: React.FC<Props> = ({ step, style }): ReactElement => {
  const { t } = useTranslation("subscription");
  return (
    <List css={style}>
      <Item css={(step > 1 && done) || (step === 1 && active)}>
        <MdSupervisorAccount />
        <Heading>{t("flow.step1")}</Heading>
      </Item>
      <Item css={(step > 2 && done) || (step === 2 && active)}>
        <MdPayment />
        <Heading>{t("flow.step2")}</Heading>
      </Item>
      <Item css={(step > 3 && done) || (step === 3 && active)}>
        <AiOutlineCloudDownload />
        <Heading>{t("flow.step3")}</Heading>
      </Item>
    </List>
  );
};

export default ProgressFlow;
