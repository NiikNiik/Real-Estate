import React, { useState } from "react";
import TopNavBar from "../components/TopNavBar"; // Adjust the path as needed
import ListView from "../components/ListView"; // Adjust the path as needed

const StateController = () => {
  const [forSaleSelection, setForSaleSelection] = useState("For Sale");

  return (
    <div>
      <TopNavBar
        forSaleSelection={forSaleSelection}
        setForSaleSelection={setForSaleSelection}
      />
      <ListView forSaleSelection={forSaleSelection} />
    </div>
  );
};

export default StateController;
