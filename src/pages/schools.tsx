import React from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Content from "../components/Content";
import { VideoSection, ContactSection } from "../sections/schools";
import { domainRef } from "../i18n";
import { useTranslation } from "react-i18next";

const ContentContainer = styled(Content)`
  background: #fff;
  max-width: initial;
`;

const Schools: React.FC = () => {
  const { i18n } = useTranslation();
  const paymentOnWebsite: boolean = Object.values(domainRef).find(
    e => e.lang === i18n.language
  ).paymentOnWebsite;

  return (
    <>
      <SEO title="SubReader School" />
      <Layout headerProps={{ altHeader: !paymentOnWebsite }}>
        <ContentContainer>
          <VideoSection />
          <ContactSection />
        </ContentContainer>
      </Layout>
    </>
  );
};

export default Schools;
