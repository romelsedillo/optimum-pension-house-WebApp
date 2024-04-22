import {
  client,
  DATABASE_ID,
  GUESTS_COLLECTION_ID,
} from "../../config/appwriteConfig";
import { Databases } from "appwrite";
// import { setLoading } from "../../utils/AuthContext";

const databases = new Databases(client);

// Function to add a new guest to the database
export const deleteGuest = async (userId) => {
//   setLoading(true);

  try {
    // Create a new document in the guests collection
    const response = await databases.deleteDocument(
      DATABASE_ID,
      GUESTS_COLLECTION_ID,
      userId
    );
    // setLoading(false);
    console.log("Guest has been deleted");
  } catch (error) {
    console.error("Error deleting guest:", error);
  }
};
