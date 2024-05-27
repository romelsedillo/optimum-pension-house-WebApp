import { useState, useEffect } from "react";
import { faCheckToSlot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { reservationCollection } from "../../utils/Collections/ReservationCollection";
import { Spinner } from "@nextui-org/react";

const CheckInBox = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [totalCheckIn, setTotalCheckIn] = useState(0);

  const fetchData = async () => {
    try {
      const appWriteData = await reservationCollection();
      setData(appWriteData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 2000); // Fetch data every 5 seconds
    return () => clearInterval(intervalId); // Clean up interval on component unmount
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const today = new Date();
      const startOfDay = new Date(today.setHours(0, 0, 0, 0));
      const endOfDay = new Date(today.setHours(23, 59, 59, 999));

      const checkInCount = data.filter((item) => {
        const checkInDate = new Date(item.checkInDate);
        return (
          checkInDate >= startOfDay &&
          checkInDate <= endOfDay &&
          item.status === "check-in"
        );
      }).length;

      setTotalCheckIn(checkInCount);
    }
  }, [data]);

  return (
    <div className="flex flex-col justify-between bg-white w-full h-[150px] shadow-lg rounded-lg px-8 py-5">
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200">
        <FontAwesomeIcon
          icon={faCheckToSlot}
          className=" w-4 h-4 text-blue-500"
        />
      </div>
      <div className=" text-3xl text-green-500">
        {loading ? <Spinner color="success" size="sm" /> : totalCheckIn}
      </div>
      <h1 className="text-sm">Check-ins Today</h1>
    </div>
  );
};

export default CheckInBox;
