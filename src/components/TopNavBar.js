import React, { useState } from "react";
import Icon from "../assets/Icon"; // Adjust the path as needed
import colors from "../config/colors";
import TextButton from "../components/TextButton"; // Adjust the path as needed
import AppTextInput from "../components/TextInput"; // Import TextInput component
import MagnifyingGlassIcon from "../assets/MagnifyingGlassIcon"; // Adjust the path as needed
import OptionDropDown from "../components/OptionDropDown"; // Import OptionDropDown component
import Selector from "../components/Selector"; // Import Selector component

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

const TopNavBar = ({ navigate, onListingTypeChange, onSearch }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [exactMatch, setExactMatch] = useState(false);
  const [showPlus, setShowPlus] = useState(true);
  const [bedrooms, setBedrooms] = useState("Any");
  const [bathrooms, setBathrooms] = useState("Any");
  const [forSaleSelection, setForSaleSelection] = useState(["For Sale"]);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const handleExactMatchChange = () => {
    setExactMatch(!exactMatch);
    setShowPlus(!showPlus);
  };

  const handleBedroomsChange = (value) => {
    setBedrooms(value);
  };

  const handleBathroomsChange = (value) => {
    setBathrooms(value);
  };

  const handleForSaleChange = (value) => {
    setForSaleSelection([value]); // Wrap in array since we're handling it as array
    if (onListingTypeChange) {
      onListingTypeChange(value);
    }
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchQuery); // Trigger the search callback with the query
    }
  };

  const getBedsAndBathsTitle = () => {
    if (bedrooms === "Any" && bathrooms === "Any") {
      return "Beds & Baths";
    }
    const bdText =
      bedrooms === "Any"
        ? "0+ bd"
        : exactMatch
        ? `${bedrooms.replace("+", "")} bd` // Remove the plus sign if exactMatch is true
        : `${bedrooms} bd`;
    const baText = bathrooms === "Any" ? "0+ ba" : `${bathrooms} ba`;
    return `${bdText}, ${baText}`;
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update query state
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
            items: ["$100 - $200K", "$200 - $300K", "$300 - $400K"],
            shouldUpdateText: false,
          },
          {
            text: getBedsAndBathsTitle(),
            items: [
              "Number of Bedrooms",
              "Bedrooms",
              <Selector
                key="bedsSelector"
                borderColor={colors.primary}
                backgroundColor={colors.white}
                height="30px" // Set the height here
                width="400px"
                fontSize="14px"
                texts={
                  exactMatch
                    ? ["Any", "1 ", "2 ", "3 ", "4 ", "5 "]
                    : ["Any", "1+", "2+", "3+", "4+", "5+"]
                }
                onSelect={handleBedroomsChange}
              />,
              "Use exact match",
              "Number of Bathrooms",
              "Bathrooms",
              <Selector
                key="bathsSelector"
                borderColor={colors.primary}
                backgroundColor={colors.white}
                height="30px" // Set the height here
                width="400px"
                fontSize="14px"
                texts={["Any", "1+", "1.5+", "2+", "3+", "4+"]}
                onSelect={handleBathroomsChange}
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
            items: ["Option 1", "Option 2", "Option 3"],
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
            exactMatch={exactMatch}
            onExactMatchChange={handleExactMatchChange}
            itemList={field.items} // Pass the itemList prop
            onSelect={field.onSelect} // Pass the onSelect handler
            isHomeType={field.isHomeType} // Pass the isHomeType prop
          />
        ))}
      </div>
      <div style={styles.NavLinks}>
      <TextButton onClick={() => navigate("manage")}>Manage Properties</TextButton>
        <TextButton onClick={() => navigate("advertise")}>Advertise</TextButton>
        <TextButton onClick={() => navigate("login")}>Log In</TextButton>
      </div>
    </div>
  );
};

export default TopNavBar;
