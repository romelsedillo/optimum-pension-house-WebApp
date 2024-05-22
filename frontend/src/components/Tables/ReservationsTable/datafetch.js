import { Client, Databases } from "appwrite";
import { formatNumberWithCommas } from "../../../utils/formatNumberWithCommas";
// Function to fetch data from Appwrite
export const fetchDataFromAppwrite = async () => {
  try {
    const PROJECT_ID = "65ad1cb002dddf2e1250";
    const DATABASE_ID = "65ad1d3340d360674f4b";
    const RESERVATIONS_COLLECTION_ID = "663a1999003268c7f413";

    const client = new Client()
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject(PROJECT_ID);
    const databases = new Databases(client);

    const response = await databases.listDocuments(
      DATABASE_ID,
      RESERVATIONS_COLLECTION_ID
    );

    const data = response.documents.map((doc) => ({
      id: doc?.$id,
      checkInDate: doc?.checkInDate,
      checkOutDate: doc?.checkOutDate,
      status: doc?.status,
      totalAmount: formatNumberWithCommas(`₱ ${doc?.totalAmount}.00`),
      guest: doc?.guests?.name,
      roomId: doc?.rooms?.$id,
      room: `${doc?.rooms?.roomNumber} : ${doc?.rooms?.roomType?.typeName}`,
      referenceNumber: doc?.referenceNumber,
      dateCreated: doc?.dateCreated,
      type: doc?.type,
      guestId: doc?.guests?.$id,
      totalDays: doc?.totalDays,
    }));
    data.reverse();
    return data;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return [];
  }
};
