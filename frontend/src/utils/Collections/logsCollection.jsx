import { Client, Databases } from "appwrite";

// Function to fetch data from Appwrite
export const logsCollection = async () => {
  const PROJECT_ID = "65ad1cb002dddf2e1250";
  const DATABASE_ID = "65ad1d3340d360674f4b";
  const ACTIVITY_LOGS_COLLECTION_ID = "6644a05c0013eb0f80f4";
  try {
    const client = new Client()
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject(PROJECT_ID);
    const databases = new Databases(client);

    // Fetch documents from the collection
    const response = await databases.listDocuments(
      DATABASE_ID,
      ACTIVITY_LOGS_COLLECTION_ID
    );

    const data = response.documents.map((doc) => ({
      id: doc?.$id,
      time: doc?.time,
      user: doc?.user,
      position: doc?.position,
      actions: doc?.actions,
      details: doc?.details,
      status: doc?.status,
    }));
    data.reverse();
    return data;
  } catch (error) {
    console.error("Error fetching activity logs:", error);
    return [];
  }
};
