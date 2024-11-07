import React from "react";
import colors from "../config/colors";

const MagnifyingGlassIcon = ({ width = 20, height = 20 }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill={colors.dark}>
      <path d="M10,2A8,8,0,1,0,18,10a8,8,0,0,0-8-8Zm0,14A6,6,0,1,1,16,10,6,6,0,0,1,10,16ZM21.71,20.29,18,16.59V16h-1l-1,1,3.71,3.71a1,1,0,0,0,1.41-1.41Z" />
    </svg>
  );
};

export default MagnifyingGlassIcon;
