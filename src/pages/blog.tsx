import React from "react";
import styled, { css } from "styled-components";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Content from "../components/Content";
import { graphql, Link } from "gatsby";
import Image from "gatsby-image";
import { WithTranslation, withTranslation } from "react-i18next";
import { Lang, Posts } from "../typings/post";

export const BLOGS_QUERY = graphql`
  query {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { published: { eq: true } } }
    ) {
      nodes {
        excerpt(pruneLength: 500)
        frontmatter {
          title
          date
          banner {
            childImageSharp {
              fluid(maxWidth: 1500, quality: 80) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        fields {
          slug
          lang
        }
      }
    }
  }
`;

const shortenExcerpt = (str: string): string => str.slice(0, 240) + "...";

const ContentContainer = styled(Content)`
  background: #fff;
  max-width: initial;
  padding: 150px 1rem 100px;
  box-sizing: border-box;
  min-height: 100vh;
  @media (min-width: 960px) {
    padding: 200px 1rem 100px;
  }
`;

const Heading = styled.h3`
  font-size: 7vw;
  width: 100%;
  margin: 1rem 0 0 0;
  span {
    display: block;
    font-size: 1rem;
    opacity: 0.8;
  }
  @media (min-width: 500px) {
    font-size: 2rem;
  }
`;

const Section = styled.section`
  max-width: 1200px;
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 80px;

  @media (min-width: 960px) {
    grid-template-columns: 1fr 1fr;
    margin: 0 auto;
    grid-column-gap: 32px;
    grid-template-rows: 468px;
    grid-auto-rows: 650px;
  }
`;

const PostContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  & > p {
    font-size: 1rem;
  }

  & > a {
    user-select: none;
    margin-top: auto;
    width: max-content;
    font-size: 1.25rem;
  }
`;

const Article = styled.article`
  display: flex;
  flex-direction: column;
`;

const Img = styled(Image)`
  height: 400px;
  @media (min-width: 960px) {
    height: 100%;
  }
`;

const promotedArticle = css`
  @media (min-width: 960px) {
    grid-column: 1/-1;
    grid-row: 0;
    flex-direction: row-reverse;
    & > div:last-child {
      padding-right: 1rem;
    }
    & > div:first-child {
      flex: 1.8;
    }
  }
`;

const NoPostsHeading = styled.h2`
  text-align: center;
  opacity: 0.5;
`;

type Props = WithTranslation & {
  data: any;
};

const Blog: React.FC<Props> = ({ data, i18n, t }) => {
  const posts: Posts = data.allMdx.nodes;
  const lang: Lang = i18n.language;
  const filteredPosts = posts.filter(
    post => post.fields.lang.toLowerCase() === lang.toLowerCase()
  );
  console.log(filteredPosts);

  return (
    <>
      <SEO title={t("seoTitle")} />
      <Layout>
        <ContentContainer>
          <Section>
            {filteredPosts.map(({ frontmatter, excerpt, fields }, i) => (
              <Article key={fields.slug} css={i < 1 && promotedArticle}>
                <Img fluid={frontmatter.banner.childImageSharp.fluid} />
                <PostContentContainer>
                  <Heading>
                    {frontmatter.title}
                    <span>{frontmatter.date}</span>
                  </Heading>

                  <p>{i < 1 ? excerpt : shortenExcerpt(excerpt)}</p>
                  <Link to={fields.slug}>{t("link")}</Link>
                </PostContentContainer>
              </Article>
            ))}
          </Section>
          {filteredPosts.length < 1 && (
            <NoPostsHeading>{t("noPostsHeading")}</NoPostsHeading>
          )}
        </ContentContainer>
      </Layout>
    </>
  );
};

export default withTranslation("blog")(Blog);
