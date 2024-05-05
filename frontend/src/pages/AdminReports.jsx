import AdminSidebar from "../components/SideBar/AdminSideBar";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import EmployeesNavBar from "../components/NavBar/EmployeeNavBar";
import ReportsTable from "../components/Tables/ReportsTable/ReportsTable";

import PrintWordButton from "../components/PrintWordButton/PrintWordButton";
import DataTable from "../components/Tables/DataTable/DataTable";
import {reportsCollection} from "../utils/Collections/ReportsCollection"
import { useState, useEffect } from "react";


const AdminReports = () => {

  const [data, setData] = useState([])

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


 
  return (
    <div className="bg-[#F1F5F9] h-screen w-full flex">
      <AdminSidebar />
      <div className="w-full flex flex-col overflow-y-auto">
        <EmployeesNavBar />
        <div className="p-4 flex flex-col gap-4">
          <div className="w-full py-1 flex justify-between px-16">
            <p className="text-[#0070F0] text-3xl">Reports</p>
            <Breadcrumb dashboard="Dashboard" path="Reports" />
          </div>
          <div className="w-full flex flex-col gap-4 p-5 border-[1px] bg-white shadow-lg rounded-md">
            <div className="w-full hidden">
              <DataTable data={data} />
            </div>
            <div className="">
              <PrintWordButton />
            </div>
            <ReportsTable data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;
