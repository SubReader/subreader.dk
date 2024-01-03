import React, { ReactElement } from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Content from "../components/Content";
import General from "../sections/faq/General";
import Bio from "../sections/faq/Bio";
import Plus from "../sections/faq/Plus";
import School from "../sections/faq/School";
import { useTranslation } from "react-i18next";
import { useStaticQuery, graphql } from "gatsby";
import { fragment } from "../components/SubscriptionItem";
import { gql, useQuery } from "@apollo/client";
import { Plan } from "../typings/plan";
import { domainRef } from "../i18n";

const Article = styled.article`
  min-height: 100vh;
  padding: 100px 1rem 200px;
  box-sizing: Border-box;
  max-width: 1750px;
  margin: 0 auto;
  h5 {
    font-size: 1rem;
    margin: 1rem 0 0 0;
    color: var(--primaryHeading);
  }
  & > section {
    margin-top: 5rem;
  }
  @media (min-width: 500px) {
    padding: 200px 2rem 200px;
  }
`;

const ContentContainer = styled(Content)`
  background: #fff;
  max-width: initial;
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

const FAQ: React.FC = (): ReactElement => {
  const { t, i18n } = useTranslation("faq");
  const { api } = useStaticQuery(STATIC_QUERY);
  const { data = api } = useQuery(DYNAMIC_QUERY, {
    context: { authenticate: false },
  });

  const yearlyPlan: Plan = data.availablePlans.find(
    e => e.billingInterval === "yearly"
  );
  const monthlyPlan: Plan = data.availablePlans.find(
    e => e.billingInterval === "monthly"
  );

  const paymentOnWebsite: boolean = Object.values(domainRef).find(
    e => e.lang === i18n.language
  ).paymentOnWebsite;

  return (
    <>
      <SEO title={t("seoTitle")} description={t("seoDescription")} />
      <Layout headerProps={{ altHeader: !paymentOnWebsite }}>
        <ContentContainer>
          <Article>
            <Plus
              {...data}
              paymentOnWebsite={paymentOnWebsite}
              yearlyPlan={yearlyPlan}
              monthlyPlan={monthlyPlan}
            />
            <School paymentOnWebsite={paymentOnWebsite} />
            <Bio paymentOnWebsite={paymentOnWebsite} />
            <General
              paymentOnWebsite={paymentOnWebsite}
              yearlyPlan={yearlyPlan}
              monthlyPlan={monthlyPlan}
            />
          </Article>
        </ContentContainer>
      </Layout>
    </>
  );
};

export default FAQ;
