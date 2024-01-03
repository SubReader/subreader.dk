import React from "react";

const BurgerMenu = props => {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0)">
        <path
          d="M0.875 14H16.625M0.875 6.125H27.125H0.875Z"
          stroke={props.fill || "#fff"}
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M0.875 21.875H27.125"
          stroke={props.fill || "#fff"}
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="28" height="28" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default BurgerMenu;
