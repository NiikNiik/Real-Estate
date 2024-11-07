import React from "react";
import styles from "../config/styles"; 

function AppText({ children, style, ...otherProps }) {
  return (
    <p style={{ ...styles.text, ...style }} {...otherProps}>
      {children}
    </p>
  );
}

export default AppText;

