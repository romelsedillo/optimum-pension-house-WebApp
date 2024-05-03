import {
  client,
  DATABASE_ID,
  GUESTS_COLLECTION_ID,
} from "../../config/appwriteConfig";
import { ID, Databases } from "appwrite";

const databases = new Databases(client);

export const addGuest = async (
  randomString,
  name,
  email,
  phone,
  address,
  password
) => {
  try {
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
export default addGuest;
