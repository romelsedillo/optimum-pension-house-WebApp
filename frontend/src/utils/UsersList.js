// const sdk = require("node-appwrite");
import sdk from 'node-appwrite';
import API_ENDPOINT from "../config/appwriteConfig";
import PROJECT_ID from "../config/appwriteConfig";
import API_SECRET_KEY from "../config/appwriteConfig";

// Init SDK
const client = new sdk.Client();

const users = new sdk.Users(client);

client
  .setEndpoint(API_ENDPOINT) // Your API Endpoint
  .setProject(PROJECT_ID) // Your project ID
  .setKey(API_SECRET_KEY); // Your secret API key

export const promise = users.list();

promise.then(
  function (response) {
    console.log(response);
  },
  function (error) {
    console.log(error);
  }
);
export default promise