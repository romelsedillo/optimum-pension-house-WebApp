import { Client, Databases } from "appwrite";

// Function to fetch data from Appwrite
export const guestCollection = async () => {
  const PROJECT_ID = "65ad1cb002dddf2e1250";
  const DATABASE_ID = "65ad1d3340d360674f4b";
  const GUESTS_COLLECTION_ID = "65f68d01d4a622654c78";
  try {
    const client = new Client()
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject(PROJECT_ID);
    const databases = new Databases(client);

    // Fetch documents from the collection
    const response = await databases.listDocuments(
      DATABASE_ID,
      GUESTS_COLLECTION_ID
    );

    // Extract the data from the response and return it
    const data = response.documents.map((doc) => ({
      id: doc.$id,
      name: doc.name,
      email: doc.email,
      phone: doc.phone,
      address: doc.address,
      // Add more fields as needed
    }));

    return data;
  } catch (error) {
    console.error("Error fetching data from AppWrite:", error);
    return [];
  }
};
