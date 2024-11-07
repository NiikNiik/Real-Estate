import React, { useState } from "react";
import styles from "../config/styles";
import colors from "../config/colors";

const RoundCheckbox = ({ style, onChange }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const onClick = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    if (onChange) {
      onChange(newCheckedState);
    }
  };

  const checkboxStyle = {
    ...styles.RoundcheckboxContainer,
    ...style,
    border: `2px solid ${colors.primary}`,
    backgroundColor: isChecked ? colors.primary : "transparent",
    color: isChecked ? colors.white : colors.primary,
    opacity: isActive ? 0.8 : isHovered ? 0.9 : 1,
  };

  return (
    <div
      style={checkboxStyle}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
    >
      <div
        style={{
          ...styles.checkboxCheck,
          display: isChecked ? "block" : "none",
        }}
      >
        ✓
      </div>
      <input type="checkbox" style={styles.checkboxInput} />
    </div>
  );
};

export default RoundCheckbox;
