import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faUser,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { receptionistSidebar } from "../../constants/accounts";
import { useAuth } from "../../utils/AuthContext";
import { useState } from "react";
import EmployeeStatus from "../../utils/UpdateFunctions/EmployeeStatus";

const Sidebar = () => {
  const { role, user, logout } = useAuth();
  const [open, setOpen] = useState(true);

  const handleToggleSidebar = () => {
    setOpen(!open);
  };
  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const status = "online";
  const userId = user?.$id;
  EmployeeStatus(userId, status);

  const handleLogout = () => {
    const status = "offline";
    const userId = user?.$id;
    EmployeeStatus(userId, status);
    logout();
  };
  return (
    <div
      className={`${
        open ? " w-[210px]" : "w-[100px]"
      } relative duration-500 h-screen bg-[#1C2434]`}
    >
      <div
        className="hidden border-[3px] absolute cursor-pointer -right-4 top-24 w-10 h-10 bg-white items-center justify-center font-bold"
        onClick={handleToggleSidebar}
      >
        <FontAwesomeIcon icon={faBars} className="w-6 h-6" />
      </div>
      <div className="flex flex-col items-center px-6">
        <div className=" w-[100%] flex flex-col gap-1">
          <div className="mt-8 cursor-pointer gap-2 h-[70px]">
            <div className=" w-full flex items-start justify-center gap-2">
              <FontAwesomeIcon
                icon={faUser}
                className="hidden w-6 h-6 text-white"
              />
              <div
                className={`${
                  !open && "scale-0"
                } font-bold text-white duration-500 text-[18px]`}
              >
                {/* {open && "Admin"} */}
                {capitalize(role)}
              </div>
            </div>
          </div>
          <hr className={`w-[100%] duration-100 align-center`} />
          <div className="w-full flex items-start justify-center flex-col text-white font-bold mt-8">
            <ul className="flex flex-col items-center justify-center w-full">
              <div className="w-full flex flex-col items-start mt-6">
                {receptionistSidebar.map((item) => (
                  <div key={item.id} className="gap-2 w-full rounded-md">
                    <NavLink
                      style={({ isActive }) => ({
                        backgroundColor: isActive ? "rgb(71 85 105)" : "",
                        // color: isActive ? "greenyellow" : "",
                        borderRadius: "5px",
                      })}
                      className="cursor-pointer hover:text-slate-300 text-white no-underline flex gap-4 p-2"
                      to={item.link}
                    >
                      <FontAwesomeIcon icon={item.icon} />
                      <p
                        className={`${
                          !open && "scale-0"
                        } duration-300 origin-left`}
                      >
                        {open && item.title}
                      </p>
                    </NavLink>
                  </div>
                ))}
              </div>
            </ul>
            <div className="w-full flex items-center gap-4 mt-8 hover:bg-slate-600 py-2 rounded-md px-3">
              <FontAwesomeIcon icon={faRightFromBracket} />
              <p className="cursor-pointer" onClick={() => handleLogout()}>
                Logout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
