import {
  client,
  DATABASE_ID,
  ROOMS_COLLECTION_ID,
} from "../../config/appwriteConfig";
import { Databases } from "appwrite";

const databases = new Databases(client);

// Function to add a new guest to the database
export const roomUnavailable = async (roomId) => {
  const status = "unavailable";
  try {
    // Create a new document in the guests collection
    const response = await databases.updateDocument(
      DATABASE_ID,
      ROOMS_COLLECTION_ID,
      roomId,
      {
        status: status,
      }
    );

    console.log("New room added with ID:", response.$id);
  } catch (error) {
    console.error("Error adding room:", error);
  }
};
export default roomUnavailable;
