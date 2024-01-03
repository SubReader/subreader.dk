import React from "react";
import styled from "styled-components";
import FaqListItem from "../../components/FaqListItem";
import { WithTranslation, Trans, withTranslation } from "react-i18next";
import { Plan } from "../../typings/plan";

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
  yearlyPlan: Plan;
  paymentOnWebsite: boolean;
  monthlyPlan: Plan;
} & WithTranslation;

const General: React.FC<Props> = ({
  yearlyPlan,
  monthlyPlan,
  paymentOnWebsite,
  t,
}) => (
  <section>
    <Heading>{t("general.heading")}</Heading>
    <List>
      <FaqListItem title={t("general.q1.title")}>
        <p>{t("general.q1.p1")}</p>
      </FaqListItem>
      <FaqListItem title={t("general.q2.title")}>
        <Trans
          t={t}
          parent="p"
          i18nKey="general.q2.p"
          values={{ apple: "App Store", google: "Google Play Store" }}
        >
          <a href={t("info:downloadButtons.apple.href")}></a>
          <a href={t("info:downloadButtons.google.href")}></a>
        </Trans>
      </FaqListItem>
      <FaqListItem title={t("general.q3.title")}>
        <p>{t("general.q3.p1")}</p>
      </FaqListItem>
      <FaqListItem title={t("general.q4.title")}>
        <p>{t("general.q4.p1")}</p>
      </FaqListItem>
      {paymentOnWebsite && (
        <FaqListItem title={t("general.q5.title")}>
          <p>{t("general.q5.p1")}</p>
          <Trans
            t={t}
            parent="p"
            values={{
              monthly: `${monthlyPlan.price.amount} ${monthlyPlan.price.currency}`,
              yearly: `${yearlyPlan.price.amount} ${yearlyPlan.price.currency}`,
            }}
            i18nKey="general.q5.p2"
          />
        </FaqListItem>
      )}
      <FaqListItem title={t("general.q6.title")}>
        <p>{t("general.q6.p1")}</p>
        <p>{t("general.q6.p2")}</p>
      </FaqListItem>
      <FaqListItem title={t("general.q7.title")}>
        <p>{t("general.q7.p1")}</p>
      </FaqListItem>
      <FaqListItem title={t("general.q8.title")}>
        <p>{t("general.q8.p1")}</p>
        <p>{t("general.q8.p2")}</p>
        <Trans
          defaultValue=""
          t={t}
          parent="p"
          values={{ link: t("general.q8.link") }}
          i18nKey="general.q8.p3"
        >
          <a href={t("general.q8.link")}></a>
        </Trans>
      </FaqListItem>
      <FaqListItem title={t("general.q9.title")}>
        <p>{t("general.q9.p1")}</p>
      </FaqListItem>
    </List>
  </section>
);

export default withTranslation(["faq", "info"])(General);
