import { createContext, useState, useEffect, useContext } from "react";
import { account } from "../config/appwriteConfig";
import { useNavigate } from "react-router-dom";
import { ID } from "appwrite";
import { Spinner } from "@nextui-org/react";
import { toast, Bounce } from "react-toastify";

import AddGuestCopy from "./AddFunctions/AddGuestCopy";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null); // Add role state

  useEffect(() => {
    // setLoading(false);
    checkUserStatus();
  }, []);

  // const getRedirectPath = (role) => {
  //   switch (role) {
  //     case "admin":
  //       return "/admin-dashboard/admins";
  //     case "manager":
  //       return "/manager-dashboard";
  //     case "receptionist":
  //       return "/receptionist-dashboard";
  //     default:
  //       return "/a";
  //   }
  // };

  const loginUser = async (userInfo = null) => {
    setLoading(true);

    try {
      // Create email session
      await account.createEmailSession(userInfo.email, userInfo.password);

      // Get user details
      const accountDetails = await account.get();

      // Set user state
      setUser(accountDetails);

      // Set role state
      const role = getUserRole(accountDetails.labels);
      setRole(role);

      // Redirect to appropriate page based on role
      if (role === "admin") {
        navigate("/admin-dashboard/employees");
      } else if (role === "manager") {
        navigate("/manager-dashboard/guests");
      } else if (role === "receptionist") {
        navigate("/receptionist-dashboard/guests");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error(error);

      toast.error(
        "Login failed. Please check your credentials and try again.",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        }
      );
    }
    setLoading(false);
  };

  const logout = async () => {
    await account.deleteSession("current");
    setUser(null);
    setRole(null); // Reset role state

    navigate("/"); // Redirect to the home page after logout
  };

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

  const registerUser = async (userInfo) => {
    setLoading(true);

    try {
      await AddGuestCopy(
        randomString,
        userInfo.name,
        userInfo.email,
        userInfo.phone,
        userInfo.address,
        userInfo.password
      );
      let response = await account.create(
        ID.custom(randomString),
        userInfo.email,
        userInfo.password,
        userInfo.name,
        userInfo.phone
      );
      // Create an email session
      await account.createEmailSession(userInfo.email, userInfo.password);

      const accountDetails = await account.get();
      setUser(accountDetails);

      navigate("/");
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  // const registerUser = async (userInfo) => {
  //   setLoading(true);

  //   try {
  //     let response = await account.create(
  //       ID.unique(),
  //       userInfo.email,
  //       userInfo.password,
  //       userInfo.name,
  //       userInfo.phone,
  //     );

  //     await account.createEmailSession(
  //       userInfo.email,
  //       userInfo.password,
  //       userInfo.name,
  //       userInfo.phone
  //     );
  //     const accountDetails = await account.get();
  //     setUser(accountDetails);

  //     navigate("/");
  //   } catch (error) {
  //     console.error(error);
  //   }

  //   setLoading(false);
  // };

  const checkUserStatus = async () => {
    try {
      const accountDetails = await account.get();
      setUser(accountDetails);
      setRole(getUserRole(accountDetails.labels)); // Set role state based on labels
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const getUserRole = (labels) => {
    if (labels.includes("admin")) {
      return "admin";
    } else if (labels.includes("manager")) {
      return "manager";
    } else if (labels.includes("receptionist")) {
      return "receptionist";
    } else {
      return "guest";
    }
  };

  const contextData = {
    user,
    role,
    loginUser,
    logout,
    registerUser,
    loading,
    setLoading,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? (
        <div className="mt-[100px] flex items-center justify-center">
          <Spinner
            label="Loading. Please wait."
            color="success"
            labelColor="success"
          />
        </div>
      ) : (
        children
      )}

      {/* {children} */}
    </AuthContext.Provider>
  );
};

// Custom Hook
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
