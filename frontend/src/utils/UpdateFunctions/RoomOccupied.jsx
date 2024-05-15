import {
  client,
  DATABASE_ID,
  ROOMS_COLLECTION_ID,
} from "../../config/appwriteConfig";
import { Databases } from "appwrite";

const databases = new Databases(client);

// Function to add a new guest to the database
export const roomOccupied = async (roomId, status) => {
 
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
  } catch (error) {
    console.error("Error updating room:", error);
  }
};
export default roomOccupied;
