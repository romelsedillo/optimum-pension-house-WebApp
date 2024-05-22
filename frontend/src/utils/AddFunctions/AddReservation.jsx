import {
  client,
  DATABASE_ID,
  RESERVATIONS_COLLECTION_ID,
} from "../../config/appwriteConfig";
import { ID, Databases } from "appwrite";

const databases = new Databases(client);

// Function to add a new guest to the database
export const addReservation = async (
  currentDateTime,
  type,
  checkInDate,
  checkOutDate,
  referenceNumber,
  reservationStatus,
  guests,
  rooms,
  chosenDaysCount,
  subTotal,
  totalAmount,
  isDiscounted,
  discountAmount
) => {
  try {
    // Create a new document in the guests collection
    const response = await databases.createDocument(
      DATABASE_ID,
      RESERVATIONS_COLLECTION_ID,
      ID.unique(),
      {
        dateCreated: currentDateTime,
        type: type,
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
        referenceNumber: referenceNumber,
        status: reservationStatus,
        guests: guests,
        rooms: rooms,
        totalDays: chosenDaysCount,
        subTotal: subTotal,
        totalAmount: totalAmount,
        isDiscounted: isDiscounted,
        discountAmount: discountAmount,
      }
    );

    console.log("New reservation added with ID:", response.$id);
  } catch (error) {
    console.error("Error creating reservation:", error);
  }
};
export default addReservation;
