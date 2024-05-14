import {
  client,
  DATABASE_ID,
  NOTIFICATIONS_COLLECTION_ID,
} from "../../config/appwriteConfig";
import { ID, Databases } from "appwrite";

const databases = new Databases(client);

// Function to add a new guest to the database
export const createNotification = async (
  message,
  type,
  currentDateTime,
  guestId,
  reservationId
) => {
  try {
    // Create a new notification message
    const response = await databases.createDocument(
      DATABASE_ID,
      NOTIFICATIONS_COLLECTION_ID,
      ID.unique(),
      {
        message: message,
        type: type,
        dateCreated: currentDateTime,
        guests: guestId,
        reservations: reservationId,
      }
    );

    console.log("New notification created:", response.$id);
  } catch (error) {
    console.error("Error creating notification:", error);
  }
};
export default createNotification;
