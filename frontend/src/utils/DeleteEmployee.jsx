import {
  client,
  DATABASE_ID,
  EMPLOYEES_COLLECTION_ID,
} from "../config/appwriteConfig";
import { Databases } from "appwrite";

const databases = new Databases(client);

// Function to add a new guest to the database
export const deleteEmployee = async (id) => {
  try {
    // Create a new document in the guests collection
    const response = await databases.deleteDocument(
      DATABASE_ID,
      EMPLOYEES_COLLECTION_ID,
      id
    );

    console.log("employee has been deleted:", response.$id);
  } catch (error) {
    console.error("Error deleting employee:", error);
  }
};
export default deleteEmployee;
