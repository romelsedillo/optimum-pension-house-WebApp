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

export default function NavbarComponent() {
  const { user, role, logout } = useAuth();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const notification = 1;

  const handleOpen = () => {
    onOpen();
  };

  return (
    <>
      <Navbar isBordered className=" bg-[#DD7210] text-[white] h-[80px]">
        <NavbarContent justify="start">
          <NavbarBrand className="mr-4">
            <Link href="/" className=" gap-2">
              <Logo />
              <p className="hidden sm:block font-bold text-[white] ml-4 text-[28px] font-CormorantGaramond italic">
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
              className=" hover:border-b-2 border-[#fff]"
            >
              Home
            </NavLink>
          </NavbarItem>
          <NavbarItem>
            <NavLink
              color="foreground"
              to="/rooms"
              className=" hover:border-b-2 border-[#fff]"
            >
              Rooms & Suites
            </NavLink>
          </NavbarItem>

          <NavbarItem>
            <NavLink
              color="foreground"
              to="/gallery"
              className=" hover:border-b-2 border-[#fff]"
            >
              Gallery
            </NavLink>
          </NavbarItem>

          <div>
            {user ? (
              <NavbarContent as="div" className="items-center" justify="end">
                <Dropdown placement="bottom-end">
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
                  <DropdownMenu
                    aria-label="Profile Actions"
                    variant="flat"
                    disabledKeys={["profile"]}
                  >
                    {role === "" && (
                      <DropdownItem key="profile">
                        <p className=" capitalize">{user?.labels}</p>
                      </DropdownItem>
                    )}
                    <DropdownItem key="profile">
                      <p className=" capitalize">{user?.name}</p>
                    </DropdownItem>
                    {role === "guest" && (
                      <DropdownItem key="settings" color="primary">
                        <NavLink color="foreground" to="/profile">
                          Profile
                        </NavLink>
                      </DropdownItem>
                    )}
                    {role === "guest" && (
                      <DropdownItem
                        key="settings"
                        color="primary"
                        onPress={() => handleOpen()}
                      >
                        <div className="flex flex-col">
                          Notification
                          <span className=" text-tiny text-blue-400">
                            You successfully booked a room!
                          </span>
                        </div>
                      </DropdownItem>
                    )}
                    {role === "guest" && (
                      <DropdownItem key="settings" color="primary">
                        <NavLink color="foreground" to="/bookings">
                          Bookings
                        </NavLink>
                      </DropdownItem>
                    )}
                    {(role === "receptionist" ||
                      role === "manager" ||
                      role === "admin") && (
                      <DropdownItem key="settings">
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
                className=" bg-[white] text-[#DD7210] font-bold"
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
              <ModalHeader className="flex flex-col gap-1">
                Hello, {user.name}
              </ModalHeader>
              <ModalBody>
                <p>
                  We are delighted to inform you that your booking with us has
                  been successfully confirmed. Your reservation details are as
                  follows:
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
