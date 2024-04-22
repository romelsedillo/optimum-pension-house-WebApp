import ReceptionistSideBar from "../components/SideBar/ReceptionistSideBar";
import ReceptionistNavBar from "../components/NavBar/ReceptionistNavBar";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
const ReceptionistReports = () => {
  return (
    <div className="bg-[#F1F5F9] h-screen w-full flex">
      <ReceptionistSideBar />
      <div className="w-full flex flex-col h-screen overflow-y-auto">
        <ReceptionistNavBar />
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

export default ReceptionistReports;
