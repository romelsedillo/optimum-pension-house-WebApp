import {
  client,
  DATABASE_ID,
  NOTIFICATIONS_COLLECTION_ID,
} from "../../config/appwriteConfig";
import { ID, Databases } from "appwrite";

const databases = new Databases(client);

// Function to add a new guest to the database
export const createNotification = async (guestId, message, type) => {
  try {
    // Create a new notification message
    const response = await databases.createDocument(
      DATABASE_ID,
      NOTIFICATIONS_COLLECTION_ID,
      ID.unique(),
      {
        guests: guestId,
        message: message,
        type: type,
      }
    );

    console.log("New notification created:", response.$id);
  } catch (error) {
    console.error("Error creating notification:", error);
  }
};
export default createNotification;
