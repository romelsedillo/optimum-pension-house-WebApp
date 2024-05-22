import { Client, Databases } from "appwrite";
import { transformDate } from "../transformDate";

export const reportsCollection = async () => {
  const PROJECT_ID = "65ad1cb002dddf2e1250";
  const DATABASE_ID = "65ad1d3340d360674f4b";
  const REPORTS_COLLECTION_ID = "6645aefc0016ab906e06";
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
      date: transformDate(doc?.date),
      days: doc?.days,
      roomType: doc?.roomType?.typeName,
      roomRate: `${doc?.roomType?.rate}`,
      totalAmount: `${doc?.totalAmount}`,
    }));
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching reports:", error);
    return [];
  }
};
