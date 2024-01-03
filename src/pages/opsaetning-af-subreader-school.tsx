import React, { ReactElement } from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Content from "../components/Content";
import { FaDownload } from "react-icons/fa";

const Section = styled.section`
  padding: 150px 1rem 0;
  box-sizing: Border-box;
  max-width: 1750px;
  margin: 0 auto;
  @media (min-width: 960px) {
    padding: 200px 1rem 0;
  }
`;

const Heading = styled.h2`
  text-align: Center;
  font-size: 5.8vw;
  margin-bottom: 2rem;
  @media (min-width: 450px) {
    font-size: 1.75rem;
  }
`;

const Button = styled.a`
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  color: #666;
  border-color: #ebebeb;
  background-color: #ebebeb;
  margin: 4rem 10px;
  border-radius: 5px;
  display: block;
  padding: 1rem 2rem;
  max-width: max-content;
  &:hover {
    background-color: #d8d8d8;
  }
`;
const DownloadIcon = styled(FaDownload)`
  margin-right: 10px;
`;
const Video = styled.div`
  position: relative;
  display: block;
  margin: 0 auto;
  width: 100%;
  padding-bottom: 56.25%;
  max-width: 1000px;
  z-index: 0;
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  @media (min-width: 1000px) {
    padding-bottom: 562px;
  }
`;

const ContentContainer = styled(Content)`
  max-width: initial;
  background: #fff;
  padding-bottom: 5rem;
`;

const FlexContainer = styled.article`
  display: flex;
  justify-content: center;
`;

const OpsaetningSchool: React.FC = (): ReactElement => (
  <>
    <SEO title="Opsætning af SubReader School" />
    <Layout>
      <ContentContainer>
        <Section>
          <Heading>Opsætning af SubReader School</Heading>
          <Video>
            <iframe
              src={"https://www.youtube.com/embed/V1IxELNO_fc"}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen={true}
            />
          </Video>
        </Section>
        <FlexContainer>
          <Button
            href="https://chrome.google.com/webstore/detail/subreader/aaklggfnacambnehkmbpflkfhfelpand?hl=da"
            role="Download Button"
            aria-label="Download Chrome Extension"
          >
            <DownloadIcon />
            Download Chrome Extension
          </Button>
        </FlexContainer>
      </ContentContainer>
    </Layout>
  </>
);

export default OpsaetningSchool;
