import { account } from "../../config/appwriteConfig";
import { ID } from "appwrite";
import AddEmployee from "./AddEmployee";

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

export const addAuthEmployee = async (
  name,
  position,
  email,
  status,
  phone,
  address,
  password
) => {
  const label = "Guest";

  try {
    await AddEmployee(
      randomString,
      name,
      position,
      email,
      status,
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
export default addAuthEmployee;
