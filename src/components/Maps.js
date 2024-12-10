import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import MapMarkerIcon from "../assets/MapMarkerIcon.svg";
import MapMarkerIconRed from "../assets/MapMarkerIconRed.svg";
import MapMarkerIconBlue from "../assets/MapMarkerIconBlue.svg";
import eventEmitter from "../eventEmitter";

const mapContainerStyle = {
  width: "50vw",
  height: "calc(100vh - 75px)",
  position: "absolute",
  top: "75px",
  left: "10.5vw",
};

const fetchPropertyData = async (collection, beds, baths) => {
  try {
    const query = new URLSearchParams();
    if (beds) query.append("beds", beds);
    if (baths) query.append("baths", baths);

    const response = await fetch(`/${collection}?${query.toString()}`);
    if (!response.ok) {
      throw new Error("Failed to fetch property data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching property data:", error);
    return [];
  }
};

const homeTypeMapping = {
  Houses: ["SFR"],
  Townhomes: ["TOWNHOUSE"],
  "Multi-family": ["MULTI-FAMILY DWELLINGS", "DUPLEX"],
  "Condos/Co-ops": ["CONDOMINIUM"],
  "Lots/Land": ["VACANT LAND"],
  Manufactured: ["MANUFACTURED, MODULAR, PRE-FABRICATED HOMES", "MOBILE HOME"],
  Apartments: ["APARTMENT"],
};

const MapComponent = () => {
  const [propertyData, setPropertyData] = useState([]);
  const [forSaleSelection, setForSaleSelection] = useState("ForSale");
  const [bedsAndBaths, setBedsAndBaths] = useState("Beds & Baths");
  const [homeTypes, setHomeTypes] = useState([]);

  useEffect(() => {
    const handleFilterChange = (message) => {
      console.log("Received message in MapComponent:", JSON.stringify(message));

      if (message.SaleType) {
        let newSelection = "ForSale";
        if (message.SaleType === "For Sale") {
          newSelection = "ForSale";
        } else if (message.SaleType === "For Rent") {
          newSelection = "ForRent";
        } else if (message.SaleType === "Sold") {
          newSelection = "Sold";
        }
        setForSaleSelection(newSelection);
      }

      if (message.BedsAndBaths) {
        setBedsAndBaths(message.BedsAndBaths);
      }

      if (message.HomeType) {
        setHomeTypes(message.HomeType);
      }
    };

    eventEmitter.on("filterChanged", handleFilterChange);

    return () => {
      eventEmitter.off("filterChanged", handleFilterChange);
    };
  }, []);

  useEffect(() => {
    const loadData = async () => {
      let beds = null;
      let baths = null;

      if (bedsAndBaths !== "Beds & Baths") {
        const [bedsPart, bathsPart] = bedsAndBaths.split(", ");
        beds = bedsPart ? bedsPart.replace(" bd", "").replace("+", "") : null;
        baths = bathsPart
          ? bathsPart.replace(" ba", "").replace("+", "")
          : null;
      }

      const data = await fetchPropertyData(forSaleSelection, beds, baths);
      setPropertyData(data);
    };
    loadData();
  }, [forSaleSelection, bedsAndBaths]);

  const center = {
    lat: 39.2904,
    lng: -76.6122,
  };

  const filterProperties = (properties) => {
    if (bedsAndBaths === "Beds & Baths" && homeTypes.length === 0) {
      return properties;
    }

    const [bedsPart, bathsPart] = bedsAndBaths.split(", ");
    const beds = bedsPart
      ? parseInt(bedsPart.replace(" bd", "").replace("+", ""))
      : null;
    const baths = bathsPart
      ? parseFloat(bathsPart.replace(" ba", "").replace("+", ""))
      : null;
    const bedsPlus = bedsPart ? bedsPart.includes("+") : false;
    const bathsPlus = bathsPart ? bathsPart.includes("+") : false;

    const homeTypeFilters = homeTypes.flatMap(
      (type) => homeTypeMapping[type] || []
    );
    console.log("Home Type Filters:", homeTypeFilters);

    return properties.filter((property) => {
      const bedsCondition =
        beds !== null
          ? bedsPlus
            ? property.beds >= beds
            : property.beds === beds
          : true;
      const bathsCondition =
        baths !== null
          ? bathsPlus
            ? property.bathstotal >= baths
            : property.bathstotal === baths
          : true;
      const homeTypeCondition =
        homeTypeFilters.length === 0 ||
        homeTypeFilters.includes(property.proptype);

      console.log(
        "Property Type:",
        property.proptype,
        "Home Type Condition:",
        homeTypeCondition
      );

      return bedsCondition && bathsCondition && homeTypeCondition;
    });
  };

  return (
    <>
      <select
        onChange={(e) => setForSaleSelection(e.target.value)}
        value={forSaleSelection}
      >
        <option value="ForRent">For Rent</option>
        <option value="ForSale">For Sale</option>
        <option value="Sold">Sold</option>
      </select>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={10}
        >
          {filterProperties(propertyData).map((property) => {
            let markerIcon = MapMarkerIcon; // Default icon
            if (property.saletype === "ForRent") {
              markerIcon = MapMarkerIconBlue;
            } else if (property.saletype === "Sold") {
              markerIcon = MapMarkerIconRed;
            }

            return (
              <Marker
                key={property._id}
                position={{ lat: property.latitude, lng: property.longitude }}
                icon={{
                  url: markerIcon,
                  scaledSize: new window.google.maps.Size(30, 30),
                }}
              />
            );
          })}
        </GoogleMap>
      </LoadScript>
    </>
  );
};

export default MapComponent;
