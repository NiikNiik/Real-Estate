import React, { useState } from "react";
import styles from "../config/styles";
import colors from "../config/colors";

function AppTextInput({ placeholder, width = "100%", style, ...otherProps }) {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const textInputStyle = {
    ...style,
    border:
      isFocused || isHovered ? `1px solid ${colors.primary}` : "1px solid #ccc",
    outline: "none",
  };

  return (
    <div
      style={{ ...styles.InputContainer, width }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <input
        type="text"
        placeholder={placeholder}
        style={{ ...styles.textInput, ...textInputStyle }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...otherProps}
      />
    </div>
  );
}

export default AppTextInput;
