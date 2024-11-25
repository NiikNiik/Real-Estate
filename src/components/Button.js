import React, { useState } from "react";
import styles from "../config/styles";

const Button = ({
  label,
  style,
  backgroundColor,
  color,
  fontSize,
  fontWeight,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const buttonStyle = {
    ...styles.button,
    ...style,
    backgroundColor,
    color,
    fontSize,
    fontWeight,
    opacity: isActive ? 0.8 : isHovered ? 0.9 : 1,
  };

  return (
    <button
      style={buttonStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
