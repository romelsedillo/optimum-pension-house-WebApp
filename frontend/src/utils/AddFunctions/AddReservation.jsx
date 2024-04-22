import {
  client,
  DATABASE_ID,
  RESERVATIONS_COLLECTION_ID,
} from "../../config/appwriteConfig";
import { ID, Databases } from "appwrite";

const databases = new Databases(client);

// Function to add a new guest to the database
export const addReservation = async (
  checkInDate,
  checkOutDate,
  status,
  totalAmount,
  guests,
  rooms,
  referenceNumber
) => {
  try {
    // Create a new document in the guests collection
    const response = await databases.createDocument(
      DATABASE_ID,
      RESERVATIONS_COLLECTION_ID,
      ID.unique(),
      {
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
        status: status,
        totalAmount: totalAmount,
        guests: guests,
        rooms: rooms,
        referenceNumber: referenceNumber,
      }
    );

    console.log("New reservation added with ID:", response.$id);
  } catch (error) {
    console.error("Error adding employee:", error);
  }
};
export default addReservation;
