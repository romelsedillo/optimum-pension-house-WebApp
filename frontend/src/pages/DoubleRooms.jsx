import NavBar from "../components/NavBar/Navbar";
import Footer from "../components/Footer/footer";
import DoubleRoomsComp from "../components/DoubleRooms/DoubleRoomsComp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

const DoubleRooms = () => {
  return (
    <div className="mt-20">
      <NavBar />
      <div className="w-full px-36 py-10 h-[2200px]">
        <div className="mb-4 flex flex-col gap-4 text-[#333A73]">
          <div className="flex flex-col">
            <h1 className=" font-Poppins text-4xl">Double Rooms</h1>
            <p className=" capitalize">Capacity: 2 Persons</p>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon
                icon={faCircleCheck}
                className="text-green-500"
              />
              <p className="text-tiny">Fully air conditioned room</p>
            </div>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon
                icon={faCircleCheck}
                className="text-green-500"
              />
              <p className="text-tiny">LED TV w/ cable</p>
            </div>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon
                icon={faCircleCheck}
                className="text-green-500"
              />
              <p className="text-tiny">Hot and cold shower</p>
            </div>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon
                icon={faCircleCheck}
                className="text-green-500"
              />
              <p className="text-tiny">Free WIFI with 50mbps internet speed</p>
            </div>
          </div>
        </div>
        <DoubleRoomsComp />
      </div>
      <Footer />
    </div>
  );
};
export default DoubleRooms;
