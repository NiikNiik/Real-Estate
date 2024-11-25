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
    zIndex: 1,
    borderLeft: `1px solid ${colors.primary}`,
    borderRight: `1px solid ${colors.primary}`,
    borderTop: `1px solid ${colors.primary}`,
    borderBottom: `1px solid ${colors.primary}`,
  },
  activeCell: {
    backgroundColor: colors.primary,
    color: colors.white,
    zIndex: 3,
    borderLeft: `1px solid ${colors.white}`,
    borderRight: `1px solid ${colors.white}`,
    borderTop: `1px solid ${colors.white}`,
    borderBottom: `1px solid ${colors.white}`,
  },
  inactiveCell: {
    backgroundColor: colors.white,
    color: colors.primary,
    zIndex: 0,
  },
  highlightedCell: {
    backgroundColor: colors.primary,
    color: colors.white,
    zIndex: 2,
    borderLeft: `1px solid ${colors.white}`,
    borderRight: `1px solid ${colors.white}`,
    borderTop: `1px solid ${colors.white}`,
    borderBottom: `1px solid ${colors.white}`,
  },
  leftBorder: {
    borderRight: `2px solid ${colors.primary}`,
  },
  rightBorder: {
    borderLeft: `1px solid ${colors.white}`,
  },
  adjacentRightBorder: {
    borderRight: `1px solid ${colors.white}`,
  },
  adjacentLeftBorder: {
    borderLeft: `1px solid ${colors.white}`,
  },
  noLeftBorder: {
    borderLeft: "none",
  },
  noRightBorder: {
    borderRight: "none",
  },
};

const Selector = ({
  texts = [],
  height = "50px",
  width = "400px",
  onSelect,
  selectedCell, // Receive selectedCell as a prop
}) => {
  // const [selectedCell, setSelectedCell] = useState(0); // Removed state from here

  const numberOfCells = 6;
  const cellWidth = `calc(${width} / ${numberOfCells})`;

  const handleCellClick = (index) => {
    if (onSelect) {
      onSelect(texts[index], index); // Pass the index to onSelect
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
              zIndex: isActive ? 3 : isHighlighted ? 2 : 1,
              ...(!isActive && !isHighlighted
                ? styles.inactiveCell
                : styles.activeCell),
              ...(isHighlighted && styles.highlightedCell),
              ...(index !== 0 && styles.leftBorder),
              ...(index !== 6 - 1 && styles.rightBorder),
              ...(isAdjacentRightHighlighted && styles.adjacentRightBorder),
              ...(isAdjacentLeftHighlighted && styles.adjacentLeftBorder),
              ...(index === 0 && styles.noLeftBorder),
              ...(index === 6 - 1 && styles.noRightBorder),
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
