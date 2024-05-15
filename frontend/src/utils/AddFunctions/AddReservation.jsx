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
  referenceNumber,
  currentDateTime,
  type
) => {
  try {
    // Create a new document in the guests collection
    const response = await databases.createDocument(
      DATABASE_ID,
      RESERVATIONS_COLLECTION_ID,
      ID.unique(),
      {
        dateCreated: currentDateTime,
        type: type,
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
        totalAmount: totalAmount,
        referenceNumber: referenceNumber,
        status: status,
        guests: guests,
        rooms: rooms,
      }
    );

    console.log("New reservation added with ID:", response.$id);
  } catch (error) {
    console.error("Error adding employee:", error);
  }
};
export default addReservation;
