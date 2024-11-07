import React, { useState } from "react";
import colors from "../config/colors";

const styles = {
  selector: {
    cursor: "pointer",
    borderRadius: "24px",
    backgroundColor: colors.white,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    border: `2px solid ${colors.primary}`,
    position: "relative",
  },
  cell: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Roboto",
    fontSize: "12px",
    cursor: "pointer",
    padding: "10px 0",
    position: "relative",
    zIndex: 1, // Default z-index
    border: `1px solid ${colors.primary}`, // Default border color
  },
  activeCell: {
    backgroundColor: colors.primary,
    color: colors.white,
    zIndex: 3,
    borderColor: colors.white,
  },
  inactiveCell: {
    backgroundColor: colors.white,
    color: colors.primary,
    zIndex: 0,
  },
  highlightedCell: {
    backgroundColor: colors.primary,
    color: colors.white,
    zIndex: 2, // Higher z-index for highlighted cells
    borderColor: colors.white, // Change border to white when highlighted
  },
  leftBorder: {
    borderRight: `1px solid ${colors.primary}`,
  },
  rightBorder: {
    borderLeft: `1px solid ${colors.primary}`,
  },
  adjacentRightBorder: {
    borderRight: `2px solid ${colors.white}`, // Change right border of adjacent cell to white
  },
  adjacentLeftBorder: {
    borderLeft: `2px solid ${colors.white}`, // Change left border of adjacent cell to white
  },
  noLeftBorder: {
    borderLeft: "none", // Remove left border
  },
  noRightBorder: {
    borderRight: "none", // Remove right border
  },
};

const Selector = ({ texts, height = "50px", width = "400px", onSelect }) => {
  const [selectedCell, setSelectedCell] = useState(0); // First cell selected by default

  const numberOfCells = texts.length;
  const cellWidth = `calc(${width} / ${numberOfCells})`;

  const handleCellClick = (index) => {
    setSelectedCell(index); // Select the clicked cell
    if (onSelect) {
      onSelect(texts[index]);
    }
  };

  const selectorStyle = {
    ...styles.selector,
    height,
    width,
  };

  return (
    <div style={selectorStyle}>
      {texts.map((text, index) => {
        const isActive = selectedCell === index;
        const isHighlighted =
          selectedCell !== 0 && index <= selectedCell && index !== 0;
        const isAdjacentRightHighlighted =
          selectedCell !== 0 && index <= selectedCell;
        const isAdjacentLeftHighlighted =
          selectedCell !== 0 && index === selectedCell + 1;

        return (
          <div
            key={index}
            style={{
              ...styles.cell,
              width: cellWidth,
              height,
              zIndex: isActive ? 3 : isHighlighted ? 2 : 1, // Higher z-index for active and highlighted cells
              ...(!isActive && !isHighlighted
                ? styles.inactiveCell
                : styles.activeCell),
              ...(isHighlighted && styles.highlightedCell),
              ...(index !== 0 && styles.leftBorder),
              ...(index !== texts.length - 1 && styles.rightBorder),
              ...(isAdjacentRightHighlighted && styles.adjacentRightBorder),
              ...(isAdjacentLeftHighlighted && styles.adjacentLeftBorder),
              ...(index === 0 && styles.noLeftBorder), // Ensure no left border for the first cell
              ...(index === texts.length - 1 && styles.noRightBorder), // Ensure no right border for the last cell
            }}
            onClick={() => handleCellClick(index)}
          >
            {text}
          </div>
        );
      })}
    </div>
  );
};

export default Selector;
