import AdminSidebar from "../components/SideBar/AdminSideBar";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import EmployeesNavBar from "../components/NavBar/EmployeeNavBar";
import ReportsTable from "../components/Tables/ReportsTable/ReportsTable";

import PrintWordButton from "../components/PrintWordButton/PrintWordButton";
import DataTable from "../components/Tables/DataTable/DataTable";
const AdminReports = () => {
  const tableData = [
    {
      date: "2024-04-30",
      quantity: 2,
      roomType: "Single",
      amount: "$100",
      totalAmount: "$200",
    },
    {
      date: "2024-05-01",
      quantity: 1,
      roomType: "Double",
      amount: "$150",
      totalAmount: "$150",
    },
  ];
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
              <DataTable data={tableData} />
            </div>
            <div className="">
              <PrintWordButton />
            </div>
            <ReportsTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;
