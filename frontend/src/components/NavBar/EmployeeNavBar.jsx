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

export default function EmployeesNavBar() {
  const { role, user, logout } = useAuth();
  const [count, setCount] = useState([]);

  const guestFetchData = async () => {
    try {
      const appWriteData = await reservationCollection();
      setCount(appWriteData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const total = count.length
  useEffect(() => {
    guestFetchData();
  }, []);

  return (
    <Navbar isBordered className="px-8 py-1 flex items-start justify-end">
      <NavbarContent className="flex gap-16" justify="end">
        <NavbarItem className="">
          <Badge color="danger" content={total} size="lg" shape="circle">
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
              <DropdownItem
                key="settings"
                color="success"
                href="/receptionist/settings"
              >
                Account Settings
              </DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={logout}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
