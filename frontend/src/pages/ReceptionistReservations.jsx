import ReceptionistSideBar from "../components/SideBar/ReceptionistSideBar";
import ReceptionistNavBar from "../components/NavBar/ReceptionistNavBar";
import SalesBox from "../components/Box/SalesBox";
import CheckInBox from "../components/Box/CheckInBox";
import RoomsBox from "../components/Box/RoomsBox";
import RoomsOccupiedBox from "../components/Box/RoomsOccupiedBox";
import ReservationsTable from "../components/Tables/ReservationsTable/ReservationsTable";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
const ReceptionistReservations = () => {
  return (
    <div className="bg-[#F1F5F9] h-screen w-full flex">
      <ReceptionistSideBar />
      <div className="w-full flex flex-col h-screen overflow-y-auto">
        <ReceptionistNavBar />
        <div className="p-4 flex flex-col gap-4">
          <div className="w-full py-1 flex justify-between px-16">
            <p className="text-[#0070F0] text-3xl">Reservations</p>
            <Breadcrumb dashboard="Dashboard" path="Reservations" />
          </div>
          <div className="w-full flex justify-between gap-6">
            <SalesBox />
            <CheckInBox />
            <RoomsBox />
            <RoomsOccupiedBox />
          </div>
          <div className="flex p-5 border-[1px] bg-white shadow-lg rounded-md">
            <ReservationsTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceptionistReservations;
