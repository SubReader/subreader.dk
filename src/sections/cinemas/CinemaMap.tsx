import React, { useState, ReactElement, useEffect } from "react";
import styled from "styled-components";
import GoogleMapReact from "google-map-react";
import { gql, useQuery } from "@apollo/client";
import Marker from "../../components/CinemaMarker";
import { useTranslation } from "react-i18next";

const Section = styled.section`
  padding: 150px 0 100px;
  box-sizing: Border-box;
  max-width: 1750px;
  margin: 0 auto;
  @media (min-width: 960px) {
    padding: 200px 0 100px;
  }
`;

const MapArticle = styled.article`
  max-width: 700px;
  width: 100%;
  height: 500px;
  margin: 0 auto;
`;

const defaultProps = {
  defaultCenter: {
    lat: 56.2639,
    lng: 10.5018,
  },
  defaultZoom: 7,
  bootstrapURLKeys: { key: process.env.GATSBY_GOOGLE_APIKEY },
};

const Heading = styled.h2`
  text-align: center;
  font-size: 2rem;
`;

const CINEMAQUERY = gql`
  query {
    cinemas {
      id
      name
      phone
      address
      location {
        latitude
        longitude
      }
    }
  }
`;
interface cinemaProps {
  id;
  name;
  address;
  phone;
  location: {
    latitude;
    longitude;
  };
}

type Location = {
  lat: number;
  lng: number;
};

interface showInfoType {
  id: Number;
  location: {
    latitude: number;
    longitude: number;
  };
}

async function getGeo(): Promise<Location | undefined> {
  const pos: any = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
  return { lat: pos.coords.latitude, lng: pos.coords.longitude };
}

const CinemaMap: React.FC = (): ReactElement => {
  const { t } = useTranslation("cinema");
  const [showInfo, setShowInfo] = useState<showInfoType | null>(null);
  const [center, setCenter] = useState<Location | null>();
  const { data } = useQuery(CINEMAQUERY, {
    context: { authenticate: false },
  });

  useEffect(() => {
    if (!center) {
      (async () => {
        const geoLocation = await getGeo();
        if (geoLocation && !showInfo) setCenter(geoLocation);
      })();
    }
  }, [data]);

  useEffect(() => {
    if (center && data && showInfo) {
      setCenter({
        lat: showInfo.location.latitude,
        lng: showInfo.location.longitude,
      });
    }
  }, [showInfo]);

  return (
    <Section>
      <Heading>{t("cinema.heading")}</Heading>
      <MapArticle>
        <GoogleMapReact {...defaultProps} center={center}>
          {data &&
            data.cinemas.map((cinema: cinemaProps) => (
              <Marker
                key={cinema.id}
                show={showInfo && showInfo.id === cinema.id}
                lng={cinema.location.longitude}
                lat={cinema.location.latitude}
                setShowInfo={setShowInfo}
                cinema={cinema}
              />
            ))}
        </GoogleMapReact>
      </MapArticle>
    </Section>
  );
};

export default CinemaMap;
