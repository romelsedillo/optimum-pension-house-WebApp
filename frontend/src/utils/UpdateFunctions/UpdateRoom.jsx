import {
  client,
  DATABASE_ID,
  ROOMS_COLLECTION_ID,
} from "../../config/appwriteConfig";
import { Databases } from "appwrite";
import { toast, Bounce } from "react-toastify";

const databases = new Databases(client);

// Function to add a new guest to the database
export const roomUnavailable = async (
  roomId,
  roomNumber,
  floor,
  status,
  roomType
) => {
  try {
    // Create a new document in the guests collection
    const response = await databases.updateDocument(
      DATABASE_ID,
      ROOMS_COLLECTION_ID,
      roomId,
      {
        roomNumber: roomNumber,
        floor: floor,
        status: status,
        roomType: roomType,
      }
    );

    toast.success("Room updated!", {
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
    console.error("Error updating  room:", error);
    console.error(error.response);
    if (error) {
      toast.error("Failed updating room.", {
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
export default roomUnavailable;
