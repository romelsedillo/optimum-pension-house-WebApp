import { useAuth } from "../utils/AuthContext";
import ManagerSidebar from "../components/SideBar/ManagerSideBar";
import EmployeesNavBar from "../components/NavBar/EmployeeNavBar";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import { Image, Button } from "@nextui-org/react";
const AccountSettings = () => {
  const { role, user } = useAuth();

  return (
    <div className="bg-[#F1F5F9] h-screen w-full flex">
      <ManagerSidebar />
      <div className="w-full flex flex-col overflow-y-auto">
        <EmployeesNavBar />
        <div className="p-4 flex flex-col gap-4">
          <div className="w-full py-1 flex justify-between px-16">
            <p className="text-[#0070F0] text-3xl">Account Settings</p>
            <Breadcrumb dashboard="Dashboard" path="Account Settingst" />
          </div>
          <div className="w-full flex flex-col gap-4 p-5 border-[1px] bg-white shadow-lg rounded-md">
            <div className="flex w-full">
              <div className="w-1/3">
                <h1 className="font-bold">Basic Information</h1>
                <div className="flex flex-col">
                  <label htmlFor="email">name: </label>
                  <input type="text" className="border border-black "></input>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="email">email address: </label>
                  <input type="text" className="border border-black "></input>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="email">Phone: </label>
                  <input type="text" className="border border-black "></input>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="email">Address: </label>
                  <input type="text" className="border border-black "></input>
                </div>
              </div>
              <div className="w-1/2 flex flex-col gap-4 items-center justify-center">
                <Image
                  width={200}
                  height={200}
                  src="https://i.pravatar.cc/2000?u=a042581f4e29026704d"
                  alt=""
                  className="rounded-full border-2 border-blue-500 p-[2px]"
                />
                <Button size="sm" color="primary">
                  Upload picture
                </Button>
              </div>
            </div>
            <hr className="bg-gray-300 h-[2px] border-none" />
            <div className="w-1/3 flex flex-col gap-2">
              <h1 className="font-bold">change Password</h1>
              <div className="flex flex-col">
                <label htmlFor="email">Old password: </label>
                <input type="text" className="border border-black "></input>
              </div>
              <div className="flex flex-col">
                <label htmlFor="email">New password: </label>
                <input type="text" className="border border-black "></input>
              </div>
              <div className="flex flex-col">
                <label htmlFor="email">Confirm password: </label>
                <input type="text" className="border border-black "></input>
              </div>
              <Button size="sm" color="primary">
                change password
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
