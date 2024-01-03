import React from "react";

const FacebookIcon = ({ iconColor = "white", ...props }) => {
  return (
    <svg
      width={32}
      height={32}
      viewBox="0 0 12 23"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill={iconColor}
        d="m3.0732 7.6776h-2.82v3.759h2.82v11.278h4.7v-11.278h3.422l0.337-3.76h-3.76v-1.566c0-0.898 0.18-1.253 1.048-1.253h2.712v-4.699h-3.58c-3.379 0-4.879 1.488-4.879 4.337v3.182z"
      />
    </svg>
  );
};

export default FacebookIcon;
