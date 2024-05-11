import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Badge,
} from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";

import Logo from "../Logo/Logo";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";
import { NotificationIcon } from "./NotificationIcon";
import { useEffect, useState } from "react";
import NotificationCollection from "../../utils/Collections/NotificationCollection";

export default function NavbarComponent() {
  const { user, role, logout, CurrentDayTime } = useAuth();
  const [data, setData] = useState([]);
  const [currentDateTime, setCurrentDateTime] = useState(CurrentDayTime);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const appWriteData = await NotificationCollection();
      setData(appWriteData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(() => {
      setCurrentDateTime(CurrentDayTime());
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const notificationData = data.filter((item) => item.guests === user?.$id);
  const notification = notificationData.length;
  const message = notificationData[0]?.message;
  const type = notificationData[0]?.type;

  const handleOpen = () => {
    onOpen();
  };

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if the page has been scrolled
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Add scroll event listener when component mounts
    window.addEventListener("scroll", handleScroll);

    // Cleanup by removing event listener when component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <Navbar
        className={` bg-[#F6F5F2] h-[80px] fixed top-0 w-full z-10 transition-shadow duration-300 ${
          isScrolled ? "shadow-lg" : ""
        }`}
      >
        <NavbarContent justify="start">
          <NavbarBrand className="mr-4">
            <Link href="/" className=" gap-2 text-orange-500">
              <Logo w="12" h="12" />
              <p className=" font-DMSerifDisplay sm:block font-light ml-4 text-[26px]">
                Optimum Pension House
              </p>
            </Link>
          </NavbarBrand>
        </NavbarContent>

        {/* nav links */}
        <NavbarContent className="hidden sm:flex gap-10" justify="end">
          <NavbarItem>
            <NavLink
              color="foreground"
              to="/"
              aria-current="page"
              className=" font-Manrope font-medium text-[#333A73] hover:border-b-2 border-orange-500"
            >
              Home
            </NavLink>
          </NavbarItem>
          <NavbarItem>
            <NavLink
              color="foreground"
              to="/rooms"
              className=" font-Manrope font-medium text-[#333A73] hover:border-b-2  border-orange-500"
            >
              Rooms & Suites
            </NavLink>
          </NavbarItem>

          <NavbarItem>
            <NavLink
              color="foreground"
              to="/gallery"
              className=" font-Manrope font-medium text-[#333A73] hover:border-b-2  border-orange-500"
            >
              Gallery
            </NavLink>
          </NavbarItem>

          <div>
            {user ? (
              <NavbarContent as="div" className="items-center" justify="end">
                <Dropdown placement="bottom-end">
                  {notification ? (
                    <Badge
                      isOneChar
                      content={notification && <NotificationIcon size={12} />}
                      color="danger"
                      shape="circle"
                      placement="top-right"
                    >
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
                    </Badge>
                  ) : (
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
                  )}

                  <DropdownMenu
                    aria-label="Profile Actions"
                    variant="flat"
                    disabledKeys={["profile"]}
                  >
                    {role === "" && (
                      <DropdownItem key="labels">
                        <p className=" capitalize">{user?.labels}</p>
                      </DropdownItem>
                    )}
                    <DropdownItem key="name">
                      <p className=" capitalize text-blue-500 text-lg">
                        {user?.name}
                      </p>
                    </DropdownItem>
                    {role === "guest" && (
                      <DropdownItem key="profile" color="primary">
                        <NavLink color="foreground" to="/profile">
                          Profile
                        </NavLink>
                      </DropdownItem>
                    )}
                    {role === "guest" && (
                      <DropdownItem key="notification" color="primary">
                        {notification ? (
                          <div
                            className="flex flex-col"
                            onClick={() => handleOpen()}
                          >
                            <h1>
                              Notification
                              <span className="text-green-500">*</span>
                            </h1>
                            <span className=" text-tiny text-green-400">
                              {message}
                            </span>
                          </div>
                        ) : (
                          <div className="flex flex-col">
                            Notification
                            <span className=" text-tiny text-gray-300">
                              No notifications here.
                            </span>
                          </div>
                        )}
                      </DropdownItem>
                    )}
                    {role === "guest" && (
                      <DropdownItem key="bookings" color="primary">
                        <NavLink color="foreground" to="/bookings">
                          Bookings
                        </NavLink>
                      </DropdownItem>
                    )}
                    {(role === "receptionist" ||
                      role === "manager" ||
                      role === "admin") && (
                      <DropdownItem key="dashboard">
                        <Link
                          href={`/${role}-dashboard/guests`}
                          color="foreground"
                        >
                          Dashboard
                        </Link>
                      </DropdownItem>
                    )}
                    <DropdownItem key="logout" color="danger" onClick={logout}>
                      Log Out
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </NavbarContent>
            ) : (
              <Button
                radius="sm"
                size="sm"
                className=" bg-orange-500 text-[white] font-semibold px-6 shadow-lg"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            )}
          </div>
        </NavbarContent>
      </Navbar>
      <Modal size="sm" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex gap-1">
                Hello, <span className=" capitalize">{user.name}</span>
              </ModalHeader>
              <ModalBody>
                {type === "success" ? (
                  <>
                    <p>
                      We are delighted to inform you that your booking with us
                      has been successfully confirmed. Your reservation details
                      are as follows:
                    </p>
                    <div>
                      <p>Room Type: </p>
                      <p>Check-in Date:</p>
                      <p>Check-out Date:</p>
                    </div>
                    <p>
                      Thank you for choosing to stay with us! We look forward to
                      welcoming you soon.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      We regret to inform you that your booking with us has been
                      canceled. We apologize for any inconvenience this may have
                      caused.{" "}
                    </p>
                    <p>
                      If you require any further assistance or have any
                      questions regarding the cancellation, please do not
                      hesitate to contact us. We appreciate your understanding
                      and hope to have the opportunity to welcome you in the
                      future.
                    </p>
                  </>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
