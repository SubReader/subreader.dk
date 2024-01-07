import React from "react";
import "./style.css";
import Main from "../Main";
import Header, { HeaderProps } from "../Header";
import Footer from "../Footer";

interface LayoutProps {
  headerProps?: HeaderProps;
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children, headerProps }) => (
  <>
    <Header {...headerProps} />
    <Main>{children}</Main>
    <Footer />
  </>
);

export default Layout;
