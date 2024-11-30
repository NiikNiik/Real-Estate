import React, { useState } from "react";
import Icon from "../assets/Icon"; // Adjust the path as needed
import eventEmitter from "../eventEmitter";
import colors from "../config/colors";
import TextButton from "../components/TextButton"; // Adjust the path as needed
import AppTextInput from "../components/TextInput"; // Import TextInput component
import MagnifyingGlassIcon from "../assets/MagnifyingGlassIcon"; // Adjust the path as needed
import OptionDropDown from "../components/OptionDropDown"; // Import OptionDropDown component
import Selector from "../components/Selector"; // Import Selector component
import Checkbox from "../components/Checkbox";

const styles = {
  Header: {
    position: "fixed",
    top: "0px",
    left: "0px",
    width: "100%",
    height: "75px",
    backgroundColor: colors.white,
    boxShadow: "2px -2px 10px rgba(3,3,3,0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 30px",
    zIndex: 1000,
  },
  NavLinks: {
    display: "flex",
    gap: "20px",
    padding: "0 60px",
  },
  LogoSection: {
    display: "flex",
    alignItems: "center",
    gap: "10px", // Space between the icon and the text
  },
  BrandName: {
    fontSize: "30px",
    fontWeight: "bold",
    color: colors.dark,
  },
  InputContainer: {
    display: "flex",
    alignItems: "center",
    gap: "20px", // Increase space between "GoCasa" text and the input field
  },
  TextInputContainer: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    width: "500px", // Adjusted width
    marginTop: "15px", // Adjust margin to align with the text
  },
  TextInput: {
    width: "100%",
    height: "35px",
    padding: "0 15px",
    fontSize: "14px",
  },
  MagnifyingGlassIcon: {
    position: "absolute",
    right: "15px",
    top: "45%",
    transform: "translateY(-50%)",
  },
  OptionDropDowns: {
    display: "flex",
    gap: "10px",
  },
};

