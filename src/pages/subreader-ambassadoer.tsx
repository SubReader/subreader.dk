import React, { ReactElement } from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import { useTranslation } from "react-i18next";
import Content from "../components/Content";
const ContentContainer = styled(Content)`
  background: #575c96;
  max-width: initial;
`;
const Section = styled.section`
  padding: 200px 0 0;
`;
const Heading = styled.h2`
  text-align: center;
  color: var(--altHeading);
  font-size: 2rem;
  span {
    max-width: 900px;
    margin: 10px auto 0;
    color: var(--altP);
    display: block;
    font-size: 0.5em;
  }
`;
const MondayIframe = styled.iframe`
  height: 1000px;
  flex: 1;
  margin: 0 auto;
  display: block;
  border: none;
`;

const Container = styled.div`
  display: flex;
`;
const SubReaderAmbassadoer: React.FC = (): ReactElement => {
  const { t } = useTranslation("subreader-ambassadoer");
  return (
    <>
      <SEO title="SubReader Ambassadør" />
      <Layout>
        <ContentContainer>
          <Section>
            <Heading>
              {t("header")}
              <span>{t("span")}</span>
            </Heading>
            <Container>
              <MondayIframe src={t("src")} />
            </Container>
          </Section>
        </ContentContainer>
      </Layout>
    </>
  );
};

export default SubReaderAmbassadoer;
