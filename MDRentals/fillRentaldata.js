const fs = require("fs");
const MongoClient = require("mongodb").MongoClient;

const uri = "FILL_IN";
const client = new MongoClient(uri);

async function processRentalFiles() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("realestate");
    const collection = db.collection("ForRent");

    for (let i = 1; i <= 26; i++) {
      const filename = `./MDRentals/p${i}.txt`;

      try {
        const data = fs.readFileSync(filename, "utf8");
        console.log(`Read file: ${filename}`);

        const rentalProperties = JSON.parse(data);
        console.log(
          `Parsed ${rentalProperties.length} properties from ${filename}`
        );

        const formattedProperties = rentalProperties.map((property) => {
          const proptype =
            property.propertyType.toUpperCase() === "SINGLE FAMILY"
              ? "SFR"
              : property.propertyType.toUpperCase() === "CONDO"
              ? "CONDOMINIUM"
              : property.propertyType.toUpperCase();

          // Ensure correct data types
          const beds = parseInt(property.bedrooms, 10);
          const baths = parseInt(property.bathrooms, 10);
          const price = parseFloat(property.price);

          return {
            saletype: "ForRent",
            proptype: proptype,
            attomId: property.id,
            country: "US",
            countrySubd: property.state,
            line1: property.addressLine1,
            line2: `${property.city}, ${property.state} ${property.zipCode}`,
            locality: property.city,
            oneLine: property.formattedAddress,
            postal1: property.zipCode,
            postal2: "",
            postal3: "",
            latitude: parseFloat(property.latitude), // Parse latitude as a number
            longitude: parseFloat(property.longitude), // Parse longitude as a number
            lotsize1: "",
            lotsize2: "",
            munname: property.county,
            subdname: "",
            yearbuilt: "",
            coolingtype: "",
            bldgsize: parseInt(property.squareFootage, 10), // Parse square footage as a number
            bathsfull: baths,
            bathstotal: baths,
            beds: beds,
            roomsTotal: beds,
            floors: "",
            garagetype: "",
            prkgSpaces: "",
            levels: "",
            pubdate: property.listedDate,
            value: price,
            saleTransDate: "",
            taxamt: "",
            pool: "",
          };
        });

        const insertResult = await collection.insertMany(formattedProperties);
        console.log(
          `Inserted ${insertResult.insertedCount} documents from ${filename}`
        );
      } catch (fileError) {
        console.error(`Error processing ${filename}:`, fileError);
      }
    }
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
    console.log("Disconnected from MongoDB");
  }
}

processRentalFiles();