const TopNavBar = ({ navigate, onListingTypeChange }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showPlus, setShowPlus] = useState(true);
  const [bedrooms, setBedrooms] = useState("Any");
  const [bathrooms, setBathrooms] = useState("Any");
  const [forSaleSelection, setForSaleSelection] = useState(["For Sale"]);
  const [selectedBedsCell, setSelectedBedsCell] = useState(0);
  const [selectedBathsCell, setSelectedBathsCell] = useState(0);
  const [useExactMatch, setUseExactMatch] = useState(false);

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const handleExactMatchChange = () => {
    setUseExactMatch(!useExactMatch); // Update the state here
    setShowPlus(!showPlus);
  };

  const handleBedroomsChange = (value) => {
    setBedrooms(value);
  };

  const handleBathroomsChange = (value) => {
    setBathrooms(value);
  };

  const handleForSaleChange = (value) => {
    setForSaleSelection(value); // Wrap in array since we're handling it as array
    console.log("Selection: ", value);
    eventEmitter.emit("forSaleSelectionChange", value); // Emit the event
    if (onListingTypeChange) {
      onListingTypeChange(value);
    }
  };

  const getBedsAndBathsTitle = () => {
    if (bedrooms === "Any" && bathrooms === "Any") {
      return "Beds & Baths";
    }
    const bdText =
      bedrooms === "Any"
        ? "0+ bd"
        : useExactMatch
        ? `${bedrooms.replace("+", "")} bd`
        : `${bedrooms.includes("+") ? bedrooms : bedrooms + "+"} bd`;
    const baText = bathrooms === "Any" ? "0+ ba" : `${bathrooms} ba`;
    return `${bdText}, ${baText}`;
  };

  const handleBedsAndBathsChange = () => {
    const updatedBedsAndBathsTitle = getBedsAndBathsTitle();
    eventEmitter.emit("bedsAndBathsTitleChange", updatedBedsAndBathsTitle);
  };

  const homeTypeItemsForSaleOrSold = [
    "Home Type",
    "Select All",
    "Houses",
    "Townhomes",
    "Multi-family",
    "Condos/Co-ops",
    "Lots/Land",
    "Apartments",
    "Manufactured",
  ];

  const homeTypeItemsForRent = [
    "Home Type",
    "Select All",
    "Houses",
    "Apartments",
    "Condos/Co-ops",
    "Townhomes",
    "Space",
    "Entire Place",
    "Room",
  ];

  const getHomeTypeItems = () => {
    return forSaleSelection === "For Rent"
      ? homeTypeItemsForRent
      : homeTypeItemsForSaleOrSold;
  };

  const moreItemsForSaleOrSold = [
    "MORE FILTERS",
    "Max HOA",
    "Any",
    "Listing Type",
    "Owner posted",
    "Agent listed",
    "New Construction",
    "Foreclosures",
    "Auctions",
    "Forclosed",
    "Pre-forclosures",
    "Property Status",
    "Coming soon",
    "Accepting backup offers",
    "Pending & under contract",
    "Tours",
    "Must have open house",
    "Parking Spots",
    "Any",
    "Must have garage",
    "Square Feet",
    "",
    "Lot Size",
    "",
    "Year Built",
    "",
    "Basement",
    "Has basement",
    "Number of Stories",
    "Single-story only",
    "Senior Living",
    "Hide communities",
    "Other Amenities",
    "Must have A/C",
    "Must have pool",
    "Waterfront",
    "View",
    "City",
    "Mountain",
    "Park",
    "Water",
    "Days Listed",
    "Any",
  ];

  const moreItemsForRent = [
    "MORE FILTERS",
    "Move-In-Date",
    "",
    "Square Feet",
    "",
    "Lot Size",
    "",
    "Year Built",
    "",
    "Basement",
    "Has basement",
    "Number of Stories",
    "Single-story only",
    "Tours",
    "Instant Tour Available",
    "Other Amenities",
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
    "View",
    "City",
    "Mountain",
    "Park",
    "Water",
    "Days Listed",
    "Any",
  ];

  const getMoreItems = () => {
    return forSaleSelection === "For Rent"
      ? moreItemsForRent
      : moreItemsForSaleOrSold;
  };

  return (
    <div style={styles.Header}>
      <div style={styles.InputContainer}>
        <TextButton style={styles.LogoSection} onClick={() => navigate("home")}>
          <Icon style={{ height: "30px", width: "30px" }} />
          <span style={styles.BrandName}>GoCasa</span>
        </TextButton>
        <div style={styles.TextInputContainer}>
          <AppTextInput
            style={styles.TextInput}
            placeholder="Address, neighborhood, city, ZIP"
          />
          <div style={styles.MagnifyingGlassIcon}>
            <MagnifyingGlassIcon width={17} height={17} />
          </div>
        </div>
      </div>
      <div style={styles.OptionDropDowns}>
        {[
          {
            text: "For Sale",
            items: ["For Sale", "For Rent", "Sold"],
            shouldUpdateText: true,
            onSelect: handleForSaleChange, // Add onSelect handler
          },
          {
            text: "Price",
            items: ["Price Range", "Minimum   -   Maximum", ""], // Simplified items
            shouldUpdateText: false,
            isPrice: true, // Add a flag to identify the Price dropdown
          },
          {
            text: getBedsAndBathsTitle(),
            items: [
              "Number of Bedrooms",
              "Bedrooms",
              <Selector
                key={`bedsSelector-${useExactMatch}`} // Use useExactMatch in the key
                borderColor={colors.primary}
                backgroundColor={colors.white}
                height="30px"
                width="400px"
                fontSize="14px"
                texts={
                  useExactMatch // Use useExactMatch here
                    ? ["Any", "1", "2", "3", "4", "5"]
                    : ["Any", "1+", "2+", "3+", "4+", "5+"]
                }
                onSelect={(value, index) => {
                  setSelectedBedsCell(index);
                  handleBedroomsChange(value);
                  handleBedsAndBathsChange();
                }}
                selectedCell={selectedBedsCell}
              />,
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <Checkbox // Move Checkbox here
                  style={{
                    display: "flex",
                    marginRight: "5px",
                    width: "20px",
                    height: "20px",
                    backgroundColor: colors.primary,
                    color: colors.white,
                    justifyContent: "center",
                  }}
                  isChecked={useExactMatch} // Bind to the state
                  onChange={handleExactMatchChange} // Call the handler
                />
                Use exact match
              </div>,
              "Number of Bathrooms",
              "Bathrooms",
              <Selector
                key={`bathsSelector-${useExactMatch}`} // Key includes exactMatch
                borderColor={colors.primary}
                backgroundColor={colors.white}
                height="30px"
                width="400px"
                fontSize="14px"
                texts={["Any", "1+", "1.5+", "2+", "3+", "4+"]}
                onSelect={(value, index) => {
                  // Updated onSelect prop

                  setSelectedBathsCell(index); // Update state in TopNavBar

                  handleBathroomsChange(value);
                  handleBedsAndBathsChange();
                }}
                selectedCell={selectedBathsCell} // Pass selectedCell as prop
              />,
            ],

            shouldUpdateText: false,
          },
          {
            text: "Home Type",
            items: getHomeTypeItems(), // Pass the correct list of items
            shouldUpdateText: false,
            isHomeType: true, // Indicate this is the Home Type dropdown
          },
          {
            text: "More",
            items: getMoreItems(),
            shouldUpdateText: false,
          },
        ].map((field, index) => (
          <OptionDropDown
            key={index}
            text={field.text}
            items={field.items}
            isOpen={openDropdown === index}
            toggleDropdown={() => toggleDropdown(index)}
            shouldUpdateText={field.shouldUpdateText}
            useExactMatch={useExactMatch}
            onExactMatchChange={handleExactMatchChange}
            itemList={field.items} // Pass the itemList prop
            onSelect={field.onSelect} // Pass the onSelect handler
            isHomeType={field.isHomeType} // Pass the isHomeType prop
            isPrice={field.isPrice} // Pass the isPrice flag
          />
        ))}
      </div>
      <div style={styles.NavLinks}>
        <TextButton
          onClick={() => {
            /* Empty navigation for now */
          }}
        >
          Manage Properties
        </TextButton>
        <TextButton
          onClick={() => {
            /* Empty navigation for now */
          }}
        >
          Advertise
        </TextButton>
        <TextButton onClick={() => navigate("login")}>Log In</TextButton>
      </div>
    </div>
  );
};

export default TopNavBar;
