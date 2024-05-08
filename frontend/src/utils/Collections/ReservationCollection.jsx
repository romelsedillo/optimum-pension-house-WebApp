import { Client, Databases } from "appwrite";

// Function to fetch data from Appwrite

function formatTimestamp(isoTimestamp) {
  const date = new Date(isoTimestamp);

  // Get real month name
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[date.getMonth()];

  // Get real day of the month
  const day = date.getDate();

  // Format hours, minutes, and seconds
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  // Create a human-readable date string
  return `${month} ${day}, ${date.getFullYear()} ${hours}:${minutes}:${seconds}`;
}

export const reservationCollection = async () => {
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
      id: doc.id,
      checkInDate: formatTimestamp(doc.checkInDate),
      checkOutDate: formatTimestamp(doc.checkOutDate),
      status: doc.status,
      totalAmount: doc.totalAmount,
      guestId: doc.guests.$id,
      guest: doc.guests?.name,
      room: `room ${doc.rooms.roomNumber} : ${doc.rooms.roomType.typeName}`,
      referenceNumber: doc.referenceNumber,
      type: doc.type,
      dateCreated: doc.dateCreated,
    }));
    data.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));
    return data;
  } catch (error) {
    console.error("Error fetching data from Appwrite:", error);
    return [];
  }
};
export default reservationCollection;
