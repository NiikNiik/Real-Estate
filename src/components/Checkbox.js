import React, { useState, useEffect } from "react";
import styles from "../config/styles";
import colors from "../config/colors";

const Checkbox = ({ style, onChange, isChecked: isCheckedProp }) => {
  const [isChecked, setIsChecked] = useState(isCheckedProp);
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsChecked(isCheckedProp);
  }, [isCheckedProp]);

  const onClick = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    if (onChange) {
      onChange(newCheckedState);
    }
  };

  const checkboxStyle = {
    ...styles.checkboxContainer,
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

export default Checkbox;
