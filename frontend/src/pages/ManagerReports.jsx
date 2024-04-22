import ManagerSidebar from "../components/SideBar/ManagerSideBar";
import ManagerNavBar from "../components/NavBar/ManagerNavBar";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
const ManagerReports = () => {
  return (
    <div className="bg-[#F1F5F9] h-screen w-full flex">
      <ManagerSidebar />
      <div className="w-full flex flex-col h-screen overflow-y-auto">
        <ManagerNavBar />
        <div className="p-4 flex flex-col gap-4">
          <div className="w-full py-1 flex justify-between px-16">
            <p className="text-[#0070F0] text-3xl">Reports</p>
            <Breadcrumb dashboard="Dashboard" path="Reports" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerReports;
