import { FluidObject } from "gatsby-image";
export type Banner = { childImageSharp: { fluid: FluidObject } };
export type Lang = string;

export type Fields = {
  slug: string;
  lang: Lang;
};

export type Frontmatter = {
  title: string;
  date: string;
  banner: Banner;
};

export type Post = {
  excerpt: string;
  frontmatter: Frontmatter;
  body: any;
  fields: Fields;
};

export type Posts = Array<Post>;
