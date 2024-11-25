import React, { useState, useEffect } from "react";
import AppText from "../components/Text";
import TextButton from "../components/TextButton";
import ListingsCard from "../components/ListingsCard";
import DownChevron from "../assets/DownChevron";
import eventEmitter from "../eventEmitter";
import colors from "../config/colors";
import { BorderColor } from "@mui/icons-material";

const listingsData = [
  // Rental Properties
  {
    images: [
      require("../assets/house1A.JPG"), // Reusing existing images for demo
      require("../assets/house1B.JPG"),
      require("../assets/house1C.JPG"),
      require("../assets/house1D.JPG"),
      require("../assets/house1E.JPG"),
      require("../assets/house1F.JPG"),
    ],
    title: "$2,500/mo",
    subtitle: "2 bds | 2 ba | 1,200 sqft - House for rent",
    secondSubtitle: "4455 Rental Ave, Alexandria, VA 22306",
    thirdSubtitle: "Alexandria Property Management",
    leftIcon: <span>Utilities Included</span>,
    rightIcon: <span>Right Icon</span>,
  },
  {
    images: [
      require("../assets/house2A.JPG"),
      require("../assets/house2B.JPG"),
      require("../assets/house2C.JPG"),
      require("../assets/house2D.JPG"),
      require("../assets/house2E.JPG"),
      require("../assets/house2F.JPG"),
    ],
    title: "$3,200/mo",
    subtitle: "3 bds | 2.5 ba | 1,800 sqft - House for rent",
    secondSubtitle: "7788 Lease St, Alexandria, VA 22306",
    thirdSubtitle: "Premier Rentals LLC",
    leftIcon: <span>Pet Friendly</span>,
    rightIcon: <span>Right Icon</span>,
  },
  // Sold Properties
  {
    images: [
      require("../assets/house3A.JPG"),
      require("../assets/house3B.JPG"),
      require("../assets/house3C.JPG"),
      require("../assets/house3D.JPG"),
      require("../assets/house3E.JPG"),
      require("../assets/house3F.JPG"),
    ],
    title: "$725,000",
    subtitle: "4 bds | 3 ba | 2,500 sqft - House sold",
    secondSubtitle: "9900 Closed Dr, Alexandria, VA 22306",
    thirdSubtitle: "SOLD: March 2024",
    leftIcon: <span>Recently Sold</span>,
    rightIcon: <span>Right Icon</span>,
  },
  {
    images: [
      require("../assets/house4A.JPG"),
      require("../assets/house4B.JPG"),
      require("../assets/house4C.JPG"),
      require("../assets/house4D.JPG"),
      require("../assets/house4E.JPG"),
      require("../assets/house4F.JPG"),
    ],
    title: "$899,000",
    subtitle: "5 bds | 4 ba | 3,200 sqft - House sold",
    secondSubtitle: "1234 Settlement Rd, Alexandria, VA 22306",
    thirdSubtitle: "SOLD: February 2024",
    leftIcon: <span>Sold Above Asking</span>,
    rightIcon: <span>Right Icon</span>,
  },
  {
    images: [
      require("../assets/house1A.JPG"),
      require("../assets/house1B.JPG"),
      require("../assets/house1C.JPG"),
      require("../assets/house1D.JPG"),
      require("../assets/house1E.JPG"),
      require("../assets/house1F.JPG"),
    ],
    title: "$675,000",
    subtitle: "3 bds | 3 ba | 2,357 sqft - House for sale",
    secondSubtitle: "3101 Memorial St, Alexandria, VA 22306",
    thirdSubtitle: "RE/MAX EXECUTIVES",
    leftIcon: <span>Stainless appliances</span>,
    rightIcon: <span>Right Icon</span>,
  },
  {
    images: [
      require("../assets/house2A.JPG"),
      require("../assets/house2B.JPG"),
      require("../assets/house2C.JPG"),
      require("../assets/house2D.JPG"),
      require("../assets/house2E.JPG"),
      require("../assets/house2F.JPG"),
    ],
    title: "$850,000",
    subtitle: "4 bds | 4 ba | 3,000 sqft - House for sale",
    secondSubtitle: "1234 Elm St, Alexandria, VA 22306",
    thirdSubtitle: "Keller Williams Realty",
    leftIcon: <span>Pool</span>,
    rightIcon: <span>Right Icon</span>,
  },
  {
    images: [
      require("../assets/house3A.JPG"),
      require("../assets/house3B.JPG"),
      require("../assets/house3C.JPG"),
      require("../assets/house3D.JPG"),
      require("../assets/house3E.JPG"),
      require("../assets/house3F.JPG"),
    ],
    title: "$720,000",
    subtitle: "3 bds | 2 ba | 2,800 sqft - House for sale",
    secondSubtitle: "5678 Oak St, Alexandria, VA 22306",
    thirdSubtitle: "Century 21",
    leftIcon: <span>Renovated Kitchen</span>,
    rightIcon: <span>Right Icon</span>,
  },
  {
    images: [
      require("../assets/house4A.JPG"),
      require("../assets/house4B.JPG"),
      require("../assets/house4C.JPG"),
      require("../assets/house4D.JPG"),
      require("../assets/house4E.JPG"),
      require("../assets/house4F.JPG"),
    ],
    title: "$950,000",
    subtitle: "5 bds | 4 ba | 3,500 sqft - House for sale",
    secondSubtitle: "9101 Pine St, Alexandria, VA 22306",
    thirdSubtitle: "Coldwell Banker",
    leftIcon: <span>Large Backyard</span>,
    rightIcon: <span>Right Icon</span>,
  },
  {
    images: [
      require("../assets/house5A.JPG"),
      require("../assets/house5B.JPG"),
      require("../assets/house5C.JPG"),
      require("../assets/house5D.JPG"),
      require("../assets/house5E.JPG"),
      require("../assets/house5F.JPG"),
    ],
    title: "$1,200,000",
    subtitle: "6 bds | 5 ba | 4,200 sqft - House for sale",
    secondSubtitle: "1122 Maple St, Alexandria, VA 22306",
    thirdSubtitle: "Sotheby's International Realty",
    leftIcon: <span>Modern Design</span>,
    rightIcon: <span>Right Icon</span>,
  },
  {
    images: [
      require("../assets/house6A.JPG"),
      require("../assets/house6B.JPG"),
      require("../assets/house6C.JPG"),
      require("../assets/house6D.JPG"),
      require("../assets/house6E.JPG"),
      require("../assets/house6F.JPG"),
    ],
    title: "$1,500,000",
    subtitle: "7 bds | 6 ba | 5,000 sqft - House for sale",
    secondSubtitle: "3344 Birch St, Alexandria, VA 22306",
    thirdSubtitle: "Redfin",
    leftIcon: <span>Luxury Features</span>,
    rightIcon: <span>Right Icon</span>,
  },
];

