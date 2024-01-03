import React from "react";
import SEO from "../components/SEO";
import {
  Hero,
  WorksWith,
  WhySubReader,
  HowWorks,
  Movie,
  Download,
  Testimonials,
  Subscriptions,
} from "../sections/home";
import { WithTranslation, withTranslation } from "react-i18next";
import { domainRef } from "../i18n";
import Layout from "../components/Layout";

const IndexPage: React.FC<WithTranslation> = ({ t, i18n }) => {
  const paymentOnWebsite: boolean = Object.values(domainRef).find(
    e => e.lang === i18n.language
  ).paymentOnWebsite;

  return (
    <>
      <SEO title={t("seoTitle")} />
      <Layout
        headerProps={{ menuButtonColor: "#000", altHeader: !paymentOnWebsite }}
      >
        <Hero />
        <WorksWith />
        <HowWorks />
        <Movie />
        <WhySubReader />
        {paymentOnWebsite && <Subscriptions />}
        <Testimonials />
        <Download />
      </Layout>
    </>
  );
};

export default withTranslation()(IndexPage);
