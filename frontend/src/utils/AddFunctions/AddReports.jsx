import {
  client,
  DATABASE_ID,
  REPORTS_COLLECTION_ID,
} from "../../config/appwriteConfig";
import { ID, Databases } from "appwrite";

const databases = new Databases(client);

// Function to add a new guest to the database
export const addReports = async (date, totalDays, roomType, totalAmount) => {
  try {
    // Create a new document in the guests collection
    const response = await databases.createDocument(
      DATABASE_ID,
      REPORTS_COLLECTION_ID,
      ID.unique(),
      {
        date: date,
        days: totalDays,
        roomType: roomType,
        totalAmount: totalAmount,
      }
    );
    console.log("new report created: ", date, totalDays, roomType, totalAmount);
  } catch (error) {
    console.error("Error creating report:", error);
  }
};
export default addReports;
