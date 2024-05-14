import React, { useState, useEffect } from "react";
import ManagerSidebar from "../components/SideBar/ManagerSideBar";
import EmployeesNavBar from "../components/NavBar/EmployeeNavBar";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import ReportsTable from "../components/Tables/ReportsTable/ReportsTable";
import PrintWordButton from "../components/PrintWordButton/PrintWordButton";
import DatePicker from "../components/DatePicker/DatePicker";
import DataTable from "../components/Tables/DataTable/DataTable";
import { reportsCollection } from "../utils/Collections/ReportsCollection";
import { useAuth } from "../utils/AuthContext";


const ManagerReports = () => {
  const { role, user, } = useAuth();

  const [data, setData] = useState([]);
  const [selectedDateRange, setSelectedDateRange] = useState(null); // State to hold the selected date range

  const fetchData = async () => {
    try {
      const appWriteData = await reportsCollection();
      setData(appWriteData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Function to handle date range selection
  const handleDateRangeChange = (dateRange) => {
    setSelectedDateRange(dateRange);
  };
console.log(user);
  return (
    <div className="bg-[#F1F5F9] h-screen w-full flex">
      <ManagerSidebar />
      <div className="w-full flex flex-col h-screen overflow-y-auto">
        <EmployeesNavBar />
        <div className="p-4 flex flex-col gap-4">
          <div className="w-full py-1 flex justify-between px-16">
            <p className="text-[#0070F0] text-3xl">Reports</p>
            <Breadcrumb dashboard="Dashboard" path="Reports" />
          </div>
          <div className="w-full flex flex-col gap-4 p-5 border-[1px] bg-white shadow-lg rounded-md">
            <div className="w-full hidden">
              <DataTable data={data}  selectedDateRange={selectedDateRange}/>
            </div>
            <div className="w-1/3 flex gap-3">
              <DatePicker onDateRangeChange={handleDateRangeChange} />
              <PrintWordButton />
            </div>
            {/* Pass selectedDateRange to ReportsTable component */}
            <ReportsTable data={data} selectedDateRange={selectedDateRange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerReports;
