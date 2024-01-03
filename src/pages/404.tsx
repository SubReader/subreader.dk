import React from "react";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Content from "../components/Content";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
const Article = styled.article`
  margin: 320px auto 220px;
  text-align: center;
  & > h1 {
    color: var(--altPrimary);
  }
`;

const NotFoundPage: React.FC = () => {
  const { t } = useTranslation("404");
  return (
    <Layout>
      <SEO title="404: Not found" />
      <Content>
        <Article>
          <h1>{t("heading")} 😔</h1>
          <p>{t("content")}</p>
        </Article>
      </Content>
    </Layout>
  );
};

export default NotFoundPage;
