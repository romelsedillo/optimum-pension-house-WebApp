import react, { useState, useEffect } from "react";
import ReceptionistSidebar from "../components/SideBar/ReceptionistSideBar";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import EmployeesNavBar from "../components/NavBar/EmployeeNavBar";
import { Button } from "@nextui-org/react";
import ReceiptComp from "../components/Receipt/ReceiptComp";
import Receipt from "../components/Receipt/Receipt";
import reservationCollection from "../utils/Collections/ReservationCollection";
import PrintReceiptButton from "../components/PrintButton/PrintReceiptButton";

const adminReceipt = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

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
  }, []);
  return (
    <div className="bg-[#F1F5F9] h-screen w-full flex">
      <ReceptionistSidebar />
      <div className="w-full flex flex-col overflow-y-auto">
        <EmployeesNavBar />
        <div className="p-4 flex flex-col gap-4">
          <div className="w-full py-1 flex justify-between px-16">
            <p className="text-[#0070F0] text-3xl">Receipt</p>
            <Breadcrumb dashboard="Dashboard" path="Reservations / Receipt" />
          </div>
          <div className="w-full flex flex-col gap-4 p-5 border-[1px] bg-white shadow-lg rounded-md">
            <div>
              {loading ? (
                <Button color="primary" size="sm" isLoading>
                  Print Receipt
                </Button>
              ) : (
                <PrintReceiptButton loading={loading} />
              )}
            </div>
            <div className="hidden">
              <Receipt data={data} />
            </div>
            <ReceiptComp data={data} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default adminReceipt;
