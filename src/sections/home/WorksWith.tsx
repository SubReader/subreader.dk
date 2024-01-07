import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import styled from "styled-components";
import Content from "../../components/Content";
import { useTranslation } from "react-i18next";

const WorksWithContainer = styled.section`
  padding: 150px 0;
  background: #fff;
  @media (min-width: 1550px) {
    padding: 270px 0 200px !important;
  }
  @media (min-width: 960px) {
    padding: 155px 0;
  }
`;

const Service = styled.li`
  margin: 1rem 1rem;
  place-self: center;
  max-height: 64px;
`;

const WorksWithContent = styled(Content)`
  padding: 2rem 1rem;
  text-align: center;
`;

const Heading = styled.h2`
  max-width: 700px;
  font-size: 7vw;
  padding: 0 1rem;
  box-sizing: border-box;
  margin: 2rem auto;
  @media (min-width: 500px) {
    font-size: 2.5rem;
  }
`;

const ServicesContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  max-width: 950px;
  justify-content: center;
  margin: 0 auto;
  padding: 0;
`;

const IMAGESQUERY = graphql`{
  netflix: file(relativePath: {eq: "partners/netflix-logo.png"}) {
    data: childImageSharp {
      gatsbyImageData(width: 128, layout: FIXED, placeholder: NONE)
    }
  }
  viaplay: file(relativePath: {eq: "partners/viaplay-logo.png"}) {
    data: childImageSharp {
      gatsbyImageData(width: 128, layout: FIXED, placeholder: NONE)
    }
  }
  disney: file(relativePath: {eq: "partners/disney-logo.png"}) {
    data: childImageSharp {
      gatsbyImageData(width: 128, layout: FIXED, placeholder: NONE)
    }
  }
  drtv: file(relativePath: {eq: "partners/drtv-logo.png"}) {
    data: childImageSharp {
      gatsbyImageData(width: 128, layout: FIXED, placeholder: NONE)
    }
  }
  nrktv: file(relativePath: {eq: "partners/nrktv-logo.png"}) {
    data: childImageSharp {
      gatsbyImageData(width: 128, layout: FIXED, placeholder: NONE)
    }
  }
}`;
type Service = {
  logo: string;
  alt: string;
};
type ServicesArray = string | TemplateStringsArray;

const WorksWith: React.FC = () => {
  const { t } = useTranslation();
  const services = useStaticQuery(IMAGESQUERY);

  const localServices = t<ServicesArray>("worksWith.services", {
    returnObjects: true,
  });

  return (
    <WorksWithContainer>
      <WorksWithContent>
        <Heading> {t("worksWith.title")}</Heading>
        <ServicesContainer>
          {Array.isArray(localServices) &&
            localServices.map(({ logo, alt }: Service, i: number) => (
              <Service key={i}>
                <GatsbyImage alt={alt} loading={"eager"} image={services[logo].data.gatsbyImageData} />
              </Service>
            ))}
        </ServicesContainer>
      </WorksWithContent>
    </WorksWithContainer>
  );
};

export default React.memo(WorksWith);
