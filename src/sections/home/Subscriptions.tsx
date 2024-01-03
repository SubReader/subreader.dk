/* eslint-disable */
import React, { ReactElement } from "react";
import styled from "styled-components";
import { useStaticQuery, graphql } from "gatsby";
import SubscriptionItem, {
  fragment,
  formatDiscount,
} from "../../components/SubscriptionItem";
import Content from "../../components/Content";
import { gql, useQuery } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { Plan } from "../../typings/plan";
const SectionSubscription = styled.section`
  background: var(--bg);
  min-height: 950px;
  padding: 6rem 1rem;
  box-sizing: border-box;
  & > div {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`;

const Heading = styled.h2`
  color: var(--altHeading);
  font-size: 1.6875rem;
  margin: 1rem auto;
  text-align: center;
  & span {
    display: block;
    font-weight: 900;
    font-size: 2rem;
  }
`;

const SubscriptionList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 3rem 0 0 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
`;

export const STATIC_QUERY = graphql`
  query {
    api {
      availablePlans(os: "web") {
        ...AvailablePlanFragment
      }
    }
  }
`;

export const DYNAMIC_QUERY = gql`
  query {
    availablePlans(os: "web") {
      ...AvailablePlanFragment
    }
  }
  ${fragment}
`;

const Subscriptions: React.FC = () => {
  const { t } = useTranslation();
  const { api } = useStaticQuery(STATIC_QUERY);
  const { data = api } = useQuery(DYNAMIC_QUERY, {
    context: { authenticate: false },
  });

  return (
    <SectionSubscription id="Subscriptions">
      <Content>
        <Heading>
          {t("subscriptions.title.content")}
          <span>{t("subscriptions.title.span")}</span>
        </Heading>

        <SubscriptionList>
          {data.availablePlans.map(
            (plan: Plan): ReactElement => {
              if (plan.billingInterval === "monthly") {
                return (
                  <SubscriptionItem
                    title={t("subscriptions.monthly.title")}
                    button={{
                      text: t("subscriptions.monthly.button"),
                      url: "/subscription/monthly",
                    }}
                    key={plan.id}
                    plan={plan}
                  />
                );
              } else if (plan.billingInterval === "yearly") {
                return (
                  <SubscriptionItem
                    banner={t("subscriptions.yearly.banner", {
                      percent: formatDiscount(data.availablePlans),
                    })}
                    title={t("subscriptions.yearly.title")}
                    button={{
                      text: t("subscriptions.yearly.button"),
                      url: "/subscription/yearly",
                    }}
                    key={plan.id}
                    plan={plan}
                  />
                );
              }
            }
          )}
        </SubscriptionList>
      </Content>
    </SectionSubscription>
  );
};

export default Subscriptions;
