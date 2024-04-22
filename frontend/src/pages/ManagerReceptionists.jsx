import ManagerSidebar from "../components/SideBar/ManagerSideBar";
import EmployeesNavBar from "../components/NavBar/EmployeeNavBar";
import SalesBox from "../components/Box/SalesBox";
import CheckInBox from "../components/Box/CheckInBox";
import RoomsBox from "../components/Box/RoomsBox";
import RoomsOccupiedBox from "../components/Box/RoomsOccupiedBox";
import ReceptionistTable from "../components/Tables/ReceptionistTable/ReceptionistTable";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
const ManagerReceptionists = () => {
  return (
    <div className="bg-[#F1F5F9] h-screen w-full flex">
      <ManagerSidebar />
      <div className="w-full flex flex-col h-screen overflow-y-auto">
        <EmployeesNavBar />
        <div className="p-4 flex flex-col gap-4">
          <div className="w-full py-1  flex justify-between px-16">
            <p className="text-[#0070F0] text-3xl">Receptionist</p>
            <Breadcrumb dashboard="Dashboard" path="Guests" />
          </div>
          <div className="w-full flex justify-between gap-6">
            <SalesBox />
            <CheckInBox />
            <RoomsBox />
            <RoomsOccupiedBox />
          </div>
          <div className="flex p-5 border-[1px] bg-white shadow-lg rounded-md">
            <ReceptionistTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerReceptionists;
