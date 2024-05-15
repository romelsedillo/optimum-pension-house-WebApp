import {
  client,
  DATABASE_ID,
  ACTIVITY_LOGS_COLLECTION_ID,
} from "../../config/appwriteConfig";
import { ID, Databases } from "appwrite";

const databases = new Databases(client);

// Function to add a new guest to the database
export const addLogs = async (
  time,
  user,
  position,
  actions,
  details,
  status
) => {
  try {
    // Create a new document in the guests collection
    const response = await databases.createDocument(
      DATABASE_ID,
      ACTIVITY_LOGS_COLLECTION_ID,
      ID.unique(),
      {
        time: time,
        user: user,
        position: position,
        actions: actions,
        details: details,
        status: status,
      }
    );

  } catch (error) {
    console.error("Error creating activity logs:", error);
  }
};
export default addLogs;
