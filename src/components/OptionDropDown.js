import React, { useState, useEffect } from "react";
import colors from "../config/colors";
import Button from "./Button";
import DownChevron from "../assets/DownChevron";
import UpChevron from "../assets/UpChevron";
import Checkbox from "./Checkbox";
import TextButton from "./TextButton";

const styles = {
  button: {
    cursor: "pointer",
    border: "0",
    boxSizing: "border-box",
    borderRadius: "30px",
    fontFamily: "Roboto",
    outline: "none",
    backgroundColor: colors.primary,
    color: colors.white,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px 20px",
    gap: "10px",
  },
  dropdown: {
    position: "absolute",
    top: "50px",
    left: "0",
    width: "200px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
    flexDirection: "column",
    zIndex: 1000,
  },
  dropdownWide: {
    width: "420px",
  },
  dropdownItem: {
    padding: "10px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    color: colors.dark,
    gap: "10px",
  },
  dropdownItemHover: {
    backgroundColor: colors.primary,
    color: colors.white,
  },
  dropdownItemForSaleHover: {
    backgroundColor: colors.white,
    color: colors.primary,
  },
  noHover: {
    backgroundColor: "inherit",
    color: colors.dark,
  },
  applyButtonContainer: {
    display: "flex",
    justifyContent: "center",
  },
  applyButton: {
    width: "115px",
    padding: "10px 0px",
    marginTop: "10px",
    marginBottom: "10px",
  },
  applyButtonWide: {
    // New style for wider "Beds & Baths" button
    width: "250px", // Adjust width as needed
    padding: "10px 0px",
    marginTop: "10px",
    marginBottom: "10px",
  },
  circle: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    border: `2px solid ${colors.dark}`,
  },
  circleFilled: {
    backgroundColor: colors.primary,
  },
  spacer: {
    height: "10px",
  },
  specialItem: {
    color: colors.light,
    backgroundColor: colors.secondary,
  },
  homeTypeFirstItem: {
    color: colors.light,
    backgroundColor: colors.secondary,
    fontWeight: "bold",
  },
  homeTypeBoldItem: {
    fontWeight: "bold",
  },
};

const OptionDropDown = ({
  text,
  items,
  isOpen,
  toggleDropdown,
  shouldUpdateText,
  exactMatch,
  onExactMatchChange,
  itemList, // New prop for the list of items
  onSelect, // Add onSelect prop
  isHomeType, // Add isHomeType prop
}) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [selectedItems, setSelectedItems] = useState(
    text === "For Sale" ? ["For Sale"] : []
  );
  const [selectAllText, setSelectAllText] = useState("Select All");

  useEffect(() => {
    if (isHomeType) {
      const allItems = itemList.filter(
        (item) => item !== "Select All" && item !== "Space"
      );
      if (selectedItems.length === allItems.length) {
        setSelectAllText("Deselect All");
      } else {
        setSelectAllText("Select All");
      }
    }
  }, [selectedItems, isHomeType, itemList]);

  const handleItemClick = (item, isChecked) => {
    if (text === "For Sale") {
      setSelectedItems([item]);
    } else {
      setSelectedItems((prevSelectedItems) =>
        isChecked
          ? [...prevSelectedItems, item]
          : prevSelectedItems.filter((i) => i !== item)
      );
    }
    if (onSelect) {
      onSelect(item); // Call onSelect handler
    }
  };

  const handleSelectAll = () => {
    const allItems = itemList.filter(
      (item) => item !== "Select All" && item !== "Space"
    );
    if (selectedItems.length === allItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(allItems);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <button style={styles.button} onClick={toggleDropdown}>
        <span>{shouldUpdateText ? selectedItems.join(", ") : text}</span>{" "}
        {isOpen ? <UpChevron /> : <DownChevron />}
      </button>
      {isOpen && (
        <div
          style={{
            ...styles.dropdown,
            ...(itemList.includes("Number of Bedrooms") && styles.dropdownWide),
          }}
        >
          {itemList.map((item, index) => (
            <React.Fragment key={index}>
              <div
                style={{
                  ...styles.dropdownItem,
                  ...(hoveredItem === index &&
                  !isHomeType && // Skip hover styles if isHomeType is true
                    !itemList.includes("Number of Bedrooms") &&
                    (text === "For Sale"
                      ? styles.dropdownItemForSaleHover
                      : styles.dropdownItemHover)),
                  ...(item === "Number of Bedrooms" ||
                  item === "Number of Bathrooms"
                    ? styles.specialItem
                    : {}),
                  ...(isHomeType &&
                    (item === "Select All" || index === 0) && {
                      backgroundColor: colors.secondary,
                    }), // Add background color for "Select All" and first "Home Type" option
                  ...(isHomeType &&
                    item === "Space" && {
                      backgroundColor: colors.secondary,
                      fontWeight: "bold",
                      cursor: "default",
                    }), // Add background color and bold style for "Space"
                }}
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() =>
                  handleItemClick(item, !selectedItems.includes(item))
                }
              >
                {isHomeType &&
                  index !== 0 &&
                  item !== "Select All" &&
                  item !== "Space" && (
                    <Checkbox
                      style={{
                        display: "flex",
                        marginRight: "5px",
                        width: "20px",
                        height: "20px",
                        backgroundColor: colors.primary,
                        color: colors.white,
                        justifyContent: "center",
                      }}
                      isChecked={selectedItems.includes(item)}
                      onChange={(isChecked) => handleItemClick(item, isChecked)}
                    />
                  )}
                {isHomeType && item === "Select All" && (
                  <TextButton
                    style={{
                      display: "flex",
                      marginRight: "5px",
                      justifyContent: "center",
                      color: colors.white, // Ensure text color is readable
                    }}
                    onClick={handleSelectAll}
                  >
                    {selectAllText}
                  </TextButton>
                )}
                {!isHomeType && text === "For Sale" && (
                  <div
                    style={{
                      ...styles.circle,
                      ...(selectedItems.includes(item) && styles.circleFilled),
                    }}
                  />
                )}
                {!isHomeType && item === "Use exact match" && (
                  <Checkbox
                    style={{
                      display: "flex",
                      marginRight: "5px",
                      width: "20px",
                      height: "20px",
                      backgroundColor: colors.primary,
                      color: colors.white,
                      justifyContent: "center",
                    }}
                    checked={exactMatch}
                    onChange={onExactMatchChange}
                  />
                )}
                {item !== "Select All" && (
                  <span
                    style={{
                      fontWeight:
                        item === "Bedrooms" ||
                        item === "Bathrooms" ||
                        (isHomeType && index === 0) ||
                        (isHomeType && item === "Space")
                          ? "bold"
                          : "normal",
                    }}
                  >
                    {item}
                  </span>
                )}
              </div>
              {(item === "Number of Bedrooms" ||
                item === "Number of Bathrooms") && (
                <div style={styles.spacer} />
              )}
            </React.Fragment>
          ))}
          {isHomeType && (
            <div style={styles.applyButtonContainer}>
              <Button
                label="Apply"
                style={styles.applyButton} // Use the normal apply button style
                backgroundColor={colors.primary}
                color={colors.white}
                onClick={toggleDropdown}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OptionDropDown;
