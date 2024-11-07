import React, { useState } from "react";
import TextButton from "./TextButton";
import colors from "../config/colors";

const styles = {
  menuItem: {
    width: "100%",
    padding: "10px 0",
    position: "relative",
    cursor: "pointer",
  },
  subMenu: {
    position: "absolute",
    top: "0", // Align the top of the submenu with the top of the MenuItem
    left: "10vw",
    width: "7vw", // Double the current width
    backgroundColor: colors.white,
    boxShadow: "2px 0px 10px rgba(3,3,3,0.1)",
    display: "flex",
    flexDirection: "column",
    padding: "10px",
    borderBottomRightRadius: "5px", // Add rounded corner to the bottom right
    borderTopRightRadius: "5px", // Add rounded corner to the top right
  },
};

const MenuItem = ({ text, subMenuItems }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      style={styles.menuItem}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <TextButton>{text}</TextButton>
      {isHovered && subMenuItems.length > 0 && (
        <div style={styles.subMenu}>
          {subMenuItems.map((subItem, index) => (
            <TextButton key={index}>{subItem}</TextButton>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuItem;
