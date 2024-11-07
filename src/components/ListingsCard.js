import React, { useState } from "react";
import AppText from "../components/Text";
import colors from "../config/colors";

const ListingsCard = ({
  images, // Accept an array of images
  title,
  subtitle,
  secondSubtitle,
  thirdSubtitle,
  leftIcon,
  rightIcon,
}) => {
  const [isHeartClicked, setIsHeartClicked] = useState(false);
  const [isHeartHovered, setIsHeartHovered] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isCompareClicked, setIsCompareClicked] = useState(false);
  const [isLeftChevronHovered, setIsLeftChevronHovered] = useState(false);
  const [isRightChevronHovered, setIsRightChevronHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Track the current image index
  const [isImageHovered, setIsImageHovered] = useState(false); // Track if the image is hovered
  const [isCardHovered, setIsCardHovered] = useState(false); // Track if the card is hovered

  const handleHeartClick = () => {
    setIsHeartClicked(!isHeartClicked);
  };

  const handleHeartMouseEnter = () => {
    setIsHeartHovered(true);
  };

  const handleHeartMouseLeave = () => {
    setIsHeartHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleCompareClick = () => {
    setIsCompareClicked(!isCompareClicked);
  };

  const handleLeftChevronMouseEnter = () => {
    setIsLeftChevronHovered(true);
  };

  const handleLeftChevronMouseLeave = () => {
    setIsLeftChevronHovered(false);
  };

  const handleRightChevronMouseEnter = () => {
    setIsRightChevronHovered(true);
  };

  const handleRightChevronMouseLeave = () => {
    setIsRightChevronHovered(false);
  };

  const handleLeftChevronClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleRightChevronClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleImageMouseEnter = () => {
    setIsImageHovered(true);
  };

  const handleImageMouseLeave = () => {
    setIsImageHovered(false);
  };

  const handleCardMouseEnter = () => {
    setIsCardHovered(true);
  };

  const handleCardMouseLeave = () => {
    setIsCardHovered(false);
  };

  return (
    <div
      style={{
        ...styles.cardContainer,
        boxShadow: isCardHovered
          ? "2px 0px 15px rgba(3,3,3,0.2)" // Increase shadow size and darkness on hover
          : "2px 0px 10px rgba(3,3,3,0.1)",
      }}
      onMouseEnter={handleCardMouseEnter}
      onMouseLeave={handleCardMouseLeave}
    >
      <div
        style={styles.imageContainer}
        onMouseEnter={handleImageMouseEnter}
        onMouseLeave={handleImageMouseLeave}
      >
        <img src={images[currentImageIndex]} alt={title} style={styles.image} />
        <div style={styles.leftIcon}>{leftIcon}</div>
        <div
          style={{
            ...styles.rightIcon,
            borderColor:
              isHeartClicked || isHeartHovered ? colors.primary : colors.white,
            backgroundColor: isHeartClicked
              ? colors.primary
              : "rgba(0, 0, 0, 0)",
          }}
          onClick={handleHeartClick}
          onMouseEnter={handleHeartMouseEnter}
          onMouseLeave={handleHeartMouseLeave}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke={isHeartClicked ? colors.white : colors.primary}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={styles.heartIcon}
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </div>
        <div
          style={{
            ...styles.centerLeftIcon,
            backgroundColor: "rgba(0, 0, 0, 0)",
            opacity: isImageHovered ? 1 : 0, // Make chevron visible on image hover
          }}
          onMouseEnter={handleLeftChevronMouseEnter}
          onMouseLeave={handleLeftChevronMouseLeave}
          onClick={handleLeftChevronClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke={isLeftChevronHovered ? colors.primary : colors.white}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={styles.chevronIcon}
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </div>
        <div
          style={{
            ...styles.centerRightIcon,
            backgroundColor: "rgba(0, 0, 0, 0)",
            opacity: isImageHovered ? 1 : 0, // Make chevron visible on image hover
          }}
          onMouseEnter={handleRightChevronMouseEnter}
          onMouseLeave={handleRightChevronMouseLeave}
          onClick={handleRightChevronClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke={isRightChevronHovered ? colors.primary : colors.white}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={styles.chevronIcon}
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>
      </div>
      <div style={styles.textContainer}>
        <div style={styles.priceContainer}>
          <AppText style={styles.cardTitle}>{title}</AppText>
          <div
            style={styles.compareIcon}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleCompareClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke={
                isHovered || isCompareClicked ? colors.primary : colors.dark
              }
              strokeWidth={isCompareClicked ? "3" : "2"}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={styles.compareIconSvg}
            >
              <line x1="2" y1="7" x2="22" y2="7" />
              <polyline
                points="17 2 22 7 17 12"
                fill="none"
                stroke={colors.primary}
              />
              <line x1="2" y1="17" x2="22" y2="17" />
              <polyline
                points="7 12 2 17 7 22"
                fill="none"
                stroke={colors.primary}
              />
            </svg>
          </div>
        </div>
        <AppText style={styles.cardSubtitle}>{subtitle}</AppText>
        <AppText style={styles.cardSecondSubtitle}>{secondSubtitle}</AppText>
        <AppText style={styles.cardThirdSubtitle}>{thirdSubtitle}</AppText>
      </div>
    </div>
  );
};

const styles = {
  cardContainer: {
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "2px 0px 10px rgba(3,3,3,0.1)", // Default shadow
    width: "335px",
    height: "340px",
    transition: "box-shadow 0.3s ease", // Smooth transition for shadow
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    paddingTop: "65%",
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "5px 5px 0 0",
  },
  leftIcon: {
    position: "absolute",
    top: "10px",
    left: "10px",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: colors.primary,
    padding: "5px 10px",
    borderRadius: "15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    fontWeight: "bold",
  },
  rightIcon: {
    position: "absolute",
    top: "10px",
    right: "10px",
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    border: "2px solid",
  },
  heartIcon: {
    width: "16px",
    height: "16px",
  },
  centerLeftIcon: {
    position: "absolute",
    top: "50%",
    left: "1%",
    transform: "translateY(-50%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    width: "40px", // Add width for the transparent square
    height: "40px", // Add height for the transparent square
  },
  centerRightIcon: {
    position: "absolute",
    top: "50%",
    right: "1%",
    transform: "translateY(-50%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    width: "40px", // Add width for the transparent square
    height: "40px", // Add height for the transparent square
  },
  chevronIcon: {
    width: "32px", // Increase the size of the chevron icons
    height: "32px",
  },
  textContainer: {
    padding: "10px",
  },
  priceContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  compareIcon: {
    marginLeft: "10px",
    cursor: "pointer",
  },
  compareIconSvg: {
    width: "24px",
    height: "24px",
  },
  cardTitle: {
    fontWeight: "bold",
    textAlign: "left",
    margin: "8px 0",
  },
  cardSubtitle: {
    textAlign: "left",
    margin: "3px 0",
  },
  cardSecondSubtitle: {
    textAlign: "left",
    margin: "6px 0",
  },
  cardThirdSubtitle: {
    color: colors.light,
    textAlign: "left",
    margin: "2px 0",
  },
};

export default ListingsCard;
