import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "50vw",
  height: "calc(100vh - 75px)",
  position: "absolute",
  top: "75px",
  left: "10.5vw",
};

const MapComponent = ({ children }) => {
  const center = {
    lat: 39.2904, // Example latitude (Baltimore, MD)
    lng: -76.6122, // Example longitude (Baltimore, MD)
  };

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={10}
      >
        {children}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
