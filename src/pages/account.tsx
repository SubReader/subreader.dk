import React, { useState, ReactElement } from "react";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Content from "../components/Content";
import styled, { css } from "styled-components";
import { AccountInfo } from "../sections/account";
import { navigate } from "gatsby";
import { logout, getAccessToken } from "../authentication";
import { useTranslation } from "react-i18next";
const Section = styled.section`
  margin: 100px auto 0;
  padding: 0 2rem;
  @media (min-width: 960px) {
    margin: 200px auto 100px;
  }
`;

const Panel = styled.article`
  width: 100%;
  background: #dae7f1;
  margin: 0 auto;
  min-height: 600px;
  max-width: 1000px;
  display: flex;
`;

const List = styled.ul`
  background: #1c1c1c;
  box-sizing: Border-box;
  padding: 1rem;
  width: 200px;
  margin: 0;
  list-style: none;
  font-weight: 700;

  li {
    cursor: pointer;
    padding: 0.875rem 0;
    border-bottom: 1px solid #2b2b2b;
    color: #c8c8c8;
    transition: Color 0.2s;
  }
`;
const ContentContainer = styled.article`
  padding: 2rem;
  box-sizing: border-box;
`;

const activeStyle = css`
  color: #fff !important;
`;

interface InnerContentProps {
  renderContent: string;
}

const InnerContent = ({ renderContent }: InnerContentProps): ReactElement => {
  switch (renderContent) {
    case "info":
      return <AccountInfo />;
    case "test":
      return <p>test</p>;
  }
};

const AccountPage: React.FC = () => {
  const { t } = useTranslation("account");
  const [renderContent, setRenderContent] = useState<string>("info");
  if (!getAccessToken() && typeof window !== "undefined") {
    navigate("/sign-in", {
      state: {
        redirect: "/account",
      },
      replace: true,
    });
    return null;
  }

  return (
    <>
      <SEO title="Konto" />
      <Layout>
        <Content>
          <Section>
            <Panel>
              <List>
                <li
                  css={renderContent === "info" && activeStyle}
                  role="button"
                  onClick={() => setRenderContent("info")}
                >
                  {t("info.title")}
                </li>
                <li
                  onClick={async () => {
                    await logout();
                    await navigate("/");
                  }}
                  role="button"
                >
                  {t("log-out")}
                </li>
              </List>
              <ContentContainer>
                {InnerContent({ renderContent })}
              </ContentContainer>
            </Panel>
          </Section>
        </Content>
      </Layout>
    </>
  );
};

export default AccountPage;
