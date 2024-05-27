import {
  client,
  DATABASE_ID,
  ROOM_TYPE_COLLECTION_ID,
} from "../../config/appwriteConfig";
import { Databases } from "appwrite";
import { toast, Bounce } from "react-toastify";

const databases = new Databases(client);

// Function to add a new guest to the database
export const roomRate = async (roomTypeId, price) => {
  try {
    // Create a new document in the guests collection
    const response = await databases.updateDocument(
      DATABASE_ID,
      ROOM_TYPE_COLLECTION_ID,
      roomTypeId,
      {
        rate: price,
      }
    );

    toast.success("Room price updated!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  } catch (error) {
    console.error("Error updating  room price:", error.response);
    if (error) {
      toast.error("Failed updating room price.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      // alert("Login failed. Please check your credentials and try again.");
      // console.log("Incorrect credentials. Please check and try again.");
    }
  }
};
export default roomRate;