const SaleandSoldList = [
  "Homes for You",
  "Price (High to Low)",
  "Price (Low to High)",
  "Newest",
  "Bedrooms",
  "Bathrooms",
  "Square Feet",
  "Lot Size",
];

const RentList = [
  "Default",
  "Payment (High to Low)",
  "Payment (Low to High)",
  "Newest",
  "Bedrooms",
  "Bathrooms",
  "Square Feet",
  "Lot Size",
];

const getSortOptionText = (forSaleSelection, optionIndex) => {
  if (forSaleSelection === "For Rent") {
    return `Sort: ${RentList[optionIndex]}`;
  } else {
    return `Sort: ${SaleandSoldList[optionIndex]}`;
  }
};

const ListView = ({ listingType = "For Sale" }) => {
  const [forSaleSelection, setForSaleSelection] = useState("For Sale");
  const [, setPreviousForSaleSelection] = useState("For Sale");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentOption, setCurrentOption] = useState(0); // Track the current option number
  const [, setSortType] = useState(getSortOptionText("For Sale", 0)); // Initialize sortType

  useEffect(() => {
    const handleForSaleSelectionChange = (value) => {
      if (value !== forSaleSelection) {
        setPreviousForSaleSelection(forSaleSelection);
        setForSaleSelection(value);
        setCurrentOption((prevOption) => {
          const newOption = getSortOptionText(value, prevOption);
          setSortType(newOption);
          console.log("Sort Type:", newOption); // Log the sort type
          return prevOption;
        });
      }
    };

    eventEmitter.on("forSaleSelectionChange", handleForSaleSelectionChange);

    return () => {
      eventEmitter.off("forSaleSelectionChange", handleForSaleSelectionChange);
    };
  }, [forSaleSelection]);

  const getHeaderText = (forSaleSelection) => {
    switch (forSaleSelection) {
      case "For Sale":
        return "Real Estate & Homes For Sale";
      case "For Rent":
        return "Rental Listings";
      case "Sold":
        return "Recently Sold Homes";
      default:
        return "Real Estate & Homes For Sale";
    }
  };

  const getSubtitleText = (forSaleSelection) => {
    switch (forSaleSelection) {
      case "For Rent":
        return "rentals available";
      case "For Sale":
      case "Sold":
      default:
        return "results";
    }
  };

  const getDropdownItems = (forSaleSelection) => {
    if (forSaleSelection === "For Rent") {
      return RentList;
    } else {
      return SaleandSoldList;
    }
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSortOptionClick = (option, index) => {
    setCurrentOption(index);
    const newSortType = getSortOptionText(forSaleSelection, index);
    setSortType(newSortType);
    console.log("Sort Type:", newSortType); // Log the sort type
    setDropdownOpen(false);
  };

  // Filter listings based on the listingType
  const filteredListings = listingsData.filter((listing) => {
    const listingText = listing.subtitle.toLowerCase();
    switch (listingType) {
      case "For Rent":
        return listingText.includes("for rent");
      case "Sold":
        return listingText.includes("sold");
      case "For Sale":
      default:
        return listingText.includes("for sale");
    }
  });
  return (
    <div style={styles.mainContainer}>
      <AppText style={styles.title}>{getHeaderText(forSaleSelection)}</AppText>
      <div style={styles.headerContainer}>
        <AppText style={styles.subtitle}>
          {filteredListings.length} {getSubtitleText(forSaleSelection)}
        </AppText>
        <TextButton style={styles.textButton} onClick={handleDropdownToggle}>
          <div style={styles.textButtonContent}>
            {getSortOptionText(forSaleSelection, currentOption)}{" "}
            <DownChevron width={24} height={24} color={colors.primary} />
          </div>
        </TextButton>
        {dropdownOpen && (
          <div
            style={
              forSaleSelection === "For Rent"
                ? styles.dropdownMenuForRent
                : styles.dropdownMenuDefault
            }
          >
            {getDropdownItems(forSaleSelection).map((item, index) => (
              <TextButton
                key={index}
                style={styles.dropdownItem}
                onClick={() => handleSortOptionClick(item, index)}
              >
                {item}
              </TextButton>
            ))}
          </div>
        )}
      </div>
      <div style={styles.gridContainer}>
        {filteredListings.map((listing, index) => (
          <ListingsCard
            key={index}
            images={listing.images}
            title={listing.title}
            subtitle={listing.subtitle}
            secondSubtitle={listing.secondSubtitle}
            thirdSubtitle={listing.thirdSubtitle}
            leftIcon={listing.leftIcon}
            rightIcon={listing.rightIcon}
          />
        ))}
      </div>
    </div>
  );
};

