import ReceptionistSideBar from "../components/SideBar/ReceptionistSideBar";
import EmployeeNavBar from "../components/NavBar/EmployeeNavBar";
import SalesBox from "../components/Box/SalesBox";
import CheckInBox from "../components/Box/CheckInBox";
import RoomsBox from "../components/Box/RoomsBox";
import RoomsOccupiedBox from "../components/Box/RoomsOccupiedBox";
import RoomsTable from "../components/Tables/RoomsTable/RoomsTable";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
const ReceptionistRooms = () => {
  return (
    <div className="bg-[#F1F5F9] h-screen w-full flex">
      <ReceptionistSideBar />
      <div className="w-full flex flex-col h-screen overflow-y-auto">
        <EmployeeNavBar />
        <div className="p-4 flex flex-col gap-4">
          <div className="w-full py-1 flex justify-between px-16">
            <p className="text-[#0070F0] text-3xl">Rooms</p>
            <Breadcrumb dashboard="Dashboard" path="Rooms" />
          </div>
          <div className="w-full flex justify-between gap-6">
            <SalesBox />
            <CheckInBox />
            <RoomsBox />
            <RoomsOccupiedBox />
          </div>
          <div className="flex p-5 border-[1px] bg-white shadow-lg rounded-md">
            <RoomsTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceptionistRooms;
