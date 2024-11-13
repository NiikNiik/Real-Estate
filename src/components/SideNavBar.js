import React, { useState, useEffect } from "react";
import colors from "../config/colors";
import MenuItem from "../components/MenuItem"; // Adjust the path as needed

const styles = {
  SideNavBar: {
    width: "10vw",
    height: "100vh",
    backgroundColor: colors.white,
    boxShadow: "2px 0px 10px rgba(3,3,3,0.1)",
    position: "fixed", // Fix the position
    top: "75px", // Position it below the TopNavBar
    left: "0px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start", // Align items to the left
    paddingTop: "20px",
    paddingLeft: "10px", // Add some padding to the left
    zIndex: 2, // Ensure it is above other elements
  },
  button: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    backgroundColor: "transparent", // Ensure background remains transparent
    color: colors.primary, // Adjust as needed
    border: "none",
    cursor: "pointer",
    textAlign: "left", // Align text to the left
    transition: "color 0.3s, font-weight 0.3s", // Smooth transition for hover effect
  },
  buttonHover: {
    color: colors.primary,
    fontWeight: "bold",
  },
  subMenu: {
    position: "fixed",
    left: "10vw",
    width: "20vw", // Double the current width
    backgroundColor: colors.white,
    boxShadow: "2px 0px 10px rgba(3,3,3,0.1)",
    display: "flex",
    flexDirection: "column",
    padding: "10px",
    zIndex: 13, // Ensure it is above the SideNavBar
  },
};

const subMenuItems = {
  "Buy Homes": [85, "New Homes", "Foreclosures", "Open Houses"],
  "Rent Homes": [145, "Apartments", "Houses", "Condos"],
  "Sell Homes": [205, "Home Value", "Sellers Guide"],
  Compare: [265, "Price Trends", "Market Analysis"],
  "Saved Searches": [325, "Recent Searches", "Saved Listings"],
  "Home Loans": [385, "Mortgage Rates", "Refinance"],
  "Find an Agent": [445, "Real Estate Agents", "Mortgage Brokers"],
  Help: [505, "FAQs", "Contact Support"],
};

const SideNavBar = (props) => {
  const [hoveredButton, setHoveredButton] = useState(null);
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [isSubMenuHovered, setIsSubMenuHovered] = useState(false);

  useEffect(() => {
    let timer;
    if (hoveredButton !== null || isSubMenuHovered) {
      timer = setTimeout(() => {
        setShowSubMenu(true);
      }, 200);
    } else {
      setShowSubMenu(false);
    }

    // Cleanup function to clear timeout
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [hoveredButton, isSubMenuHovered]); // Removed hoverTimer from dependencies

  const handleButtonClick = (text) => {
    console.log(`${text} button clicked`);
  };

  const handleHoverChange = (index, isHovered) => {
    if (isHovered) {
      console.log(`Hovered over: ${Object.keys(subMenuItems)[index]}`);
      setHoveredButton(index);
    } else {
      setHoveredButton(null);
    }
  };

  return (
    <div>
      <div
        style={styles.SideNavBar}
        onMouseLeave={() => {
          if (!isSubMenuHovered) setHoveredButton(null);
        }}
      >
        {Object.keys(subMenuItems).map((text, index) => (
          <MenuItem
            key={index}
            text={text}
            subMenuItems={subMenuItems[text].slice(1)}
            style={{
              ...styles.button,
              ...(hoveredButton === index ? styles.buttonHover : {}),
            }}
            externalHoverState={hoveredButton === index}
            onHoverChange={(isHovered) => handleHoverChange(index, isHovered)}
            onClick={() => handleButtonClick(text)}
            onMouseEnter={() => setHoveredButton(index)}
          />
        ))}
        {props.children}
      </div>
      {showSubMenu && hoveredButton !== null && (
        <div
          style={{
            ...styles.subMenu,
            top: `${
              subMenuItems[Object.keys(subMenuItems)[hoveredButton]][0] - 75
            }px`,
          }}
          onMouseEnter={() => setIsSubMenuHovered(true)}
          onMouseLeave={() => setIsSubMenuHovered(false)}
        >
          {subMenuItems[Object.keys(subMenuItems)[hoveredButton]]
            .slice(1)
            .map((item, idx) => (
              <MenuItem
                key={idx}
                text={item}
                subMenuItems={[]}
                style={styles.button}
                onClick={() => handleButtonClick(item)}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default SideNavBar;
