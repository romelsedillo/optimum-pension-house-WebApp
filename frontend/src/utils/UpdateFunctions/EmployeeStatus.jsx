import {
  client,
  DATABASE_ID,
  EMPLOYEES_COLLECTION_ID,
} from "../../config/appwriteConfig";
import { Databases } from "appwrite";

const databases = new Databases(client);

// Function to add a new guest to the database
export const employeeStatus = async (userId, status) => {
  try {
    const response = await databases.updateDocument(
      DATABASE_ID,
      EMPLOYEES_COLLECTION_ID,
      userId,
      {
        status: status,
      }
    );
  } catch (error) {
    console.error("Error updating employee status:", error);
  }
};
export default employeeStatus;
