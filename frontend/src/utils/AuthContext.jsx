import { createContext, useState, useEffect, useContext } from "react";
import { account } from "../config/appwriteConfig";
import { useNavigate } from "react-router-dom";
import { ID } from "appwrite";
import { Spinner } from "@nextui-org/react";
import { toast, Bounce } from "react-toastify";
import CurrentDayTime from "./CurrentDayTime";

import AddGuestCopy from "./AddFunctions/AddGuestCopy";
import { addLogs } from "../utils/AddFunctions/AddLogs";
import { reservationCollection } from "../utils/Collections/ReservationCollection";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const currentDateTime = CurrentDayTime();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [reservation, setReservation] = useState([]);

  const reservationFetchData = async () => {
    try {
      const appWriteData = await reservationCollection();
      setReservation(appWriteData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // setLoading(false);
    checkUserStatus();
    reservationFetchData();
  }, []);

  const totalPending = reservation.filter(
    (item) => item.status === "pending"
  ).length;
  const checkUserStatus = async () => {
    try {
      const accountDetails = await account.get();
      setUser(accountDetails);
      setRole(getUserRole(accountDetails.labels)); // Set role state based on label
    } catch (error) {
      console.error(error.message);
    }
    setLoading(false);
  };

  const userLogin = async (userInfo = null) => {
    setLoading(false);

    try {
      await account.createEmailSession(userInfo.email, userInfo.password);
      const accountDetails = await account.get();
      setUser(accountDetails);
      const role = getUserRole(accountDetails.labels);
      setRole(role);
      const actions = "login";
      const details = "login";
      const user = accountDetails.name;

      // Redirect to appropriate page based on role
      if (role === "admin") {
        const status = "success";
        const position = role;
        addLogs(currentDateTime, user, position, actions, details, status);
        navigate("/admin-dashboard/employees");
      } else if (role === "manager") {
        const status = "success";
        const position = role;
        addLogs(currentDateTime, user, position, actions, details, status);
        navigate("/manager-dashboard/guests");
      } else if (role === "receptionist") {
        const status = "success";
        const position = role;
        addLogs(currentDateTime, user, position, actions, details, status);
        navigate("/receptionist-dashboard/guests");
      } else if (role === null) {
        const status = "failed";
        const position = "guest";
        addLogs(currentDateTime, user, position, actions, details, status);
        await account.deleteSession("current");
        setUser(null);
        setRole(null); // Reset role state
        toast.error("You are not authorized to perform this action!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        navigate("/");
      } else {
        const status = "failed";
        const position = "guest";
        addLogs(currentDateTime, user, position, actions, details, status);
        await account.deleteSession("current");
        setUser(null);
        setRole(null); // Reset role state

        toast.error("You are not authorized to perform this action!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        navigate("/");
      }
    } catch (error) {
      console.error(error.response);
      if (error.response && error.response.code === 401) {
        toast.error(
          "Invalid credentials. Please check the email and password.",
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
        // alert("Login failed. Please check your credentials and try again.");
        // console.log("Incorrect credentials. Please check and try again.");
      }
      if (error.response && error.response.code === 429) {
        toast.error("Too many request. Please try again later.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        // alert("Too many request. Please try again later.");
        // console.log("Incorrect credentials. Please check and try again.");
      }
    }
    setLoading(false);
  };
  const guestLogin = async (userInfo = null) => {
    setLoading(false);

    try {
      await account.createEmailSession(userInfo.email, userInfo.password);
      const accountDetails = await account.get();
      setUser(accountDetails);
      const role = getUserRole(accountDetails.labels);
      setRole(role);

      const user = accountDetails.name;
      const actions = "login";
      const details = "login";
      if (role === "admin") {
        const status = "failed";
        const position = role;
        addLogs(currentDateTime, user, position, actions, details, status);
        await account.deleteSession("current");
        setUser(null);
        setRole(null);
        toast.error("You are not authorized to perform this action!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        navigate("/");
      } else if (role === "manager") {
        const status = "failed";
        const position = role;
        addLogs(currentDateTime, user, position, actions, details, status);
        await account.deleteSession("current");
        setUser(null);
        setRole(null);
        toast.error("You are not authorized to perform this action!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        navigate("/");
      } else if (role === "receptionist") {
        const status = "failed";
        const position = role;
        addLogs(currentDateTime, user, position, actions, details, status);
        await account.deleteSession("current");
        setUser(null);
        setRole(null);
        toast.error("You are not authorized to perform this action!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        navigate("/");
      } else {
        const position = "guest";
        addLogs(currentDateTime, user, position, actions, details, status);
        navigate("/");
      }
    } catch (error) {
      console.error(error.response);
      if (error.response && error.response.code === 401) {
        toast.error(
          "Invalid credentials. Please check the email and password.",
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
        // alert("Login failed. Please check your credentials and try again.");
        // console.log("Incorrect credentials. Please check and try again.");
      }
      if (error.response && error.response.code === 429) {
        toast.error("Too many request. Please try again later.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        // alert("Too many request. Please try again later.");
        // console.log("Incorrect credentials. Please check and try again.");
      }
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
        userInfo.name
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

  const getUserRole = (labels) => {
    if (labels.includes("admin")) {
      return "admin";
    } else if (labels.includes("manager")) {
      return "manager";
    } else if (labels.includes("receptionist")) {
      return "receptionist";
    } else {
      return null;
    }
  };

  const contextData = {
    user,
    role,
    guestLogin,
    userLogin,
    logout,
    registerUser,
    loading,
    setLoading,
    CurrentDayTime,
    totalPending,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? (
        <div className="mt-[100px] flex items-center justify-center">
          <Spinner
            label="Loading. Please wait."
            color="success"
            labelColor="success"
            size="sm"
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
