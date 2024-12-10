import React, { useState, useEffect } from "react";
import colors from "../config/colors";
import Button from "./Button";
import DownChevron from "../assets/DownChevron";
import UpChevron from "../assets/UpChevron";
import Checkbox from "./Checkbox";
import TextButton from "./TextButton";
import eventEmitter from "../eventEmitter";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
    width: "250px",
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
  specialTitle: {
    fontSize: "16px",
    fontWeight: "bold",
    paddingTop: "10px",
  },
};

const OptionDropDown = ({
  text,
  items,
  isOpen,
  toggleDropdown,
  shouldUpdateText,
  itemList, // New prop for the list of items
  onSelect, // Add onSelect prop
  isHomeType, // Add isHomeType prop
  isPrice, // Receive the isPrice flag
}) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [forSaleSelection, setForSaleSelection] = useState("For Sale");
  const [selectedItems, setSelectedItems] = useState(
    text === "For Sale" ? ["For Sale"] : []
  );

  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const handleForSaleSelectionChange = (value) => {
      setForSaleSelection(value); // Update forSaleSelection when the event is received
    };

    eventEmitter.on("forSaleSelectionChange", handleForSaleSelectionChange);

    return () => {
      eventEmitter.off("forSaleSelectionChange", handleForSaleSelectionChange);
    };
  }, []);
  const [selectAllText, setSelectAllText] = useState("Select All");

  const currentYear = new Date().getFullYear();
  const [selectedYearMin, setSelectedYearMin] = useState(""); // Add this line
  const [selectedYearMax, setSelectedYearMax] = useState(""); // Add this line

  const [selectedValues, setSelectedValues] = useState({});

  const handleInputChange = (event, index, setInputValue) => {
    const inputValue = event.target.value;
    // Regular expression to match only integers
    const integerRegex = /^[0-9]+$/;
    if (integerRegex.test(inputValue) || inputValue === "") {
      setInputValue(inputValue);
    }
  };

  const [bedsAndBathsTitle, setBedsAndBathsTitle] = useState("Beds & Baths"); // State to store the title

  useEffect(() => {
    const handleBedsAndBathsTitleChange = (title) => {
      setBedsAndBathsTitle(title); // Update the state when the event is received
    };

    eventEmitter.on("bedsAndBathsTitleChange", handleBedsAndBathsTitleChange); // Listen for the event

    // Clean up the listener when the component unmounts
    return () => {
      eventEmitter.off(
        "bedsAndBathsTitleChange",
        handleBedsAndBathsTitleChange
      );
    };
  }, []);

  const boldItemsForSaleOrSold = [
    "Max HOA",
    "Listing Type",
    "Property Status",
    "Tours",
    "Parking Spots",
    "Square Feet",
    "Lot Size",
    "Year Built",
    "Basement",
    "Number of Stories",
    "Senior Living",
    "Other Amenities",
    "View",
    "Days Listed",
  ];

  const boldItemsForRent = [
    "Move-In-Date",
    "Square Feet",
    "Lot Size",
    "Year Built",
    "Basement",
    "Number of Stories",
    "Tours",
    "Other Amenities",
    "View",
    "Days Listed",
  ];

  const moreItemsForSaleOrSoldWithCheckboxes = [
    "Owner posted",
    "Agent listed",
    "New Construction",
    "Foreclosures",
    "Auctions",
    "Forclosed",
    "Pre-forclosures",
    "Coming soon",
    "Accepting backup offers",
    "Pending & under contract",
    "Must have open house",
    "Must have garage",
    "Has basement",
    "Single-story only",
    "Hide communities",
    "Must have A/C",
    "Must have pool",
    "Waterfront",
    "City",
    "Mountain",
    "Park",
    "Water",
  ];

  const moreItemsForRentWithCheckboxes = [
    "Has basement",
    "Single-story only",
    "Instant Tour Available",
    "Must have A/C",
    "Must have pool",
    "Waterfront",
    "On-site Parking",
    "In-unit Laundry",
    "Income restricted",
    "Hardwood Floors",
    "Disabled Access",
    "Utilities Included",
    "Short term lease available",
    "Furnished",
    "Outdoor space",
    "Controlled access",
    "High speed internet",
    "Elevator",
    "Apartment Community",
    "City",
    "Mountain",
    "Park",
    "Water",
  ];

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
      if (onSelect) {
        onSelect(item);
      }
      toggleDropdown(); // Close dropdown after selection
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

  const handleApplyClick = () => {
    toggleDropdown(false);
  };

  useEffect(() => {
    const generateJSONMessage = () => {
      const message = {};
      if (text === "For Sale") {
        message["SaleType"] = selectedItems[0];
      } else if (text === "Price") {
        message["Price"] = {};
        itemList.forEach((item, index) => {
          if (item === "Minimum - Maximum") {
            const minPrice = selectedValues[text + (index + 1) + "-min"] || "";
            const maxPrice = selectedValues[text + (index + 1) + "-max"] || "";
            message["Price"][item] = `${minPrice} - ${maxPrice}`;
          }
        });
      } else if (text === "Beds & Baths") {
        message["BedsAndBaths"] = bedsAndBathsTitle;
      } else if (text === "Home Type") {
        message["HomeType"] = Array.from(new Set(selectedItems));
      } else if (text === "More") {
        message["More"] = {};

        const uniqueCheckboxes = Array.from(
          new Set(
            selectedItems.filter(
              (item) =>
                moreItemsForSaleOrSoldWithCheckboxes.includes(item) ||
                moreItemsForRentWithCheckboxes.includes(item)
            )
          )
        );

        message["More"]["Checkboxes"] = uniqueCheckboxes;
        itemList.forEach((item, index) => {
          if (
            (item === "Max HOA" && forSaleSelection !== "For Rent") ||
            (item === "Days Listed" && forSaleSelection !== "For Rent") ||
            (item === "Parking Spots" && forSaleSelection !== "For Rent") ||
            item === "Year Built" ||
            item === "Square Feet" ||
            item === "Lot Size"
          ) {
            const minValue = selectedValues[text + (index + 1) + "-min"] || "";
            const maxValue = selectedValues[text + (index + 1) + "-max"] || "";
            message["More"][item] = `${minValue} - ${maxValue}`;
          }
        });
      }
      console.log(JSON.stringify(message, null, 2));
      eventEmitter.emit("filterChanged", message);
    };
    generateJSONMessage();
  }, [selectedItems, selectedValues, bedsAndBathsTitle, forSaleSelection]);

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
            ...(text === "More" && styles.dropdownWide),
            ...(text === "More" && { maxHeight: "300px", overflowY: "auto" }), // Enable vertical scrolling for "More" dropdown
          }}
        >
          {itemList.map((item, index) => (
            <React.Fragment key={index}>
              <div
                style={{
                  ...styles.dropdownItem,
                  ...(hoveredItem === index &&
                  !isHomeType &&
                  text !== "Price" &&
                  text !== "More" && // Skip hover styles for "More" dropdown
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
                  ...(text === "More" &&
                    index === 0 && {
                      backgroundColor: colors.secondary,
                    }), // Add background color for "Select All" and first "Home Type" option

                  ...(isHomeType &&
                    item === "Space" && {
                      backgroundColor: colors.secondary,
                      fontWeight: "bold",
                      cursor: "default",
                    }), // Add background color and bold style for "Space"
                  ...((boldItemsForSaleOrSold.includes(item) ||
                    boldItemsForRent.includes(item)) && {
                    marginTop: "10px",
                  }), // Add marginTop for bold items
                  ...(text === "Price" &&
                    index === 0 && {
                      // Add this line
                      backgroundColor: colors.secondary,
                      color: colors.light,
                    }),
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
                      color: colors.white,
                    }}
                    onClick={handleSelectAll}
                  >
                    {selectAllText}
                  </TextButton>
                )}
                {text === "Price" &&
                  index === itemList.indexOf("Minimum - Maximum") + 1 &&
                  forSaleSelection !== "For Rent" && (
                    <div style={{ display: "flex", gap: "10px" }}>
                      <select
                        style={{
                          display: "flex",
                          width: "100%",
                          height: "35px",
                          backgroundColor: colors.white,
                          color: colors.dark,
                          justifyContent: "center",
                        }}
                        onChange={(e) => {
                          handleItemClick(e.target.value, true);
                          setSelectedValues((prevValues) => ({
                            ...prevValues,
                            [text + index + "-min"]: e.target.value, // Unique key for the "min" dropdown
                          }));
                        }}
                        value={selectedValues[text + index + "-min"] || ""}
                      >
                        {/* Left dropdown */}
                        <option value="">No Min</option>
                        <option value="$0">$0</option>
                        <option value="$50,000">$50,000</option>
                        <option value="$100,000">$100,000</option>
                        <option value="$150,000">$150,000</option>
                        <option value="$200,000">$200,000</option>  
                        <option value="$250,000">$250,000</option>
                        <option value="$300,000">$300,000</option>
                        <option value="$350,000">$350,000</option>
                        <option value="$400,000">$400,000</option>
                        <option value="$450,000">$450,000</option>  
                        <option value="$500,000">$500,000</option>
                        <option value="$550,000">$550,000</option>
                        <option value="$600,000">$600,000</option>
                        <option value="$650,000">$650,000</option>
                        <option value="$700,000">$700,000</option>  
                        <option value="$750,000">$750,000</option>
                        <option value="$800,000">$800,000</option>
                        <option value="$850,000">$850,000</option>
                        <option value="$900,000">$900,000</option>  
                        <option value="$950,000">$950,000</option>
                        <option value="$1M">$1M</option>  
                        <option value="$1.25M">$1.25M</option>
                        <option value="$1.5M">$1.5M</option>
                        <option value="$1.75M">$1.75M</option>
                        <option value="$2M">$2M</option>
                        <option value="$2.25M">$2.25M</option>
                        <option value="$2.5M">$2.5M</option>
                        <option value="$2.75M">$2.75M</option>
                        <option value="$3M">$3M</option>
                        <option value="$3.25M">$3.25M</option>
                        <option value="$3.5M">$3.5M</option>
                        <option value="$3.75M">$3.75M</option>
                        <option value="$4M">$4M</option>
                        <option value="$4.25M">$4.25M</option>
                        <option value="$4.5M">$4.5M</option>
                        <option value="$4.75M">$4.75M</option>
                        <option value="$5M">$5M</option>
                        <option value="$6M">$6M</option>
                        <option value="$7M">$7M</option>
                        <option value="$8M">$8M</option>
                        <option value="$9M">$9M</option>
                        <option value="$10M">$10M</option>
                        <option value="$11M">$11M</option>
                        <option value="$12M">$12M</option>
                        <option value="$13M">$13M</option>
                        <option value="$14M">$14M</option>
                        <option value="$15M">$15M</option>
                        <option value="$16M">$16M</option>
                        <option value="$17M">$17M</option>
                        <option value="$18M">$18M</option>  {" "}
                      </select>
                      <select
                        style={{
                          display: "flex",
                          width: "100%",
                          height: "35px",
                          backgroundColor: colors.white,
                          color: colors.dark,
                          justifyContent: "center",
                        }}
                        onChange={(e) => {
                          handleItemClick(e.target.value, true);
                          setSelectedValues((prevValues) => ({
                            ...prevValues,
                            [text + index + "-max"]: e.target.value, // Unique key for the "max" dropdown
                          }));
                        }}
                        value={selectedValues[text + index + "-max"] || ""}
                      >
                        {/* Right dropdown */}
                        <option value="">No Max</option>
                        <option value="$50,000">$50,000</option>
                        <option value="$100,000">$100,000</option>
                        <option value="$150,000">$150,000</option>
                        <option value="$200,000">$200,000</option>  
                        <option value="$250,000">$250,000</option>
                        <option value="$300,000">$300,000</option>
                        <option value="$350,000">$350,000</option>
                        <option value="$400,000">$400,000</option>
                        <option value="$450,000">$450,000</option>  
                        <option value="$500,000">$500,000</option>
                        <option value="$550,000">$550,000</option>
                        <option value="$600,000">$600,000</option>
                        <option value="$650,000">$650,000</option>
                        <option value="$700,000">$700,000</option>  
                        <option value="$750,000">$750,000</option>
                        <option value="$800,000">$800,000</option>
                        <option value="$850,000">$850,000</option>
                        <option value="$900,000">$900,000</option>  
                        <option value="$950,000">$950,000</option>
                        <option value="$1M">$1M</option>  
                        <option value="$1.25M">$1.25M</option>
                        <option value="$1.5M">$1.5M</option>
                        <option value="$1.75M">$1.75M</option>
                        <option value="$2M">$2M</option>
                        <option value="$2.25M">$2.25M</option>
                        <option value="$2.5M">$2.5M</option>
                        <option value="$2.75M">$2.75M</option>
                        <option value="$3M">$3M</option>
                        <option value="$3.25M">$3.25M</option>
                        <option value="$3.5M">$3.5M</option>
                        <option value="$3.75M">$3.75M</option>
                        <option value="$4M">$4M</option>
                        <option value="$4.25M">$4.25M</option>
                        <option value="$4.5M">$4.5M</option>
                        <option value="$4.75M">$4.75M</option>
                        <option value="$5M">$5M</option>
                        <option value="$6M">$6M</option>
                        <option value="$7M">$7M</option>
                        <option value="$8M">$8M</option>
                        <option value="$9M">$9M</option>
                        <option value="$10M">$10M</option>  
                        <option value="$11M">$11M</option>
                        <option value="$12M">$12M</option>
                        <option value="$13M">$13M</option>
                        <option value="$14M">$14M</option>
                        <option value="$15M">$15M</option>
                        <option value="$16M">$16M</option>
                        <option value="$17M">$17M</option>
                        <option value="$18M">$18M</option>
                      </select>
                    </div>
                  )}
                {text === "Price" &&
                  index === itemList.indexOf("Minimum - Maximum") + 1 &&
                  forSaleSelection === "For Rent" && (
                    <div style={{ display: "flex", gap: "10px" }}>
                      <select
                        style={{
                          display: "flex",
                          width: "100%",
                          height: "35px",
                          backgroundColor: colors.white,
                          color: colors.dark,
                          justifyContent: "center",
                        }}
                        onChange={(e) => {
                          handleItemClick(e.target.value, true);
                          setSelectedValues((prevValues) => ({
                            ...prevValues,
                            [text + index + "-min"]: e.target.value, // Unique key for the "min" dropdown
                          }));
                        }}
                        value={selectedValues[text + index + "-min"] || ""}
                      >
                        {/* Left dropdown */}
                        <option value="">No Min</option>
                        <option value="$200">$200</option>
                        <option value="$400">$400</option>
                        <option value="$600">$600</option>
                        <option value="$800">$800</option>
                        <option value="$1,000">$1,000</option>
                        <option value="$1,200">$1,200</option>
                        <option value="$1,400">$1,400</option>
                        <option value="$1,600">$1,600</option>
                        <option value="$1,800">$1,800</option>
                        <option value="$2,000">$2,000</option>
                        <option value="$2,200">$2,200</option>
                        <option value="$2,400">$2,400</option>
                        <option value="$2,600">$2,600</option>
                        <option value="$2,800">$2,800</option>
                        <option value="$3,000">$3,000</option>
                        <option value="$3,500">$3,500</option>
                        <option value="$4,000">$4,000</option>
                        <option value="$4,500">$4,500</option>
                        <option value="$5,000">$5,000</option>
                        <option value="$5,500">$5,500</option>  
                        <option value="$6,000">$6,000</option>
                        <option value="$7,000">$7,000</option>
                        <option value="$8,000">$8,000</option>
                        <option value="$9,000">$9,000</option>
                        <option value="$10,000">$10,000</option>
                      </select>{" "}
                       
                      <select
                        style={{
                          display: "flex",
                          width: "100%",
                          height: "35px",
                          backgroundColor: colors.white,
                          color: colors.dark,
                          justifyContent: "center",
                        }}
                        onChange={(e) => {
                          handleItemClick(e.target.value, true);
                          setSelectedValues((prevValues) => ({
                            ...prevValues,
                            [text + index + "-max"]: e.target.value, // Unique key for the "max" dropdown
                          }));
                        }}
                        value={selectedValues[text + index + "-max"] || ""}
                      >
                        {/* Right dropdown */}
                        <option value="">No Max</option>
                        <option value="$200">$200</option>
                        <option value="$400">$400</option>
                        <option value="$600">$600</option>
                        <option value="$800">$800</option>
                        <option value="$1,000">$1,000</option>
                        <option value="$1,200">$1,200</option>
                        <option value="$1,400">$1,400</option>
                        <option value="$1,600">$1,600</option>
                        <option value="$1,800">$1,800</option>
                        <option value="$2,000">$2,000</option>
                        <option value="$2,200">$2,200</option>
                        <option value="$2,400">$2,400</option>
                        <option value="$2,600">$2,600</option>
                        <option value="$2,800">$2,800</option>
                        <option value="$3,000">$3,000</option>
                        <option value="$3,500">$3,500</option>
                        <option value="$4,000">$4,000</option>
                        <option value="$4,500">$4,500</option>
                        <option value="$5,000">$5,000</option>
                        <option value="$5,500">$5,500</option>  
                        <option value="$6,000">$6,000</option>
                        <option value="$7,000">$7,000</option>
                        <option value="$8,000">$8,000</option>
                        <option value="$9,000">$9,000</option>
                        <option value="$10,000">$10,000</option>
                      </select>{" "}
                       
                    </div>
                  )}
                {text === "More" &&
                  (moreItemsForSaleOrSoldWithCheckboxes.includes(item) ||
                    moreItemsForRentWithCheckboxes.includes(item)) && (
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
                {text === "More" &&
                  index === itemList.indexOf("Move-In-Date") + 1 &&
                  forSaleSelection === "For Rent" && (
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => {
                        setSelectedDate(date);
                        handleItemClick(date, true); // Assuming you want to handle the date selection
                      }}
                      dateFormat="MM/dd/yyyy" // Customize the date format as needed
                      placeholderText="MM/DD/YYYY"
                      popperPlacement="bottom-end"
                      popperModifiers={{
                        offset: [5, 0],
                      }}
                    />
                  )}
                {text === "More" &&
                  index === itemList.indexOf("Max HOA") + 1 &&
                  forSaleSelection !== "For Rent" && (
                    <select
                      style={{
                        display: "flex",
                        marginRight: "5px",
                        width: "100%",
                        height: "35px",
                        backgroundColor: colors.white,
                        color: colors.dark,
                        justifyContent: "center",
                      }}
                      onChange={(e) => {
                        handleItemClick(e.target.value, true);
                        setSelectedValues((prevValues) => ({
                          ...prevValues,
                          [text + index]: e.target.value, // Unique key for each dropdown
                        }));
                      }}
                      value={selectedValues[text + index] || ""} // Set selected value
                    >
                      <option value="Any">Any</option>
                      <option value="No HOA Fee">No HOA Fee</option>
                      <option value="$50/month">$50/month</option>
                      <option value="$100/month">$100/month</option>
                      <option value="$200/month">$200/month</option>
                      <option value="$300/month">$300/month</option>
                      <option value="$400/month">$400/month</option>
                      <option value="$500/month">$500/month</option>
                      <option value="$600/month">$600/month</option>
                      <option value="$700/month">$700/month</option>
                      <option value="$800/month">$800/month</option>
                      <option value="$900/month">$900/month</option>
                      <option value="$1000/month">$1000/month</option>
                    </select>
                  )}
                {text === "More" &&
                  index === itemList.indexOf("Days Listed") + 1 && (
                    <select
                      style={{
                        display: "flex",
                        marginRight: "5px",
                        width: "100%",
                        height: "35px",
                        backgroundColor: colors.white,
                        color: colors.dark,
                        justifyContent: "center",
                      }}
                      onChange={(e) => {
                        handleItemClick(e.target.value, true);
                        setSelectedValues((prevValues) => ({
                          ...prevValues,
                          [text + index]: e.target.value, // Unique key for each dropdown
                        }));
                      }}
                      value={selectedValues[text + index] || ""} // Set selected value
                    >
                      <option value="Any">Any</option>
                      <option value="1 day">1 day</option>
                      <option value="7 days">7 days</option>
                      <option value="14 days">14 days</option>
                      <option value="30 days">30 days</option>
                      <option value="90 days">90 days</option>
                      <option value="6 months">6 months</option>
                      <option value="12 months">12 months</option>
                      <option value="24 months">24 months</option>
                      <option value="36 months">36 months</option>
                    </select>
                  )}
                {text === "More" &&
                  index === itemList.indexOf("Parking Spots") + 1 &&
                  forSaleSelection !== "For Rent" && (
                    <select
                      style={{
                        display: "flex",
                        marginRight: "5px",
                        width: "100%",
                        height: "35px",
                        backgroundColor: colors.white,
                        color: colors.dark,
                        justifyContent: "center",
                      }}
                      onChange={(e) => {
                        handleItemClick(e.target.value, true);
                        setSelectedValues((prevValues) => ({
                          ...prevValues,
                          [text + index]: e.target.value, // Unique key for each dropdown
                        }));
                      }}
                      value={selectedValues[text + index] || ""} // Set selected value
                    >
                      <option value="Any">Any</option>
                      <option value="1+">1+</option>
                      <option value="2+">2+</option>
                      <option value="3+">3+</option>
                      <option value="4+">4+</option>
                    </select>
                  )}
                {text === "More" &&
                  index === itemList.indexOf("Year Built") + 1 && (
                    <div style={{ display: "flex", gap: "10px" }}>
                      <input
                        type="text"
                        placeholder="No Min"
                        onChange={(event) =>
                          handleInputChange(event, 0, setSelectedYearMin)
                        }
                        value={selectedYearMin}
                      />
                      <input
                        type="text"
                        placeholder="No Max"
                        onChange={(event) =>
                          handleInputChange(event, 1, setSelectedYearMax)
                        }
                        value={selectedYearMax}
                        max={currentYear} // Use currentYear here
                      />
                    </div>
                  )}
                {text === "More" &&
                  index === itemList.indexOf("Square Feet") + 1 && (
                    <div style={{ display: "flex", gap: "10px" }}>
                      <select
                        style={{
                          display: "flex",
                          width: "100%",
                          height: "35px",
                          backgroundColor: colors.white,
                          color: colors.dark,
                          justifyContent: "center",
                        }}
                        onChange={(e) => {
                          handleItemClick(e.target.value, true);
                          setSelectedValues((prevValues) => ({
                            ...prevValues,
                            [text + index + "-min"]: e.target.value, // Unique key for the "min" dropdown
                          }));
                        }}
                        value={selectedValues[text + index + "-min"] || ""}
                      >
                        <option value="No Min">No Min</option>
                        <option value="500">500</option>
                        <option value="750">750</option>
                        <option value="1,000">1,000</option>
                        <option value="1,250">1,250</option>
                        <option value="2,000">2,000</option>
                        <option value="2,250">2,250</option>
                        <option value="2,500">2,500</option>
                        <option value="2,750">2,750</option>
                        <option value="3,000">3,000</option>
                        <option value="3,500">3,500</option>
                        <option value="4,000">4,000</option>
                        <option value="5,000">5,000</option>
                        <option value="7,500">7,500</option>
                      </select>
                      <select
                        style={{
                          display: "flex",
                          width: "100%",
                          height: "35px",
                          backgroundColor: colors.white,
                          color: colors.dark,
                          justifyContent: "center",
                        }}
                        onChange={(e) => {
                          handleItemClick(e.target.value, true);
                          setSelectedValues((prevValues) => ({
                            ...prevValues,
                            [text + index + "-max"]: e.target.value, // Unique key for the "max" dropdown
                          }));
                        }}
                        value={selectedValues[text + index + "-max"] || ""}
                      >
                        <option value="No Max">No Max</option>
                        <option value="500">500</option>
                        <option value="750">750</option>
                        <option value="1,000">1,000</option>
                        <option value="1,250">1,250</option>
                        <option value="2,000">2,000</option>
                        <option value="2,250">2,250</option>
                        <option value="2,500">2,500</option>
                        <option value="2,750">2,750</option>
                        <option value="3,000">3,000</option>{" "}
                        <option value="3,500">3,500</option>
                        <option value="4,000">4,000</option>
                        <option value="5,000">5,000</option>
                        <option value="7,500">7,500</option>
                      </select>
                    </div>
                  )}
                {text === "More" && index === itemList.indexOf("Lot Size") + 1 && (
                  <div style={{ display: "flex", gap: "10px" }}>
                    <select
                      style={{
                        display: "flex",
                        width: "100%",
                        height: "35px",
                        backgroundColor: colors.white,
                        color: colors.dark,
                        justifyContent: "center",
                      }}
                      onChange={(e) => {
                        handleItemClick(e.target.value, true);
                        setSelectedValues((prevValues) => ({
                          ...prevValues,
                          [text + index + "-min"]: e.target.value, // Unique key for the "min" dropdown
                        }));
                      }}
                      value={selectedValues[text + index + "-min"] || ""}
                    >
                      <option value="No Min">No Min</option>
                      <option value="1,000 sqft">1,000 sqft</option>
                      <option value="2,000 sqft">2,000 sqft</option>
                      <option value="3,000 sqft">3,000 sqft</option>
                      <option value="4,000 sqft">4,000 sqft</option>
                      <option value="5,000 sqft">5,000 sqft</option>
                      <option value="7,500 sqft">7,500 sqft</option>
                      <option value="1/4 acre /10,890 sqft">
                        1/4 acre/10,890 sqft
                      </option>
                      <option value="1/2 acre">1/2 acre</option>
                      <option value="1 acre">1 acre</option>
                      <option value="2 acres">2 acres</option>
                      <option value="5 acres">5 acres</option>
                      <option value="10 acres">10 acres</option>
                      <option value="20 acres">20 acres</option>
                      <option value="50 acres">50 acres</option>
                      <option value="100 acres">100 acres</option>
                    </select>
                    <select
                      style={{
                        display: "flex",
                        width: "100%",
                        height: "35px",
                        backgroundColor: colors.white,
                        color: colors.dark,
                        justifyContent: "center",
                      }}
                      onChange={(e) => {
                        handleItemClick(e.target.value, true);
                        setSelectedValues((prevValues) => ({
                          ...prevValues,
                          [text + index + "-max"]: e.target.value, // Unique key for the "max" dropdown
                        }));
                      }}
                      value={selectedValues[text + index + "-max"] || ""}
                    >
                      <option value="No Max">No Max</option>
                      <option value="1,000 sqft">1,000 sqft</option>
                      <option value="2,000 sqft">2,000 sqft</option>
                      <option value="3,000 sqft">3,000 sqft</option>
                      <option value="4,000 sqft">4,000 sqft</option>
                      <option value="5,000 sqft">5,000 sqft</option>
                      <option value="7,500 sqft">7,500 sqft</option>
                      <option value="1/4 acre /10,890 sqft">
                        1/4 acre/10,890 sqft
                      </option>
                      <option value="1/2 acre">1/2 acre</option>
                      <option value="1 acre">1 acre</option>
                      <option value="2 acres">2 acres</option>
                      <option value="5 acres">5 acres</option>
                      <option value="10 acres">10 acres</option>
                      <option value="20 acres">20 acres</option>
                      <option value="50 acres">50 acres</option>
                      <option value="100 acres">100 acres</option>
                    </select>
                  </div>
                )}
                {!isHomeType && text === "For Sale" && (
                  <div
                    style={{
                      ...styles.circle,
                      ...(selectedItems.includes(item) && styles.circleFilled),
                    }}
                  />
                )}
                {item !== "Select All" && item !== "Any" && (
                  <span
                    style={{
                      fontWeight:
                        item === "Bedrooms" ||
                        item === "Bathrooms" ||
                        (isHomeType && index === 0) ||
                        (isHomeType && item === "Space") ||
                        boldItemsForSaleOrSold.includes(item) ||
                        boldItemsForRent.includes(item) ||
                        item === "MORE FILTERS" ||
                        item === "Minimum - Maximum"
                          ? "bold"
                          : "normal",
                      ...((boldItemsForSaleOrSold.includes(item) ||
                        boldItemsForRent.includes(item)) && {
                        marginTop: "10px",
                      }), // Add marginTop for bold items
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
          {(itemList.includes("Number of Bedrooms") ||
            itemList.includes("Number of Bathrooms")) && (
            <div style={styles.applyButtonContainer}>
              <Button
                label="Apply"
                style={styles.applyButtonWide}
                backgroundColor={colors.primary}
                color={colors.white}
                onClick={handleApplyClick}
              />
            </div>
          )}
          {text === "For Sale" && (
            <div style={styles.applyButtonContainer}>
              <Button
                label="Apply"
                style={styles.applyButton}
                backgroundColor={colors.primary}
                color={colors.white}
                onClick={handleApplyClick}
              />
            </div>
          )}
          {isHomeType && (
            <div style={styles.applyButtonContainer}>
              <Button
                label="Apply"
                style={styles.applyButton}
                backgroundColor={colors.primary}
                color={colors.white}
                onClick={handleApplyClick}
              />
            </div>
          )}
          {text === "Price" && (
            <div style={styles.applyButtonContainer}>
              <Button
                label="Apply"
                style={styles.applyButton}
                backgroundColor={colors.primary}
                color={colors.white}
                onClick={handleApplyClick}
              />
            </div>
          )}
          {text === "More" && (
            <div style={styles.applyButtonContainer}>
              <Button
                label="Apply"
                style={styles.applyButton}
                backgroundColor={colors.primary}
                color={colors.white}
                onClick={handleApplyClick}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OptionDropDown;
