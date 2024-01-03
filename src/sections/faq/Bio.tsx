import React from "react";
import styled from "styled-components";
import FaqListItem from "../../components/FaqListItem";
import { WithTranslation, withTranslation } from "react-i18next";

const Heading = styled.h2`
  margin: 0;
  font-weight: 300;
  color: var(--primaryHeading);
  font-size: 7vw;
  text-align: Center;
  @media (min-width: 500px) {
    text-align: left;
    font-size: 2rem;
  }
`;

const List = styled.ul`
  padding: 0;
  color: #000;
  p:last-child {
    margin-bottom: 0;
  }
`;
type Props = {
  paymentOnWebsite: boolean;
} & WithTranslation;

const Bio: React.FC<Props> = ({ paymentOnWebsite, t }) => (
  <section>
    <Heading>{t("bio.heading")}</Heading>
    <List>
      <FaqListItem title={t("bio.q1.title")}>
        <p>{t("bio.q1.p1")}</p>
      </FaqListItem>
      <FaqListItem title={t("bio.q2.title")}>
        <p>{t("bio.q2.p1")}</p>
      </FaqListItem>
      <FaqListItem title={t("bio.q3.title")}>
        <p>{t("bio.q3.p1")}</p>
      </FaqListItem>
      {paymentOnWebsite && (
        <FaqListItem title={t("bio.q4.title")}>
          <p>{t("bio.q4.p1")}</p>
        </FaqListItem>
      )}
      <FaqListItem title={t("bio.q5.title")}>
        <p>{t("bio.q5.p1")}</p>
        <p>
          {t("bio.q5.p2")}
          <a href={"mailto:" + t("bio.q5.link")}>{t("bio.q5.link")}</a>
        </p>
      </FaqListItem>
      <FaqListItem title={t("bio.q6.title")}>
        <p>{t("bio.q6.p1")}</p>
      </FaqListItem>
      <FaqListItem title={t("bio.q7.title")}>
        <p>{t("bio.q7.p1")}</p>
      </FaqListItem>
      <FaqListItem title={t("bio.q8.title")}>
        <p>{t("bio.q8.p1")}</p>
      </FaqListItem>
      <FaqListItem title={t("bio.q9.title")}>
        <p>{t("bio.q9.p1")}</p>
      </FaqListItem>
    </List>
  </section>
);

export default withTranslation(["faq", "info"])(Bio);
