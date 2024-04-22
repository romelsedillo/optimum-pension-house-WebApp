import {
  client,
  DATABASE_ID,
  ROOMS_COLLECTION_ID,
} from "../../config/appwriteConfig";
import { ID, Databases } from "appwrite";

const databases = new Databases(client);

// Function to add a new guest to the database
export const addRoom = async (roomNumber, floor, status, roomType) => {
  try {
    // Create a new document in the guests collection
    const response = await databases.createDocument(
      DATABASE_ID,
      ROOMS_COLLECTION_ID,
      ID.unique(),
      {
        roomNumber: roomNumber,
        floor: floor,
        status: status,
        roomType: roomType,
      }
    );

    console.log("New room added with ID:", response.$id);
  } catch (error) {
    console.error("Error adding room:", error);
  }
};
export default addRoom;
