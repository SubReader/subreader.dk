import React, { useEffect } from "react";
import Continue from "../sections/sign-in/Continue";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import { getAccessToken } from "../authentication";
import { navigate } from "gatsby";
import Content from "../components/Content";
import { useTranslation } from "react-i18next";

const SignIn: React.FC = () => {
  const { t } = useTranslation("sign-in");
  useEffect(() => {
    if (getAccessToken()) navigate("/");
  }, []);

  return (
    <>
      <SEO title={t("seoTitle")} description={t("seoDescription")} />
      <Layout headerProps={{ altHeader: true }}>
        <Content>
          <Continue />
        </Content>
      </Layout>
    </>
  );
};

export default SignIn;
