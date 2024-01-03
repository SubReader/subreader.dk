import React from "react";
import styled from "styled-components";
import FaqListItem from "../../components/FaqListItem";
import { withTranslation, Trans, WithTranslation } from "react-i18next";
import { domainRef } from "../../i18n";

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

const School: React.FC<Props> = ({ t, i18n }) => {
  const schoolSupport: boolean = Object.values(domainRef).find(
    e => e.lang === i18n.language
  ).schoolSupport;

  if (schoolSupport) {
    return (
      <section>
        <Heading>{t("school.heading")}</Heading>
        <List>
          <FaqListItem title={t("school.q1.title")}>
            <Trans
              parent="p"
              t={t}
              i18nKey="school.q1.p1"
              values={{
                email: t("school.q1.email"),
                phone: t("school.q1.phone.content"),
                phoneLink: t("school.q1.phone.link"),
              }}
            >
              <a href={`mailto:${t("school.q1.email")}`}></a>{" "}
              <a href={`tel:${t("school.q1.phone.link")}`}></a>
            </Trans>
            <p>{t("school.q1.p2")}</p>
          </FaqListItem>
          <FaqListItem title={t("school.q2.title")}>
            <p>{t("school.q2.p1")}</p>
            <p>{t("school.q2.p2")}</p>
          </FaqListItem>
          <FaqListItem title={t("school.q3.title")}>
            <p>{t("school.q3.p1")}</p>
          </FaqListItem>
          <FaqListItem title={t("school.q4.title")}>
            <p>{t("school.q4.p1")}</p>
          </FaqListItem>
          <FaqListItem title={t("school.q5.title")}>
            <Trans
              parent="p"
              t={t}
              i18nKey="school.q5.p1"
              values={{
                email: t("school.q5.email"),
                phone: t("school.q5.phone.content"),
                phoneLink: t("school.q5.phone.link"),
              }}
            >
              <a href={`mailto:${t("school.q5.email")}`}></a>{" "}
              <a href={`tel:${t("school.q5.phone.link")}`}></a>
            </Trans>
          </FaqListItem>
        </List>
      </section>
    );
  }
  return null;
};

export default withTranslation(["faq", "info"])(School);
