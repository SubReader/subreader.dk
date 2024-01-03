import React, {
  ReactElement,
  useRef,
  useState,
  useCallback,
  useEffect,
} from "react";
import styled from "styled-components";
import { getAccessToken } from "../authentication";
import { navigate, graphql, useStaticQuery, Link } from "gatsby";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Content from "../components/Content";
import { useTranslation } from "react-i18next";
import { useQuery, gql, useMutation } from "@apollo/client";
import { analytics } from "../analytics";

const ContentContainer = styled(Content)`
  background: #231880;
  max-width: initial;
`;

const BlockbusterLogo = styled.img`
  margin: 0 auto;
  user-select: none;
  position: relative;
  z-index: 4;
  display: block;
  width: 100%;
  max-width: 600px;
  @media (min-width: 500px) {
    width: 90%;
  }
`;

const Section = styled.section`
  padding: 275px 1rem 200px;
  box-sizing: Border-box;
  max-width: 1750px;
  margin: 0 auto;
  display: flex;
  position: relative;
  align-items: center;
  flex-direction: column;
  @media (min-width: 500px) {
    padding: 500px 2rem 400px;
  }
`;

const AppreciationText = styled.p`
  max-width: 700px;
  width: 100%;
  margin: 1rem auto 0;
  line-height: 1.4;
  color: #e6e6e6;
  display: none;
  @media (min-width: 500px) {
    display: block;
    font-size: 1.15rem;
  }
`;

const Heading = styled.h2`
  font-size: 5vw;
  text-align: center;
  color: var(--altHeading);
  @media (min-width: 500px) {
    font-size: 2rem;
  }
`;

const DiscountContainer = styled.div`
  background: #130c53;
  border-radius: 25px;
  cursor: pointer;
  margin-top: 1rem;
  padding: 1.5rem;
  width: 80%;
  box-sizing: border-box;
  display: flex;
  max-width: 500px;
  align-items: center;
  justify-content: center;
  transition: all 0.1s;
  text-align: center;
  &:hover {
    transform: scale(1.025);
  }
  @media (min-width: 600px) {
    width: 60%;
    padding: 2rem;
    min-height: 100px;
  }
  @media (min-width: 960px) {
    width: 60%;
  }
`;

const SubscriptionLink = styled(Link)`
  background: #130c53;
  border-radius: 25px;
  cursor: pointer;
  margin-top: 1rem;
  padding: 1.5rem;
  width: 80%;
  box-sizing: border-box;
  display: flex;
  max-width: 400px;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: #fff;
  font-size: 1.5rem;
  user-select: none;
  font-weight: 900;
  transition: all 0.1s;
  &:hover {
    transform: scale(1.025);
  }
  @media (min-width: 500px) {
    width: 60%;
    padding: 2rem;
    min-height: 100px;
  }
  @media (min-width: 960px) {
    width: 60%;
  }
`;

const Discount = styled.span`
  font-size: 5vw;
  user-select: none;
  font-weight: 900;
  @media (min-width: 500px) {
    font-size: 1.5rem;
  }
  @media (min-width: 960px) {
    letter-spacing: 7px;
  }
`;

const CopyMsg = styled.span`
  color: var(--p);
  user-select: none;
  margin-top: 5px;
  font-weight: 700;
`;

const windowExist = typeof window !== "undefined";

const IMAGE_QUERY = graphql`
  query {
    imageData: file(relativePath: { eq: "partners/blockbuster.svg" }) {
      publicURL
    }
  }
`;

const ACCOUNT_DETAILS = gql`
  query {
    user: viewer {
      subscriptions {
        active
      }
    }
  }
`;

const BlockBuster: React.FC = (): ReactElement => {
  //Redirect to login if user is not logged in
  if (!getAccessToken() && windowExist) {
    navigate("/sign-in", {
      state: {
        redirect: "/blockbuster",
      },
      replace: true,
    });
    return null;
  }

  //Check if user have an active subscription
  const { data } = useQuery(ACCOUNT_DETAILS, { fetchPolicy: "network-only" });
  const isSubActive = data?.user.subscriptions.find(sub => sub.active === true);

  //Rest of code
  const { t } = useTranslation("blockbuster");
  const { imageData } = useStaticQuery(IMAGE_QUERY);
  const [copyMsg, setCopyMsg] = useState<String>("Klik for at kopiere kode");
  const codeRef = useRef<HTMLSpanElement>();
  const handleCopyCode = useCallback((): void => {
    const ta = document.createElement("textarea");
    ta.innerText = codeRef.current.innerText;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
    setCopyMsg("Kode kopieret!");
  }, [codeRef]);

  const [getCode, code] = useMutation(gql`
    mutation ClaimBlockbusterCode {
      code: claimBlockbusterCode
    }
  `);

  useEffect(() => {
    if (isSubActive) getCode();
  }, [data]);

  return (
    <Layout headerProps={{ altHeader: true }}>
      <SEO title={t("seoTitle")} />
      <ContentContainer>
        <Section>
          <BlockbusterLogo
            onDragStart={e => e.preventDefault()}
            alt="Blockbuster Logo"
            src={imageData.publicURL}
          />
          <Heading>
            {t("heading")}
            <AppreciationText>{t("span")}</AppreciationText>
          </Heading>

          {isSubActive ? (
            <>
              <DiscountContainer onClick={handleCopyCode}>
                <Discount ref={codeRef}>
                  {code?.data?.code ??
                    (code.loading || !code.called
                      ? "Henter..."
                      : "Ingen koder tilbage 😔")}
                </Discount>
              </DiscountContainer>
              {code?.data?.code && <CopyMsg>{copyMsg}</CopyMsg>}
            </>
          ) : (
            <SubscriptionLink
              onClick={async () => {
                analytics.track("Lead", {
                  reason: "Subscription Button from Blockbuster",
                });
              }}
              onDragStart={e => e.preventDefault()}
              state={{ blockBusterFlow: true }}
              to="/subscription/monthly"
            >
              {t("SubButton")}
            </SubscriptionLink>
          )}
        </Section>
      </ContentContainer>
    </Layout>
  );
};

export default BlockBuster;
