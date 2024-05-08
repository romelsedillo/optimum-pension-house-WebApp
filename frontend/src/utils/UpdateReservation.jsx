import {
  client,
  DATABASE_ID,
  RESERVATIONS_COLLECTION_ID,
} from "../config/appwriteConfig";
import { Databases } from "appwrite";

const databases = new Databases(client);

// Function to add a new guest to the database
export const updateReservation = async (reservationId, status) => {
  try {
    // Create a new document in the guests collection
    const response = await databases.updateDocument(
      DATABASE_ID,
      RESERVATIONS_COLLECTION_ID,
      reservationId,
      {
        status: status,
      }
    );

    console.log("Reservation updated with ID:", response.$id);
  } catch (error) {
    console.error("Error updating:", error);
    console.error("Appwrite error response:", error.response);
  }
};
export default updateReservation;
