import React, { ReactElement } from "react";
import styled from "styled-components";
import ImageContainer from "../ImageContainer";
import { useTranslation } from "react-i18next";
import { analytics } from "../../analytics";
function importAll(r) {
  let images = {};
  r.keys().map(item => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

const images = importAll(
  require.context("../../images/downloadButtons", false, /\.(png|jpe?g|svg)$/)
);

const Button = styled.a`
  appearance: none;
  border: none;
  height: auto;
  background: none;
  margin: 1rem 0.875rem 0 0;
  padding: 0;
  & > div {
    width: 178px;
    pointer-events: none;
    img {
      border-radius: 6px;
    }
  }
`;

type AnalyticsEventStr = string;

interface Props {
  apple?: boolean;
}
const trackAnalytics = (e: any, analyticsEventStr: AnalyticsEventStr): void => {
  e.preventDefault();
  e.persist();
  analytics.track(analyticsEventStr, undefined, undefined, () => {
    window.location.href = e.target.href;
  });
};

const DownloadButton: React.FC<Props> = ({ apple }): ReactElement => {
  const { t } = useTranslation("info");

  if (!apple) {
    return (
      <Button
        onClick={e => trackAnalytics(e, "Google play lead")}
        aria-label={t("downloadButtons.google.aria")}
        href={t("downloadButtons.google.href")}
      >
        <ImageContainer
          alt={t("downloadButtons.google.aria")}
          src={images[t("downloadButtons.google.src")].default}
        />
      </Button>
    );
  }

  return (
    <Button
      onClick={e => trackAnalytics(e, "App store lead")}
      aria-label={t("downloadButtons.apple.aria")}
      href={t("downloadButtons.apple.href")}
    >
      <ImageContainer
        inline={{ width: "161px" }}
        alt={t("downloadButtons.apple.aria")}
        src={images[t("downloadButtons.apple.src")].default}
      />
    </Button>
  );
};

export default DownloadButton;
