import React, { ReactElement } from "react";
import styled from "styled-components";
import markerSrc from "../../images/cinemas/subreader-marker.png";
import { RiCloseLine } from "react-icons/ri";
import { FaAddressBook } from "react-icons/fa";
import { AiFillPhone } from "react-icons/ai";
type Location = {
  longitude: number;
  latitude: number;
};
type Cinema = {
  id: number;
  name: string;
  phone: string;
  address: string;
  location: Location;
};
interface MarkerProps {
  cinema: Cinema;
  lat: number;
  lng: number;
  show: boolean;
  setShowInfo: Function;
}

const MapIcon = styled.img`
  transform: translate(-50%, -50%);
  position: absolute;
  user-select: none;
  cursor: pointer;
`;

const CloseIcon = styled(RiCloseLine)`
  color: #000;
  position: absolute;
  right: 0;
  top: 0;
  font-size: 2rem;
  opacity: 0.5;
  cursor: pointer;
  transition: opacity 0.2s;
  &:hover {
    opacity: 1;
  }
`;

const MarkerArticle = styled.article`
  position: relative;
  min-width: 300px;
  min-height: 170px;
  background-color: #fff;
  border: 2px solid #fff;
  z-index: 20;
  box-sizing: border-box;
  padding: 0 2rem;
  border-radius: 10px;
  transform: translate(calc(-50% + 10px), -100%);
  &::after {
    content: "";
    bottom: 0;
    border-right: 20px transparent solid;
    border-top: 20px #fff solid;
    border-bottom: 20px transparent solid;
    position: absolute;
    left: 50%;
    border-left: 20px transparent solid;
    transform: translate(calc(-50% - 10px), 100%);
  }
`;

const AddressIcon = styled(FaAddressBook)`
  margin-right: 10px;
  font-size: 1.5rem;
`;

const PhoneIcon = styled(AiFillPhone)`
  margin-right: 10px;
  font-size: 1.5rem;
`;

const Heading = styled.h4`
  font-size: 1rem;
  color: var(--primaryHeading);
  text-align: Center;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  color: #000;
  list-style: none;
`;
const Item = styled.li`
  display: flex;
  margin-bottom: 1rem;
  font-size: 1rem;
  align-items: center;
`;

const Marker: React.FC<MarkerProps> = ({
  show,
  setShowInfo,
  cinema,
}): ReactElement => {
  return (
    <>
      {!show && (
        <MapIcon
          src={markerSrc}
          onClick={() =>
            setShowInfo({ id: cinema.id, location: cinema.location })
          }
        />
      )}
      {show && (
        <MarkerArticle>
          <CloseIcon onClick={() => setShowInfo(null)} />
          <Heading>{cinema.name}</Heading>
          <List>
            {cinema.address && (
              <Item>
                <AddressIcon aria-label="Addresse:" />
                {cinema.address}
              </Item>
            )}
            {cinema.phone && cinema.phone.length > 3 && (
              <Item>
                <PhoneIcon aria-label="Telefon nummer:" />
                <a href={"tel:" + cinema.phone}>{cinema.phone}</a>
              </Item>
            )}
          </List>
        </MarkerArticle>
      )}
    </>
  );
};
export default Marker;
