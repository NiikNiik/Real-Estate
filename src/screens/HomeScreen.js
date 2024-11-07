import React from "react";
import TopNavBar from "../components/TopNavBar"; // Adjust the path as needed
import SideNavBar from "../components/SideNavBar"; // Adjust the path as needed
import MapComponent from "../components/Maps"; // Adjust the path as needed
import ListView from "../components/ListView"; // Adjust the path as needed

const HomeScreen = ({ navigate }) => {
  return (
    <div>
      <TopNavBar navigate={navigate} />
      <SideNavBar></SideNavBar>
      <MapComponent>
        {/* Future icons/buttons can be added here as children */}
      </MapComponent>
      <ListView />
    </div>
  );
};

export default HomeScreen;
