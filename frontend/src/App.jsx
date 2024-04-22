import {
  BrowserRouter as Router,
  Routes,
  Route,
  // useLocation,
} from "react-router-dom";
import { AuthProvider } from "./utils/AuthContext";
import { NextUIProvider } from "@nextui-org/react";



import Home from "./pages/Home";
import RoomsAndSuits from "./pages/RoomsAndSuits";
import Gallery from "./pages/Gallery";
import Profile from "./pages/Profile";
import Book from "./pages/Book";
import UserRegister from "./pages/UserRegister";
import SingleRooms from "./pages/SingleRooms";
import DoubleRooms from "./pages/DoubleRooms";
import TwinStandardRooms from "./pages/TwinStandardRooms";
import SingleRoomPage from "./pages/SingleRoomPage";
import DoubleRoomPageCopy from "./pages/DoubleRoomPageCopy";
import DoubleRoomPage from "./pages/DoubleRoomPage";
import TwinStandardRoomPage from "./pages/TwinStandardRoomPage";
import Page404 from "./pages/Page404";
import AdminLogin from "./pages/AdminLogin";
import ManagerLogin from "./pages/ManagerLogin";
import UserLogin from "./pages/UserLogin";

import PrivateRoutes from "./utils/PrivateRoutes";
import AdminRoutes from "./utils/AdminRoutes";
import ManagerRoutes from "./utils/ManagerRoutes";
import ReceptionistRoutes from "./utils/ReceptionistRoutes";

import "react-toastify/dist/ReactToastify.css";

// admin
import AdminEmployees from "./pages/AdminEmployees";
import AdminGuests from "./pages/AdminGuests";
import AdminReservations from "./pages/AdminReservations";
import AdminRooms from "./pages/AdminRooms";
import AdminReports from "./pages/AdminReports";
import AdminLogs from "./pages/AdminLogs";

// manager
import ManagerGuests from "./pages/ManagerGuests";
import ManagerReservations from "./pages/ManagerReservations";
import ManagerRooms from "./pages/ManagerRooms";
import ManagerReceptionists from "./pages/ManagerReceptionists";
import ManagerReports from "./pages/ManagerReports";
import ManagerLogs from "./pages/ManagerLogs";

// receptionist
import ReceptionistGuests from "./pages/ReceptionistGuests";
import ReceptionistRooms from "./pages/ReceptionistRooms";
import ReceptionistReservations from "./pages/ReceptionistReservations";
import ReceptionistReports from "./pages/ReceptionistReports";
import ReceptionistLogs from "./pages/ReceptionistLogs";

import { Toaster } from "react-hot-toast";

function App() {
  // const location = useLocation();

  return (
    <NextUIProvider>
      <Router>
        <AuthProvider>
          <div>
            <Toaster position="top-right" reverseOrder={false} />
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rooms" element={<RoomsAndSuits />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/register" element={<UserRegister />} />
            <Route path="/manager" element={<ManagerLogin />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="*" element={<Page404 />}></Route>

            {/* Private routes for regular users */}
            <Route element={<PrivateRoutes />}>
              <Route path="/book" element={<Book />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/single-rooms" element={<SingleRooms />} />
              <Route path="/double-rooms" element={<DoubleRooms />} />
              <Route
                path="/twin-standard-rooms"
                element={<TwinStandardRooms />}
              />
              <Route path="/single/:roomId" element={<SingleRoomPage />} />
              <Route path="/double/:roomId" element={<DoubleRoomPageCopy />} />
              <Route path="/twin-standard/:roomId" element={<TwinStandardRoomPage />} />
            </Route>

            {/* Private routes for Admin */}
            <Route element={<AdminRoutes />}>
              <Route path="/admin-dashboard/guests" element={<AdminGuests />} />
              <Route
                path="/admin-dashboard/employees"
                element={<AdminEmployees />}
              />
              <Route
                path="/admin-dashboard/reservations"
                element={<AdminReservations />}
              />
              <Route path="/admin-dashboard/rooms" element={<AdminRooms />} />
              <Route
                path="/admin-dashboard/reports"
                element={<AdminReports />}
              />
              <Route path="/admin-dashboard/logs" element={<AdminLogs />} />
            </Route>

            {/* Private routes for Managers */}
            <Route element={<ManagerRoutes />}>
              <Route
                path="/manager-dashboard/guests"
                element={<ManagerGuests />}
              />
              <Route
                path="/manager-dashboard/receptionists"
                element={<ManagerReceptionists />}
              />
              <Route
                path="/manager-dashboard/rooms"
                element={<ManagerRooms />}
              />
              <Route
                path="/manager-dashboard/reservations"
                element={<ManagerReservations />}
              />
              <Route
                path="/manager-dashboard/reports"
                element={<ManagerReports />}
              />
              <Route path="/manager-dashboard/logs" element={<ManagerLogs />} />
            </Route>

            {/* Private routes for Receptionist */}
            <Route element={<ReceptionistRoutes />}>
              <Route
                path="/receptionist-dashboard/guests"
                element={<ReceptionistGuests />}
              />
              <Route
                path="/receptionist-dashboard/rooms"
                element={<ReceptionistRooms />}
              />
              <Route
                path="/receptionist-dashboard/reservations"
                element={<ReceptionistReservations />}
              />
              _
              <Route
                path="/receptionist-dashboard/reports"
                element={<ReceptionistReports />}
              />
              <Route
                path="/receptionist-dashboard/logs"
                element={<ReceptionistLogs />}
              />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </NextUIProvider>
  );
}

export default App;
