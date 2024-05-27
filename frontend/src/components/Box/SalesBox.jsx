import { useState, useEffect } from "react";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { reservationCollectionSales } from "../../utils/Collections/ReservationCollectionSales";
import { Spinner } from "@nextui-org/react";

const SalesBox = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [totalSales, setTotalSales] = useState(0);

  const fetchData = async () => {
    try {
      const appWriteData = await reservationCollectionSales();
      setData(appWriteData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
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

      const salesSum = data
        .filter((item) => {
          const checkInDate = new Date(item.checkInDate);
          return checkInDate >= startOfDay && checkInDate <= endOfDay;
        })
        .reduce((acc, item) => acc + item.totalAmount, 0);

      setTotalSales(salesSum);
    }
  }, [data]);

  const formatCurrency = (amount) => {
    return amount.toLocaleString("en-PH", {
      style: "currency",
      currency: "PHP",
      minimumFractionDigits: 2,
    });
  };
  return (
    <div className="flex flex-col justify-between bg-white w-full h-[150px] shadow-lg rounded-lg px-8 py-5">
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200">
        <FontAwesomeIcon icon={faCoins} className="w-4 h-4 text-blue-500" />
      </div>
      <p className="text-3xl text-green-500">
        {loading ? (
          <Spinner size="sm" color="success" />
        ) : (
          formatCurrency(totalSales)
        )}
      </p>

      <h1 className="text-sm">Sales Today</h1>
    </div>
  );
};

export default SalesBox;
