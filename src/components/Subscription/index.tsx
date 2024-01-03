import React, { ReactElement, RefObject } from "react";
import styled, { css } from "styled-components";
import { gql } from "@apollo/client";
import { Link as GatsbyLink } from "gatsby";
import { useTranslation } from "react-i18next";
import { formatDiscount } from "../../components/SubscriptionItem";
import { Plan, AvailablePlans } from "../../typings/plan";
import ProgressFlow from "../../components/ProgressFlow";

const Section = styled.section`
  margin: 150px auto;
  min-height: 500px;
  max-width: 700px;
  border-radius: 0 0 6px 6px;
  overflow: hidden;
`;
const Link = styled(GatsbyLink)`
  display: block;
  font-size: 0.85rem;
  margin-top: 5px;
  width: max-content;
`;

const ReepayArticle = styled.article`
  height: 600px;
  overflow: hidden;
  background: #fff;
  html,
  body {
    overflow: hidden;
  }
`;
const Heading = styled.h3`
  text-align: center;
  margin: 0;
  font-size: 1rem;
  padding: 1rem 0;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.45);
`;

const SummaryArticle = styled.article`
  border-radius: 6px 6px 0 0;
  background: #fff;
  & > div {
    border-top: 1px solid #f5eee7;
  }
  & > div:first-child {
    border: none;
  }

  p {
    color: #000;
    margin: 0;
    font-weight: bold;
  }
`;

const CancelAnytime = styled.p`
  text-align: Center;
  font-size: 0.8rem;
`;

export const CREATE_REEPAY_RECURRING_SESSION = gql`
  mutation CreateReepayRecurringSession(
    $acceptURL: String
    $cancelURL: String
    $orderText: String
    $recurringAverageAmount: Int
    $buttonText: String
  ) {
    reepayRecurringSession: createReepayRecurringSession(
      acceptURL: $acceptURL
      cancelURL: $cancelURL
      orderText: $orderText
      recurringAverageAmount: $recurringAverageAmount
      buttonText: $buttonText
    ) {
      id
    }
  }
`;

export const CREATE_REEPAY_SUBSCRIPTION = gql`
  mutation CreateReepaySubscription(
    $reepayPlanID: String!
    $paymentMethod: String!
  ) {
    subscription: createReepaySubscription(
      reepayPlanID: $reepayPlanID
      paymentMethod: $paymentMethod
    ) {
      id
      plan {
        id
        billingInterval
        price {
          amount
          currency
        }
      }
    }
  }
`;
const Container = styled.div`
  color: #000;
  padding: 1rem;
  box-sizing: border-box;
  & > div {
    display: flex;
    justify-content: space-between;
  }
`;

const progressStyle = css`
  margin-bottom: -50px !important;
`;

const Slash = styled.span`
  display: inline !important;
  margin: 0 0.2rem;
`;

const PaymentToday = styled.p`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Membership = styled(PaymentToday)``;

const IntervalReminder = styled.p`
  color: #919191 !important;
  font-size: 0.75rem;
`;

type SubscriptionProps = {
  plan: Plan;
  reepayRef: RefObject<HTMLDivElement>;
  availablePlans: AvailablePlans;
};

const inBrowser = typeof window !== "undefined";

const Subscription = ({
  plan,
  reepayRef,
  availablePlans,
}: SubscriptionProps): ReactElement => {
  const { t } = useTranslation("subscription");
  const state = inBrowser && window.history.state;
  const progressFlow: Boolean = state && state.progressFlow;
  const planInterval =
    plan && plan.billingInterval == "monthly"
      ? t("summary.monthly")
      : t("summary.yearly");

  return (
    <>
      {progressFlow && <ProgressFlow step={2} style={progressStyle} />}

      <Section>
        <SummaryArticle>
          <Heading>{t("summary.title")}</Heading>
          <Container>
            <Membership>
              SubReader Plus
              <span>
                {plan && plan.price.amount}
                {plan && plan.price.currency}
                <Slash>/</Slash>
                {planInterval || (plan && plan.billingInterval)}
              </span>
            </Membership>
            {plan && plan.billingInterval === "monthly" ? (
              <Link to="/subscription/yearly" state={state}>
                {t("yearly.link", { percent: formatDiscount(availablePlans) })}
              </Link>
            ) : (
              <Link to="/subscription/monthly" state={state}>
                {t("monthly.link")}
              </Link>
            )}
          </Container>

          <Container>
            <PaymentToday>
              {t("summary.paymentNotice")}
              <span>0{plan && plan.price.currency}</span>
            </PaymentToday>
            {plan && (
              <IntervalReminder>
                {t("summary.trialReminder")} {plan.price.amount}
                {plan && plan.price.currency}
                <Slash>/</Slash>
                {planInterval}
              </IntervalReminder>
            )}
          </Container>

          <Container>
            <CancelAnytime>{t("summary.binding")}</CancelAnytime>
          </Container>
        </SummaryArticle>
        <ReepayArticle ref={reepayRef} id="ReepayArticle" />
      </Section>
    </>
  );
};

export default Subscription;
