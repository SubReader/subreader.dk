import React from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Content from "../components/Content";
import Image from "gatsby-image";
import { graphql } from "gatsby";
import { withTranslation } from "react-i18next";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { Post } from "../typings/post";
const ContentContainer = styled(Content)`
  background: #fff;
  max-width: initial;
  padding: 150px 1rem 100px;
  box-sizing: border-box;
  @media (min-width: 960px) {
    padding: 200px 1rem 100px;
  }
`;

const Banner = styled(Image)`
  height: 400px;
  @media (min-width: 960px) {
    max-height: 456px;
    height: 100%;
  }
`;

export const POST_QUERY = graphql`
  query PostsByID($id: String!) {
    mdx(id: { eq: $id }) {
      body
      frontmatter {
        title
        banner {
          childImageSharp {
            fluid(maxWidth: 1400, quality: 80) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      fields {
        lang
      }
    }
  }
`;

const MarkdownContent = styled.div`
  @media (min-width: 960px) {
    margin: auto;
    max-width: 70%;
  }
`;

const Article = styled.article`
  max-width: 1200px;
  margin: auto;
  h1 {
    text-align: center;
  }
  h2 {
    font-size: 7vw;

    @media (min-width: 500px) {
      font-size: 2.325rem;
    }
  }
  img {
    width: 100%;
    object-fit: cover;
  }
  color: var(--p);
`;

const BlogPost: React.FC<any> = ({ data, i18n }) => {
  const { frontmatter, body, fields }: Post = data.mdx;

  return (
    <>
      <SEO title={frontmatter.title} />
      <Layout>
        <ContentContainer>
          <Article>
            <Banner fluid={frontmatter.banner.childImageSharp.fluid} />
            <MarkdownContent>
              <MDXRenderer>{body}</MDXRenderer>
            </MarkdownContent>
          </Article>
        </ContentContainer>
      </Layout>
    </>
  );
};

export default withTranslation()(BlogPost);
