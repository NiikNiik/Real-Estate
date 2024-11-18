import React, { useState } from "react";
import TopNavBar from "../components/TopNavBar";
import SideNavBar from "../components/SideNavBar";
import MapComponent from "../components/Maps";
import ListView from "../components/ListView";

const HomeScreen = ({ navigate }) => {
  const [listingType, setListingType] = useState("For Sale");

  const handleListingTypeChange = (type) => {
    setListingType(type);
  };

  return (
    <div>
      <TopNavBar 
        navigate={navigate} 
        onListingTypeChange={handleListingTypeChange}
      />
      <SideNavBar />
      <MapComponent>
        {/* Future icons/buttons can be added here as children */}
      </MapComponent>
      <ListView listingType={listingType} />
    </div>
  );
};

export default HomeScreen;
