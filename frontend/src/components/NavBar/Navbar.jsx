import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faBars } from "@fortawesome/free-solid-svg-icons";
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
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
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
import reservationCollection from "../../utils/Collections/ReservationCollection";
import { addLogs } from "../../utils/AddFunctions/AddLogs";

export default function NavbarComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);
  const { user, role, logout, CurrentDayTime } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [reservations, setReservations] = useState([]);
  const menuItems = [
    { id: 1, title: "Home", link: "/" },
    { id: 2, title: "Rooms & Suites", link: "/rooms" },
    { id: 3, title: "Gallery", link: "/gallery" },
  ];
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const fetchNotifications = async () => {
    try {
      const appWriteData = await NotificationCollection();
      setNotifications(appWriteData);
    } catch (error) {
      console.error("Error fetching notification notifications:", error);
    }
  };
  const fetchReservations = async () => {
    try {
      const appWriteData = await reservationCollection();
      setReservations(appWriteData);
    } catch (error) {
      console.error("Error fetching reservation notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    fetchReservations();
  }, []);

  const handleLogout = () => {
    const actions = "logout";
    const details = "logout";
    const status = "success";
    const position = role ? role : "guest";

    addLogs(CurrentDayTime, user?.name, position, actions, details, status);

    logout();
  };

  const notificationData = notifications.filter(
    (item) => item.guests === user?.$id
  );
  const notification = notificationData.length;
  const message = notificationData[0]?.message;
  const type = notificationData[0]?.type;

  const reservationData = reservations.filter(
    (item) => item.guestId === user?.$id
  );

  const handleOpen = () => {
    onOpen();
  };

  const [isScrolled, setIsScrolled] = useState(false);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     // Check if the page has been scrolled
  //     if (window.scrollY > 0) {
  //       setIsScrolled(true);
  //     } else {
  //       setIsScrolled(false);
  //     }
  //   };

  //   // Add scroll event listener when component mounts
  //   window.addEventListener("scroll", handleScroll);

  //   // Cleanup by removing event listener when component unmounts
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  return (
    <>
      <Navbar
        shouldHideOnScroll
        onMenuOpenChange={setIsMenuOpen}
        className=" bg-[#F6F5F2] h-[80px] w-full"
      >
        <NavbarContent className="">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand className="">
            <Link href="/" className=" gap-2 text-orange-500">
              <Logo w="12" h="12" />
              <p className="hidden sm:flex font-DMSerifDisplay font-light text-[26px]">
                Optimum Pension House
              </p>
            </Link>
          </NavbarBrand>
        </NavbarContent>

        {/* nav links */}
        <NavbarContent
          className="hidden md:flex gap-10 w-full "
          justify="end"
        >
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
        </NavbarContent>
        {!user ? (
          <NavbarContent justify="end">
            <NavbarItem>
              <Button
                radius="sm"
                size="sm"
                className=" bg-orange-500 text-[white] font-semibold px-6 shadow-lg"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>{" "}
            </NavbarItem>
          </NavbarContent>
        ) : (
          <NavbarContent className="" justify="end">
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
                <DropdownItem key="name">
                  <p className=" capitalize text-blue-500 text-lg">
                    {user?.name}
                  </p>
                </DropdownItem>
                {/* {role === null && (
                      <DropdownItem key="profile" color="primary">
                        <NavLink color="foreground" to="/profile">
                          Profile
                        </NavLink>
                      </DropdownItem>
                    )} */}
                {!role && (
                  <DropdownItem key="notification" color="primary">
                    {notification ? (
                      <NavLink className="flex flex-col" to="/notifications">
                        <h1>
                          Notification
                          <span className="text-green-500">*</span>
                        </h1>
                        <span className=" text-tiny text-green-400">
                          {message}
                        </span>
                      </NavLink>
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

                {!role && (
                  <DropdownItem key="bookings" color="primary">
                    <NavLink color="foreground" to="/bookings">
                      Bookings
                    </NavLink>
                  </DropdownItem>
                )}

                {role && (
                  <DropdownItem key="dashboard">
                    <Link href={`/${role}-dashboard/guests`} color="foreground">
                      Dashboard
                    </Link>
                  </DropdownItem>
                )}
                <DropdownItem
                  key="logout"
                  color="danger"
                  onClick={() => handleLogout()}
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarContent>
        )}

        <NavbarMenu className="bg-[#F6F5F2] pt-10">
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item.id}-${index}`}>
              <NavLink className="w-full text-black" to={item.link} size="lg">
                {item.title}
              </NavLink>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
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
