import { account } from "../../config/appwriteConfig";
import { ID } from "appwrite";
import AddGuestCopy from "../AddFunctions/AddGuestCopy";

function generateRandomString(length = 20) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// Generate a random string of length 20
const randomString = generateRandomString();

export const addAuthGuest = async (
  name,
  position,
  email,
  phone,
  address,
  password
) => {
  const label = "Guest";
  try {
    await AddGuestCopy(
      randomString,
      name,
      position,
      email,
      phone,
      address,
      password
    );
    let response = await account.create(
      ID.custom(randomString),
      email,
      password,
      name,
      label
    );
    // Create an email session
    const accountDetails = await account.get();

    console.log(accountDetails);
  } catch (error) {
    console.error(error);
  }
};
export default addAuthGuest;
