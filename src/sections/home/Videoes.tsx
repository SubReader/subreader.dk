/* import React, { ReactElement } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Section = styled.section`
  background: #dae7f1;
  padding: 2rem 0;
`;
const Video = styled.div`
  position: relative;
  display: block !important;
  width: 100%;
  padding-bottom: 56.25%;
  margin: 0 auto;
  max-width: 500px;
  z-index: 0;
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  transition: all 0.5s;
  @media (min-width: 500px) {
    padding-bottom: 281px;
  }
`;

const Carousel = styled(Slider)`
  .slick-center > div > div {
    @media (min-width: 800px) {
      max-width: 600px;
      padding: 0 0 337px 0;
    }
  }

  .slick-active {
    opacity: 0.7;
  }
  .slick-center,
  .slick-current {
    opacity: 1;
  }

  .slick-current > div > div {
    @media (max-width: 700px) {
      iframe {
        top: 2%;
        left: 2%;
        width: 96%;
        height: 96%;
      }
    }
  }

  .slick-track {
    display: flex;
    min-height: 425px;
    align-items: center;
  }
`;

const Heading = styled.h2`
  text-align: Center;
`;

const config = {
  arrows: false,
  dragable: false,
  touchMove: false,
  centerPadding: "0px",
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  centerMode: true,
  responsive: [
    {
      breakpoint: 1850,
      settings: {
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 800,
      settings: {
        centerMode: false,
        slidesToShow: 1,
      },
    },
  ],
};

const videoes = [
  "https://www.youtube.com/embed/oFMrDHuKVxA",
  "https://www.youtube.com/embed/4juM_UN6RwQ",
  "https://www.youtube.com/embed/8gwon7pRKes",
  "https://www.youtube.com/embed/V1IxELNO_fc",
];

const VideoSection = (): ReactElement => {
  return (
    <Section>
      <Heading>SubReader Videoer</Heading>
      <Carousel {...config}>
        {videoes.map((src, i) => (
          <Video key={src + i}>
            <iframe
              src={src}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen={true}
            ></iframe>
          </Video>
        ))}
      </Carousel>
    </Section>
  );
};

export default VideoSection;
 */
