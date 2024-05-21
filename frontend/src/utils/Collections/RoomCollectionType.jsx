import { Client, Databases } from "appwrite";
//roomTypeId
// Function to fetch data from Appwrite
export const roomCollectionType = async (roomTypeId) => {
  const PROJECT_ID = "65ad1cb002dddf2e1250";
  const DATABASE_ID = "65ad1d3340d360674f4b";
  const ROOMS_COLLECTION_ID = "65ae6408e89aa220f16b";
  try {
    const client = new Client()
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject(PROJECT_ID);
    const databases = new Databases(client);

    // Fetch documents from the collection
    const response = await databases.listDocuments(
      DATABASE_ID,
      ROOMS_COLLECTION_ID
    );

    // Extract the data from the response and return it
    const data = response.documents
      .filter(
        (doc) => doc.roomType.$id === roomTypeId && doc.status === "available"
      )
      .map((doc) => ({
        id: doc?.$id,
        roomNumber: doc?.roomNumber,
        floor: doc?.floor,
        status: doc?.status,
        roomType: doc?.roomType?.typeName,
        // Add more fields as needed
      }));

    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching data from Appwrite:", error);
    return [];
  }
};
export default roomCollectionType;
