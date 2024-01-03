import React from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Content from "../components/Content";
import { withTranslation, WithTranslation } from "react-i18next";
import { CinemaMap, StarterPackage, ContactSection } from "../sections/cinemas";
import { domainRef } from "../i18n";
const ContentContainer = styled(Content)`
  background: #fff;
  max-width: initial;
`;
const Cinemas: React.FC<WithTranslation> = ({ t, i18n }) => {
  const paymentOnWebsite: boolean = Object.values(domainRef).find(
    e => e.lang === i18n.language
  ).paymentOnWebsite;

  return (
    <>
      <SEO title={t("seoTitle")} />
      <Layout headerProps={{ altHeader: !paymentOnWebsite }}>
        <ContentContainer>
          <CinemaMap />
          <StarterPackage />
          <ContactSection />
        </ContentContainer>
      </Layout>
    </>
  );
};

export default withTranslation("cinema")(Cinemas);
