import React from "react";
import styles from "../config/styles";

function AppText({ children, style, ...otherProps }) {
  return (
    <span
      style={{
        ...styles.text,
        display: "block", // Make span behave like a block element
        margin: "0.92em 0", // Add margins similar to <p> element
        ...style,
      }}
      {...otherProps}
    >
      {children}
    </span>
  );
}

export default AppText;
