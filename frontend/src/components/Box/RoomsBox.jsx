import { useEffect, useState } from "react";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { roomCollection } from "../../utils/Collections/RoomCollection";

const SalesBox = () => {
  const [count, setCount] = useState([]);

  const guestFetchData = async () => {
    try {
      const appWriteData = await roomCollection();
      setCount(appWriteData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const totalRoomAvailable = count.filter(
    (item) => item.status === "available"
  ).length;
  const totalRoom = count.length;

  useEffect(() => {
    guestFetchData();
  }, []);

  return (
    <div className="flex flex-col justify-between bg-white w-full h-[150px] shadow-lg rounded-lg px-8 py-5">
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200">
        <FontAwesomeIcon icon={faBuilding} className=" w-4 h-4 text-blue-500" />
      </div>
      <p className=" text-3xl text-green-500">
        {totalRoomAvailable} / {totalRoom}
      </p>
      <h1 className="text-sm">Rooms Available</h1>
    </div>
  );
};

export default SalesBox;
