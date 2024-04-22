import {
  client,
  DATABASE_ID,
  ROOMS_COLLECTION_ID,
} from "../../config/appwriteConfig";
import { Databases } from "appwrite";
// import { setLoading } from "../../utils/AuthContext";

const databases = new Databases(client);

// Function to add a new guest to the database
export const deleteRoom = async (userId) => {
//   setLoading(true);

  try {
    // Create a new document in the guests collection
    const response = await databases.deleteDocument(
      DATABASE_ID,
      ROOMS_COLLECTION_ID,
      userId
    );
    // setLoading(false);
    console.log("Room has been deleted.");
  } catch (error) {
    console.error("Error deleting room.:", error);
  }
};
