import React, { useState } from "react";
import AppText from "./Text";
import colors from "../config/colors";

const TextButton = ({
  children,
  style,
  color = colors.primary,
  externalHoverState = null,
  onHoverChange = () => {},
  ...otherProps
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHoverChange(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHoverChange(false);
  };

  const textButtonStyle = {
    ...style,
    display: "flex",
    alignItems: "center",
    opacity: isHovered || externalHoverState ? 0.9 : 1,
    color: isHovered || externalHoverState ? color : colors.black,
    fontWeight: isHovered || externalHoverState ? "bold" : "normal",
    cursor: "pointer",
  };

  return (
    <AppText
      style={textButtonStyle}
      {...otherProps}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </AppText>
  );
};

export default TextButton;
