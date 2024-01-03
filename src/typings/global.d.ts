import { CSSProp } from "styled-components";

declare module "react" {
  interface Attributes {
    css?: CSSProp;
  }
}

declare module "*.jpg";
declare module "*.png";
