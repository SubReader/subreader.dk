import React from "react";
import styled from "styled-components";
import FaqListItem from "../../components/FaqListItem";
import { Trans, withTranslation, WithTranslation } from "react-i18next";
import { AvailablePlans, Plan } from "../../typings/plan";
import { formatDiscount } from "../../components/SubscriptionItem";
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
  availablePlans: AvailablePlans;
  yearlyPlan: Plan;
  paymentOnWebsite: boolean;
  monthlyPlan: Plan;
} & WithTranslation;

const Plus: React.FC<Props> = ({
  availablePlans,
  paymentOnWebsite,
  yearlyPlan,
  monthlyPlan,
  t,
}) => (
  <section>
    <Heading>{t("plus.heading")}</Heading>
    <List>
      <FaqListItem title={t("plus.q1.title")}>
        <Trans parent="p" i18nKey="plus.q1.p1" t={t} />
        <p>{t("plus.q1.p2")}</p>
      </FaqListItem>
      <FaqListItem title={t("plus.q2.title")}>
        <Trans
          parent="p"
          values={{
            monthly: `${monthlyPlan.price.amount} ${monthlyPlan.price.currency}`,
            yearly: `${yearlyPlan.price.amount} ${yearlyPlan.price.currency}`,
            discount: formatDiscount(availablePlans),
          }}
          i18nKey="plus.q2.p1"
          t={t}
        />
        <p>{t("plus.q2.p2")}</p>
      </FaqListItem>
      {paymentOnWebsite && (
        <>
          <FaqListItem title={t("plus.q3.title")}>
            <p>
              {t("plus.q3.p1")}
              <a href={t("plus.q3.href")}>{t("plus.q3.link")}</a>
            </p>
          </FaqListItem>
          <FaqListItem title={t("plus.q4.title")}>
            <p>{t("plus.q4.p1")}</p>
          </FaqListItem>
          <FaqListItem title={t("plus.q5.title")}>
            <p>{t("plus.q5.p1")}</p>
          </FaqListItem>
        </>
      )}
      <FaqListItem title={t("plus.q6.title")}>
        <p>{t("plus.q6.p1")}</p>
      </FaqListItem>
      <FaqListItem title={t("plus.q7.title")}>
        <p>{t("plus.q7.p1")}</p>
      </FaqListItem>
      <FaqListItem title={t("plus.q8.title")}>
        <p>{t("plus.q8.p1")}</p>
      </FaqListItem>
      <FaqListItem title={t("plus.q9.title")}>
        <p>{t("plus.q9.p1")}</p>
      </FaqListItem>
      {paymentOnWebsite && (
        <FaqListItem title={t("plus.q10.title")}>
          <p>
            {t("plus.q10.p.1")}
            <a href={"https://" + t("plus.q10.p.link")}>
              {t("plus.q10.p.link")}
            </a>
            {t("plus.q10.p.2")}
          </p>
        </FaqListItem>
      )}
    </List>
  </section>
);

export default withTranslation(["faq", "info"])(Plus);
