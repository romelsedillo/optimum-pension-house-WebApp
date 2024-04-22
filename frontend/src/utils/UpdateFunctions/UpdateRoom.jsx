import {
  client,
  DATABASE_ID,
  ROOMS_COLLECTION_ID,
} from "../../config/appwriteConfig";
import { Databases } from "appwrite";

const databases = new Databases(client);

// Function to add a new guest to the database
export const roomUnavailable = async (
  roomId,
  roomNumber,
  floor,
  status,
  roomType
) => {
  try {
    // Create a new document in the guests collection
    const response = await databases.updateDocument(
      DATABASE_ID,
      ROOMS_COLLECTION_ID,
      roomId,
      {
        roomNumber: roomNumber,
        floor: floor,
        status: status,
        roomType: roomType,
      }
    );

    console.log("New room added with ID:", response.$id);
  } catch (error) {
    console.error("Error updating  room:", error);
  }
};
export default roomUnavailable;
