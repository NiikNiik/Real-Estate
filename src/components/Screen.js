import React from "react";
import styles from "../config/styles";

function Screen({ children, style }) {
  return <div style={{ ...styles.Screen, ...style }}>{children}</div>;
}

export default Screen;
