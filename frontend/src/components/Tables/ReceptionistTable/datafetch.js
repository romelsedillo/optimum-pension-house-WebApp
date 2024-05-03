import { Client, Databases } from "appwrite";

// Function to fetch data from Appwrite
export  const fetchDataFromAppwrite = async () => {
  try {
    const PROJECT_ID = "65ad1cb002dddf2e1250";
    const DATABASE_ID = "65ad1d3340d360674f4b";
    const COLLECTION_ID = "660663a63f0ee73acd33";

    const client = new Client()
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject(PROJECT_ID);
    const databases = new Databases(client);

    // Fetch documents from the collection
    const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);

    // Filter the data to only include employees with the receptionist position
    const data = response.documents
      .filter((doc) => doc.position === "receptionist")
      .map((doc) => ({
        id: doc.$id,
        name: doc.name,
        position: doc.position,
        email: doc.email,
        status: doc.status,
        // Add more fields as needed
      }));

    return data;
  } catch (error) {
    console.error("Error fetching data from Appwrite:", error);
    return [];
  }
};
