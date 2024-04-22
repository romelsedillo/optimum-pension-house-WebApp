import { Client, Databases } from "appwrite";
import PROJECT_ID from "../../config/appwriteConfig";
import DATABASE_ID from "../../config/appwriteConfig";
import RESERVATIONS_COLLECTION_ID from "../../config/appwriteConfig";

// Function to fetch data from Appwrite
export const pendingReservations = async () => {
  try {
    const client = new Client()
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject(PROJECT_ID);
    const databases = new Databases(client);

    // Fetch documents from the collection
    const response = await databases.listDocuments(
      DATABASE_ID,
      RESERVATIONS_COLLECTION_ID
    );

    // Extract the data from the response and return it
    const data = response.documents
      .map((doc) => ({
        id: doc.$id,
        checkInDate: doc.checkInDate,
        checkOutDate: doc.checkOutDate,
        status: doc.status,
        totalAmount: doc.totalAmount,
        guest: doc.guests?.name,
        room: `room ${doc.rooms.roomNumber} : ${doc.rooms.roomType.typeName}`,
        referenceNumber: doc.referenceNumber,

        // Add more fields as needed
      }))
      .filter((item) => item.status === "pending");
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching data from Appwrite:", error);
    return [];
  }
};
export default pendingReservations;
