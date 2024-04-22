import {
  client,
  DATABASE_ID,
  GUESTS_COLLECTION_ID,
} from "../../config/appwriteConfig";
import { ID, Databases } from "appwrite";

const databases = new Databases(client);

// Function to add a new guest to the database
export const addGuestCopy = async (
  randomString,
  name,
  email,
  phone,
  address,
  password
) => {
  try {
    // let userId = ID;
    // Create a new document in the guests collection
    const response = await databases.createDocument(
      DATABASE_ID,
      GUESTS_COLLECTION_ID,
      ID.custom(randomString),
      {
        name: name,
        email: email,
        phone: phone,
        address: address,
        password: password,
      }
    );
    console.log("New guest added with ID:", response.$id);
  } catch (error) {
    console.error("Error adding guest:", error);
  }
};
export default addGuestCopy;
