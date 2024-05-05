import { Client, Databases } from "appwrite";

export const reportsCollection = async () => {
  const PROJECT_ID = "65ad1cb002dddf2e1250";
  const DATABASE_ID = "65ad1d3340d360674f4b";
  const REPORTS_COLLECTION_ID = "660bf453778ab94a4a6f";
  try {
    const client = new Client()
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject(PROJECT_ID);
    const databases = new Databases(client);

    // Fetch documents from the collection
    const response = await databases.listDocuments(
      DATABASE_ID,
      REPORTS_COLLECTION_ID
    );

    // Extract the data from the response and return it
    const data = response.documents.map((doc) => ({
      id: doc.$id,
      date: doc.date,
      quantity: doc.quantity,
      roomType: doc.roomType.typeName,
      amount: doc.amount,
      totalAmount: doc.totalAmount,
      // Add more fields as needed
    }));

    return data;
  } catch (error) {
    console.error("Error fetching data from AppWrite:", error);
    return [];
  }
};
