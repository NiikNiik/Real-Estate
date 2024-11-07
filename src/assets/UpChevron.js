import React from "react";
import colors from "../config/colors";

const UpChevron = ({ width = 20, height = 20 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 320 512"
      fill={colors.white}
    >
      <path d="M177 159.7L313 296c9.4 9.4 9.4 24.6 0 33.9l-23.2 23.2c-9.4 9.4-24.6 9.4-33.9 0L160 249l-96.9 96.1c-9.4 9.4-24.6 9.4-33.9 0L7 329.9c-9.4-9.4-9.4-24.6 0-33.9L143 159.7c9.4-9.4 24.6-9.4 34-.1z" />
    </svg>
  );
};

export default UpChevron;
