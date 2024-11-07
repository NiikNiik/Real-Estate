import React from "react";
import AppText from "../components/Text";
import TextButton from "../components/TextButton";
import ListingsCard from "../components/ListingsCard";
import DownChevron from "../assets/DownChevron";
import colors from "../config/colors";

const listingsData = [
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

const ListView = () => {
  return (
    <div style={styles.mainContainer}>
      <AppText style={styles.title}>Real Estate & Homes For Sale</AppText>
      <div style={styles.headerContainer}>
        <AppText style={styles.subtitle}>{listingsData.length} results</AppText>
        <TextButton style={styles.textButton}>
          <div style={styles.textButtonContent}>
            Sort: Homes for You{" "}
            <DownChevron width={24} height={24} color={colors.primary} />
          </div>
        </TextButton>
      </div>
      <div style={styles.gridContainer}>
        {listingsData.map((listing, index) => (
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
  textButton: {
    marginLeft: "auto",
  },
  textButtonContent: {
    display: "flex",
    alignItems: "center",
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "20px",
  },
};

export default ListView;
