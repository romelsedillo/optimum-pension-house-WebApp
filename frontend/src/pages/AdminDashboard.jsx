// import { useAuth } from "../utils/AuthContext";
import Sidebar from "../components/AdminDashboard/Sidebar";
import AdminNavBar from "../components/AdminDashboard/AdminNavBar";
import AdminTable from "../components/AdminDashboard/AdminTable/AdminTable";
import Box from "../components/AdminDashboard/Box";

const AdminDashboard = () => {
  // const { admin, logoutAdmin } = useAuth();

  return (
    <div className="bg-[#eaf1f7] h-screen w-full flex">
      <div className="">
        <Sidebar />
      </div>
      <div className="w-full flex flex-col gap-4 h-screen overflow-y-auto">
        <AdminNavBar />
        <div>
          <Box />
        </div>
        <div className="flex p-12 border">
          <AdminTable />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

// <div>
//   <p>Admin Dashboard</p>
//   <p>Admin: {admin?.name}</p>
//   <button onClick={logoutAdmin}>logout</button>
// </div>
