// import { useAuth } from "../utils/AuthContext";
import Sidebar from "../components/AdminDashboard/Sidebar";
import AdminNavBar from "../components/AdminDashboard/AdminNavBar";
import AdminTable from "../components/AdminDashboard/AdminTable/AdminTable";
import Box from "../components/AdminDashboard/Box";
import Box2 from "../components/AdminDashboard/Box2";

const ManagerDashboardAdmins = () => {
  // const { admin, logoutAdmin } = useAuth();

  return (
    <div className="bg-[#F1F5F9] h-screen w-full flex">
      <div className="">
        <Sidebar />
      </div>
      <div className="w-full flex flex-col gap-2 h-screen overflow-y-auto">
        <AdminNavBar />
        <div className="p-5 flex flex-col gap-4">
          <div className="flex gap-6">
            <Box heading="Sales Today"/>
            <Box heading="Check-ins Today"/>
            <Box heading="Pending Reservations"/>
            <Box heading="Rooms Available"/>
          </div>
          <div className="flex p-5 border-[1px] bg-white shadow-lg rounded-md">
            <AdminTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboardAdmins;
