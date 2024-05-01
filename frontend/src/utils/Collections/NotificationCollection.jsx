import { Client, Databases } from "appwrite";

// Function to fetch data from Appwrite
export const notificationCollection = async () => {
  const PROJECT_ID = "65ad1cb002dddf2e1250";
  const DATABASE_ID = "65ad1d3340d360674f4b";
  const NOTIFICATION_COLLECTION_ID = "663203b900256f52d78e";
  try {
    const client = new Client()
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject(PROJECT_ID);
    const databases = new Databases(client);

    // Fetch documents from the collection
    const response = await databases.listDocuments(
      DATABASE_ID,
      NOTIFICATION_COLLECTION_ID
    );

    // Extract the data from the response and return it
    const data = response.documents.map((doc) => ({
      id: doc.$id,
      guests: doc.guests.$id,
      message: doc.message,
      type: doc.type
    }));
    

    // If you want the smallest number of index to be the last, reverse the sorted array
    data.reverse();
    return data;
  } catch (error) {
    console.error("Error fetching data from AppWrite:", error);
    return [];
  }
};

export default notificationCollection;
