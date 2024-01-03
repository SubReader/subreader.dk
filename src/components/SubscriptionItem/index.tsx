import React, { ReactElement } from "react";
import styled, { CSSProp } from "styled-components";
import { Checkmark } from "../../assets/icons";
import { graphql, Link } from "gatsby";
import gql from "graphql-tag";
import { analytics } from "../../analytics";
import { useTranslation } from "react-i18next";
import { Plan, AvailablePlans } from "../../typings/plan";
const Item = styled.li`
  width: 100%;
  max-width: 370px;
  flex-shrink: 0;
  display: flex;
  position: Relative;
  flex-direction: column;
  margin: 2rem 2rem;
  background: var(--darkBlueGradient);
  border-radius: 20px;
  padding: 3rem 50px 2.75rem;
  box-sizing: border-box;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  @media (min-width: 450px) {
    padding: 3rem 60px 2.75rem;
  }
`;

const Title = styled.h3`
  color: #fff;
  margin: 0 0 3rem 0;
  white-space: pre;
`;

const MonthlyFeeParagraph = styled.p`
  font-size: 4.375rem;
  display: flex;
  padding: 10px 0;
  justify-content: center;
  font-weight: bold;
  color: #fff;
  margin: 0rem 0 1rem;
  text-shadow: 0px 2px 0px rgba(0, 0, 0, 0.25);
  .currencySymbol,
  .monthly {
    font-size: 1rem;
    text-shadow: none;
    color: rgba(255, 255, 255, 0.5);
  }
  .currencySymbol {
    margin: -20px 7px 0 0;
    letter-spacing: 1px;
  }
  .monthly {
    margin: 20px 0 0 0;

    span {
      margin-right: 3px;
      color: rgba(255, 255, 255, 0.5);
    }
  }
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  margin: 0.5rem 0;
  svg {
    width: 1.1rem;
    height: 1.1rem;
    margin-right: 0.5rem;
  }
`;

const FeatureList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0 0 2rem;
`;

const Button = styled(Link)`
  background: #21fed1;
  display: block;
  width: 100%;
  margin-top: auto;
  cursor: pointer;
  font-weight: bold;
  user-select: none;
  font-size: 1rem;
  line-height: 19px;
  letter-spacing: -0.01em;
  text-align: center;
  color: #071222;
  padding: 1.31rem 0;
  box-shadow: inset 0px -1px 7px rgba(255, 255, 255, 0.15);
  border-radius: 32px;
  transition: all 0.2s;
  text-decoration: none;
  &:hover {
    transform: scale(1.05);
  }

  &:focus {
    outline: none;
  }

  &:active {
    opacity: 0.75;
  }
`;

const CancelAnytime = styled.span`
  font-weight: 900;
  color: #ffffffa8;
  font-size: 0.75rem;
  text-align: Center;
  margin-top: 5px;
`;

const Banner = styled.div`
  position: absolute;
  top: 25px;
  right: -30px;
  transform: rotate(45deg);
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.3);
  background: #ff304d;
  width: 120px;
  font-size: 0.75rem;
  font-weight: 900;
  padding: 0.25rem;
  text-align: center;
`;

export const fragment = gql`
  fragment AvailablePlanFragment on Plan {
    id
    itunesProductId
    reepayPlanId
    billingInterval
    price {
      amount
      currencySymbol
      currency
    }
  }
`;

export const query = graphql`
  fragment AvailablePlanFragment on SRAPI_Plan {
    id
    itunesProductId
    reepayPlanId
    billingInterval
    price {
      amount
      currencySymbol
      currency
    }
  }
`;
type Discount = string;

type Button = {
  text: String;
  url: string;
};

interface Props {
  plan: Plan;
  style?: CSSProp;
  banner?: string;
  title: string;
  button: Button;
}
type FeatureList = string | TemplateStringsArray;

export function formatDiscount(plans: AvailablePlans): Discount {
  const monthlyPrice = plans.find(e => e.billingInterval === "monthly").price
    .amount;
  const yearlyPrice = plans.find(e => e.billingInterval === "yearly").price
    .amount;
  const monthlyPriceInYear = monthlyPrice * 12;
  const procent =
    ((monthlyPriceInYear - yearlyPrice) / monthlyPriceInYear) * 100;
  return `${Math.floor(procent / 5) * 5}%`;
}

const SubscriptionItem = ({
  plan,
  style,
  banner,
  title,
  button,
}: Props): ReactElement => {
  const { t } = useTranslation();
  const featureList = t<FeatureList>("subscriptions.features", {
    returnObjects: true,
  });
  const planInterval =
    plan.billingInterval === "yearly"
      ? t("subscriptions.yearly.year")
      : t("subscriptions.monthly.month");

  return (
    <>
      <Item css={style}>
        <Title>{title}</Title>
        <MonthlyFeeParagraph>
          <span className="currencySymbol">{plan.price.currency}</span>
          {plan.price.amount}
          <span className="monthly">
            <span>/</span>
            {planInterval}
          </span>
        </MonthlyFeeParagraph>

        <FeatureList>
          {Array.isArray(featureList) &&
            featureList.map((feature, i) => (
              <FeatureItem key={i + title}>
                <Checkmark stroke="#21FED1" />
                {feature}
              </FeatureItem>
            ))}
        </FeatureList>
        <Button
          onClick={async () => {
            analytics.track("Lead", {
              reason: "Subscription Button from Subscriptions Section",
              planID: plan?.id ?? null,
            });
          }}
          onDragStart={e => e.preventDefault()}
          to={button.url}
        >
          {button.text}
        </Button>
        <CancelAnytime>{t("subscriptions.binding")}</CancelAnytime>
        {banner && <Banner>{banner}</Banner>}
      </Item>
    </>
  );
};

export default React.memo(SubscriptionItem);
