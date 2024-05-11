import {
  faClockRotateLeft,
  faBuilding,
  faCalendarCheck,
  faClipboardList,
  faUser
} from "@fortawesome/free-solid-svg-icons";

export const accounts = [
  { id: 1, title: "Admins", link: "/admin-dashboard/admins" },
  { id: 2, title: "Guests", link: "/admin-dashboard/guests" },
  { id: 2, title: "Guests", link: "/admin-dashboard/guests" },
];

export const adminSidebar = [
  { id: 1, title: "Guests", link: "/admin-dashboard/guests", icon: faUser },
  { id: 2, title: "Employees", link: "/admin-dashboard/employees", icon: faUser },
  { id: 3, title: "Reservations", link: "/admin-dashboard/reservations", icon: faCalendarCheck },
  { id: 4, title: "Rooms", link: "/admin-dashboard/rooms", icon: faBuilding },
  { id: 5, title: "Reports", link: "/admin-dashboard/reports", icon: faClipboardList },
  { id: 6, title: "Activity Logs", link: "/admin-dashboard/logs", icon: faClockRotateLeft },
];

export const managerSidebar = [
  { id: 1, title: "Guests", link: "/manager-dashboard/guests", icon: faUser },
  { id: 2, title: "Managers", link: "/manager-dashboard/managers", icon: faUser },
  { id: 3, title: "Rooms", link: "/manager-dashboard/rooms", icon: faBuilding },
  { id: 4, title: "Reservations", link: "/manager-dashboard/reservations", icon: faCalendarCheck },
  { id: 5, title: "Reports", link: "/manager-dashboard/reports", icon: faClipboardList },
  { id: 6, title: "Activity Logs", link: "/manager-dashboard/logs", icon: faClockRotateLeft },
];

export const receptionistSidebar = [
  { id: 1, title: "Guests", link: "/receptionist-dashboard/guests", icon: faUser },
  { id: 2, title: "Receptionists", link: "/receptionist-dashboard/receptionist", icon: faUser },
  { id: 3, title: "Rooms", link: "/receptionist-dashboard/rooms", icon: faBuilding },
  { id: 4, title: "Reservations", link: "/receptionist-dashboard/reservations", icon: faCalendarCheck },
  { id: 5, title: "Reports", link: "/receptionist-dashboard/reports", icon: faClipboardList },
  { id: 6, title: "Activity Logs", link: "/receptionist-dashboard/logs", icon: faClockRotateLeft },
];