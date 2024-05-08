import { Client, Account } from "appwrite";

export const API_ENDPOINT = "https://cloud.appwrite.io/v1";
export const PROJECT_ID = "65ad1cb002dddf2e1250";
export const DATABASE_ID = "65ad1d3340d360674f4b";
export const GUESTS_COLLECTION_ID = "65f68d01d4a622654c78";
export const EMPLOYEES_COLLECTION_ID = "660663a63f0ee73acd33";
export const ROOMS_COLLECTION_ID = "65ae6408e89aa220f16b";
export const RESERVATIONS_COLLECTION_ID = "663a1999003268c7f413";
export const ROOM_TYPE_COLLECTION_ID = "65ae64aba68e4dc2fe59";
export const NOTIFICATIONS_COLLECTION_ID = "663203b900256f52d78e";

export const API_SECRET_KEY =
  "671c56ed25aaaacf05b25f1e31c27350bc424f9e675a6b02c6cfbb5e30fddf3e2739bc07fb9692a41a030e6dfa727b0e85552ab3ddb233aea101df9c019f6cb63ef3bd8b9ee525440f1ab3da0eced16980372925fdeac7a768ceac92574214712471dc6eea638993460b050398e329eb1b7857796b64ee6648611244d57638f2";

export const client = new Client()
  .setEndpoint(API_ENDPOINT)
  .setProject(PROJECT_ID);

export const account = new Account(client);

export default client;
