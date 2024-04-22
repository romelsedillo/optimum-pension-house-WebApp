import {
  Navbar,
  NavbarContent,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";

import { useAuth } from "../../utils/AuthContext";

export default function AdminNavBar() {
  const { role, user, logout } = useAuth();
  return (
    <Navbar isBordered height="5rem">
      <NavbarContent justify=""></NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        <p>
          {role} {user?.name}
        </p>
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="success"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu
            disabledKeys={["profile"]}
            aria-label="Profile Actions"
            variant="flat"
          >
            <DropdownItem key="profile">
              {user.email}
            </DropdownItem>
            <DropdownItem key="settings" color="success">Account Settings</DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={logout}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
