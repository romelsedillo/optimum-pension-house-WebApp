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
} from "@nextui-org/react";

import Logo from "../Logo/Logo";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";

export default function NavbarComponent() {
  const navigate = useNavigate();
  const { user, role, logout } = useAuth();

  return (
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
                  aria-label="Profile Actions"
                  variant="flat"
                  disabledKeys={["profile"]}
                >
                  <DropdownItem key="profile">
                    <p className=" capitalize">{user?.labels}</p>
                  </DropdownItem>
                  {role === "guest" && (
                    <DropdownItem key="settings">
                      <NavLink
                        color="foreground"
                        to="/profile"
                        className=" hover:border-b-2 border-[#fff]"
                      >
                        Profile
                      </NavLink>
                    </DropdownItem>
                  )}
                  {role === "guest" && (
                    <DropdownItem key="settings">
                      <NavLink
                        color="foreground"
                        to="/bookings"
                        className=" hover:border-b-2 border-[#fff]"
                      >
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
  );
}
