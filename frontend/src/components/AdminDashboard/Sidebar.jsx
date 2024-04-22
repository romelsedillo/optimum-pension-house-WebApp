import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  // faBars,
  faUser,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { accounts, managerSidebar } from "../../constants/accounts";

import { Accordion, AccordionItem, Link } from "@nextui-org/react";

import { useAuth } from "../../utils/AuthContext";

const Sidebar = () => {
  const { role, logout } = useAuth();
  // const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  // const handleToggleSidebar = () => {
  //   setOpen(!open);
  // };
  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div
      className={`${
        open ? " w-[210px]" : "w-[100px]"
      } relative duration-500 h-screen bg-[#1C2434]`}
    >
      {/* <div
        className=" border-[3px] absolute cursor-pointer -right-4 top-24 w-10 h-10 bg-white flex items-center justify-center font-bold"
        onClick={handleToggleSidebar}
      >
        <FontAwesomeIcon icon={faBars} className="w-6 h-6" />
      </div> */}
      <div className="flex flex-col items-center px-6">
        <div className=" w-[100%] flex flex-col gap-1">
          <div
            className="mt-8 cursor-pointer gap-2 h-[70px]"
            onClick={() => navigate("/admin-dashboard")}
          >
            <div className=" w-full flex items-start justify-center gap-2">
              {/* <FontAwesomeIcon icon={faUser} className=" w-6 h-6 text-white" /> */}
              <h1
                className={`${
                  !open && "scale-0"
                } font-bold text-white duration-500 text-[18px]`}
              >
                {/* {open && "Admin"} */}
                {capitalize(role)} Dashboard
              </h1>
            </div>
          </div>
          <hr className={`w-[100%] duration-100 align-center`} />
          <div className="w-full flex items-start justify-center flex-col text-white font-bold mt-10">
            <ul className="flex flex-col items-center justify-center w-full gap-2">
              <div className="w-full">
                <Accordion variant="splitted" fullWidth>
                  <AccordionItem
                    className="rounded-sm"
                    key="1"
                    aria-label="Users"
                    title="Users"
                    startContent={
                      <FontAwesomeIcon
                        icon={faUser}
                        className="w-6 h-6 text-black"
                      />
                    }
                  >
                    <div className="flex flex-col">
                      {accounts.map((account) => (
                        <Link
                          isBlock
                          key={account.id}
                          href={account.link}
                          color="foreground"
                          className=" cursor-pointer"
                        >
                          {account.title}
                        </Link>
                      ))}
                    </div>
                  </AccordionItem>
                </Accordion>
              </div>
              <div className="w-full flex flex-col items-start mt-6">
                {managerSidebar.map((item) => (
                  <div
                    key={item.id}
                    className="hover:bg-slate-600 w-full rounded-md"
                  >
                    <Link
                      isBlock
                      color="foreground"
                      className="cursor-pointer text-white flex gap-4 py-2"
                      href={item.link}
                    >
                      <FontAwesomeIcon icon={item.icon} />
                      {item.title}
                    </Link>
                  </div>
                ))}
              </div>
              <div className="w-full flex items-center gap-4 mt-8 hover:bg-slate-600 py-2 rounded-md px-3">
                <FontAwesomeIcon icon={faRightFromBracket} />
                <p className="cursor-pointer" onClick={logout}>
                  Logout
                </p>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
