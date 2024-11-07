import React from "react";
import colors from "../config/colors";

const DownChevron = ({ width = 20, height = 20, color = colors.white }) => {
  // Added color prop with default value
  return (
    <svg width={width} height={height} viewBox="0 0 320 512">
      <path
        d="M143 352.3L7 216c-9.4-9.4-9.4-24.6 0-33.9l23.2-23.2c9.4-9.4 24.6-9.4 33.9 0L160 263l96.9-96.1c9.4-9.4 24.6-9.4 33.9 0l23.2 23.2c9.4 9.4 9.4 24.6 0 33.9L177 352.3c-9.4 9.4-24.6 9.4-34 .1z"
        fill={color} // Use the color prop
      />
    </svg>
  );
};

export default DownChevron;
