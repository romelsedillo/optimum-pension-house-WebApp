import {
  Navbar,
  NavbarContent,
  NavbarItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Badge,
  Tooltip,
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { useAuth } from "../../utils/AuthContext";
import { reservationCollection } from "../../utils/Collections/ReservationCollection";
import { useState, useEffect } from "react";
import { getCurrentDateTime } from "../../utils/CurrentDayTime";
import { addLogs } from "../../utils/AddFunctions/AddLogs";
import EmployeeStatus from "../../utils/UpdateFunctions/EmployeeStatus";

export default function EmployeesNavBar() {
  const { role, user, logout } = useAuth();
  const [count, setCount] = useState([]);

  const [currentDateTime, setCurrentDateTime] = useState(getCurrentDateTime());

  const guestFetchData = async () => {
    try {
      const appWriteData = await reservationCollection();
      setCount(appWriteData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const totalPending = count.filter((item) => item.status === "pending").length;

  const timeClock = () => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(getCurrentDateTime());
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  };
  useEffect(() => {
    guestFetchData();
    // timeClock();
  }, []);

  const offline = () => {
    const status = "offline";
    const userId = user?.$id;
    EmployeeStatus(userId, status);
  };
  const handleLogout = () => {
    const actions = "logout";
    const details = "logout";
    const status = "success";
    const position = role;
    addLogs(currentDateTime, user?.name, position, actions, details, status);
    offline();

    logout();
  };

  return (
    <Navbar
      isBordered
      maxWidth="full"
      className="py-1 px-6 flex justify-center"
    >
      <NavbarContent className="w-full">
        <NavbarItem className="">
          <h1 className="text-blue-500 text-lg">{currentDateTime}</h1>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent className="flex gap-16 w-full" justify="end">
        <NavbarItem className="">
          <Badge color="danger" content={totalPending} size="lg" shape="circle">
            <Tooltip
              key="left"
              placement="left"
              content="pending reservations"
              color="secondary"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200">
                <FontAwesomeIcon
                  icon={faBell}
                  className="text-blue-500 text-xl"
                />
              </div>
            </Tooltip>
          </Badge>
        </NavbarItem>
        <NavbarItem className="flex items-center gap-4">
          <h1 className=" text-blue-600">
            {role} {user?.name}
          </h1>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="success"
                name="Jason Hughes"
                size="md"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu
              disabledKeys={["profile"]}
              aria-label="Profile Actions"
              variant="flat"
            >
              <DropdownItem key="profile" color="success" className="">
                {user.email}
              </DropdownItem>
              {/* <DropdownItem
                key="settings"
                color="success"
                href={`/${role}-dashboard/settings`}
              >
                Account Settings
              </DropdownItem> */}
              <DropdownItem
                key="logout"
                color="danger"
                onClick={() => handleLogout()}
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
