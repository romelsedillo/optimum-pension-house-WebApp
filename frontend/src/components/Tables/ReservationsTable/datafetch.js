import { Client, Databases } from "appwrite";

// Function to fetch data from Appwrite
export const fetchDataFromAppwrite = async () => {
  try {
    const PROJECT_ID = "65ad1cb002dddf2e1250";
    const DATABASE_ID = "65ad1d3340d360674f4b";
    const COLLECTION_ID = "66065a27d0564ef7fa78";

    const client = new Client()
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject(PROJECT_ID);
    const databases = new Databases(client);

    const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);

    const data = response.documents.map((doc) => ({
      id: doc.$id,
      checkInDate: doc.checkInDate,
      checkOutDate: doc.checkOutDate,
      status: doc.status,
      totalAmount: doc.totalAmount,
      guest: doc.guests.name,
      roomId: doc.rooms.$id,
      room: `room ${doc.rooms.roomNumber} : ${doc.rooms.roomType.typeName}`,
      referenceNumber: doc.referenceNumber,
    }));
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching data from Appwrite:", error);
    return [];
  }
};
