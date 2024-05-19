import {
  client,
  DATABASE_ID,
  EMPLOYEES_COLLECTION_ID,
} from "../../config/appwriteConfig";
import { ID, Databases } from "appwrite";

const databases = new Databases(client);

// Function to add a new guest to the database
export const addEmployee = async (
  randomString,
  name,
  position,
  email,
  status,
  phone,
  address,
) => {
  try {
    // Create a new document in the guests collection
    const response = await databases.createDocument(
      DATABASE_ID,
      EMPLOYEES_COLLECTION_ID,
      ID.custom(randomString),
      {
        name: name,
        position: position,
        email: email,
        status: status,
        phone: phone,
        address: address,
      }
    );

    console.log("New employee added with ID:", response.$id);
  } catch (error) {
    console.error("Error adding employee:", error);
  }
};
export default addEmployee;
