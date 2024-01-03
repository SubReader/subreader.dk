import React from "react";

export default ({ iconColor = "#fff", ...props }) => {
  return (
    <svg
      width={32}
      height={32}
      viewBox="0 0 22 16"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill={iconColor}
        d="m10.923 8.9639-10.875-8.814h21.751l-10.876 8.814zm-4.923-1.653-5.966-4.836v11.344l5.966-6.508zm9.846 0 5.966 6.508v-11.344l-5.966 4.836zm-1.413 1.144-3.51 2.845-3.51-2.845-7.359 8.029h21.739l-7.36-8.03v1e-3z"
      />
    </svg>
  );
};
