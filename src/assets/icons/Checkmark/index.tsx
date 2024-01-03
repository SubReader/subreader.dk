import React from "react";
const CheckmarkIcon = ({ stroke }) => {
  return (
    <svg
      width="14"
      height="11"
      viewBox="0 0 14 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 5.375L5.125 9.5L13 1.25"
        stroke={stroke || "#21FED1"}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default CheckmarkIcon;
