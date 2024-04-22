
import { Client, Databases } from "appwrite";

// Function to fetch data from Appwrite with a specific room ID
export const DataRoomFetch = async (roomId) => {
  try {
    const PROJECT_ID = "65ad1cb002dddf2e1250";
    const DATABASE_ID = "65ad1d3340d360674f4b";
    const COLLECTION_ID = "65ae6408e89aa220f16b";

    const client = new Client()
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject(PROJECT_ID);
    const databases = new Databases(client);

    // Fetch documents from the collection
    const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);

    // Filter the data to include only the room with the specified ID
    const filteredData = response.documents.filter(doc => doc.$id === roomId);

    // Extract the data from the response and return it
    const data = filteredData.map((doc) => ({
      id: doc.$id,
      roomNumber: doc.roomNumber,
      floor: doc.floor,
      status: doc.status,
      "room-type": doc.roomType.typeName,
      // Add more fields as needed
    }));

    return data;
  } catch (error) {
    console.error("Error fetching data from Appwrite:", error);
    return [];
  }
};



































// import { Client, Databases } from "appwrite";

// // Function to fetch data from Appwrite
// export const DataRoomFetch = async () => {
//   try {
//     const PROJECT_ID = "65ad1cb002dddf2e1250";
//     const DATABASE_ID = "65ad1d3340d360674f4b";
//     const COLLECTION_ID = "65ae6408e89aa220f16b";

//     const client = new Client()
//       .setEndpoint("https://cloud.appwrite.io/v1")
//       .setProject(PROJECT_ID);
//     const databases = new Databases(client);

//     // Fetch documents from the collection
//     const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);

//     // Extract the data from the response and return it
//     const data = response.documents.map((doc) => ({
//       id: doc.$id,
//       roomNumber: doc.roomNumber,
//       floor: doc.floor,
//       status: doc.status,
//       "room-type": doc.roomType.typeName,
//       // Add more fields as needed
//     }));

//     return data;
//   } catch (error) {
//     console.error("Error fetching data from Appwrite:", error);
//     return [];
//   }
// };



