const styles = {
  mainContainer: {
    boxShadow: "2px 0px 10px rgba(3,3,3,0.1)",
    backgroundColor: colors.white,
    position: "absolute",
    top: "75px",
    left: "60.5vw",
    width: "36.5vw",
    height: "88vh",
    padding: "20px",
    overflowY: "scroll",
  },
  title: {
    fontWeight: "bold",
    fontSize: "24px",
    textAlign: "left",
  },
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  subtitle: {
    color: colors.light,
    textAlign: "left",
  },
  dropdownContainer: {
    position: "relative",
  },
  textButton: {
    marginLeft: "auto",
    width: "200px", // Fixed width for the TextButton
  },
  textButtonContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between", // Ensure the text and icon are spaced correctly
  },
  dropdownMenuDefault: {
    position: "absolute",
    top: "14%",
    left: "460px",
    backgroundColor: colors.secondary,
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    zIndex: 1000,
    width: "250px", // Fixed width for the dropdown menu
    borderRadius: "4px",
    overflow: "hidden",
  },
  dropdownMenuForRent: {
    position: "absolute",
    top: "14%",
    left: "460px",
    backgroundColor: colors.secondary,
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    zIndex: 1000,
    width: "250px", // Fixed width for the dropdown menu
    borderRadius: "4px",
    overflow: "hidden",
  },
  dropdownItem: {
    padding: "10px 20px",
    cursor: "pointer",
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "20px",
  },
};

export default ListView;
