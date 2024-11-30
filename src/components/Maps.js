// Import React and necessary components from react-google-maps library
import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// Style for the map container: size and position on the page
const mapContainerStyle = {
  width: "50vw",
  height: "calc(100vh - 75px)", 
  position: "absolute", 
  top: "75px", 
  left: "10.5vw", 
};

// Function to fetch all property data from the ATTOM API
const fetchAllProperties = async () => {
  // Base URL for the ATTOM API endpoint
  const baseUrl =
    "https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/address";

  // Parameters for the API request
  const postalCode = "20743"; // ZIP code for the search area
  const propertyType = "APARTMENT"; // Filter for apartment properties
  const pageSize = 10; // Number of properties to fetch per page

  let page = 1; // Start with the first page of results
  let allProperties = []; // Array to store all fetched properties
  let totalResults = 0; // Total number of properties available in the API

  // Loop to fetch properties page by page until all are retrieved
  do {
    // Construct the API URL with query parameters
    const url = `${baseUrl}?postalcode=${postalCode}&propertytype=${propertyType}&page=${page}&pagesize=${pageSize}`;

    // Make the API request
    const response = await fetch(url, {
      method: "GET", // HTTP method
      headers: {
        "apikey": process.env.REACT_APP_ATTOM_API_KEY, // API key from environment variables
      },
    });

    // Check if the response is successful; throw an error if not
    if (!response.ok) {
      throw new Error("Failed to fetch property data");
    }

    // Parse the API response as JSON
    const data = await response.json();

    // Map the property data to extract relevant details
    const properties = data.property.map((property) => ({
      id: property.identifier.Id, // Unique identifier for the property
      latitude: parseFloat(property.location.latitude), // Latitude of the property
      longitude: parseFloat(property.location.longitude), // Longitude of the property
      address: property.address.oneLine, // Full address of the property
    }));

    // Add the fetched properties to the main array
    allProperties = [...allProperties, ...properties];

    // Update the total number of results and increment the page number
    totalResults = data.status.total;
    page += 1;
  } while (allProperties.length < totalResults); // Continue until all results are fetched

  // Return the array of all properties
  return allProperties;
};

// Main map component
const MapComponent = () => {
  // State to store the fetched properties
  const [properties, setProperties] = useState([]);

  // Effect hook to fetch property data when the component mounts
  useEffect(() => {
    const loadProperties = async () => {
      try {
        const data = await fetchAllProperties(); // Fetch property data from ATTOM API
        setProperties(data); // Store the fetched data in the state
      } catch (error) {
        console.error("Error fetching property data:", error); // Log any errors
      }
    };

    loadProperties(); // Call the function to fetch properties
  }, []); // Empty dependency array ensures this runs only once when mounted

  // Center coordinates for the map (default is Baltimore, MD)
  const center = {
    lat: 39.2904, // Latitude
    lng: -76.6122, // Longitude
  };

  return (
    // LoadScript ensures Google Maps API is loaded with the provided API key
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      {/* GoogleMap component to display the map */}
      <GoogleMap
        mapContainerStyle={mapContainerStyle} // Style for the map container
        center={center} // Center of the map
        zoom={10} // Zoom level
      >
        {/* Render a Marker for each property */}
        {properties.map((property) => (
          <Marker
            key={property.id} // Unique key for each marker
            position={{
              lat: property.latitude, // Latitude of the property
              lng: property.longitude, // Longitude of the property
            }}
            title={property.address} // Tooltip text when hovering over the marker
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

// Export the MapComponent to be used in other parts of the application
export default MapComponent;
