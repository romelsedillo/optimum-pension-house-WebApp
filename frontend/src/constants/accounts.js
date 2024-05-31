import {
  faClockRotateLeft,
  faBuilding,
  faCalendarCheck,
  faClipboardList,
  faUser,
  faPesoSign,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../utils/AuthContext";

export const accounts = [
  { id: 1, title: "Admins", link: "/admin-dashboard/admins" },
  { id: 2, title: "Guests", link: "/admin-dashboard/guests" },
  { id: 2, title: "Guests", link: "/admin-dashboard/guests" },
];

console.log(useAuth.totalPending);
export const adminSidebar = [
  {
    id: 1,
    title: "Guests",
    link: "/admin-dashboard/guests",
    icon: faUser,
    badge: useAuth.totalPending,
  },
  {
    id: 2,
    title: "Employees",
    link: "/admin-dashboard/employees",
    icon: faUser,
    badge: useAuth.totalPending,
  },
  {
    id: 3,
    title: "Reservations",
    link: "/admin-dashboard/reservations",
    icon: faCalendarCheck,
    badge: useAuth.totalPending,
  },
  {
    id: 4,
    title: "Rooms",
    link: "/admin-dashboard/rooms",
    icon: faBuilding,
    badge: useAuth.totalPending,
  },

  {
    id: 5,
    title: "Prices",
    link: "/admin-dashboard/prices",
    icon: faPesoSign,
    badge: useAuth.totalPending,
  },
  {
    id: 6,
    title: "Reports",
    link: "/admin-dashboard/reports",
    icon: faClipboardList,
    badge: useAuth.totalPending,
  },
  {
    id: 7,
    title: "Activity Logs",
    link: "/admin-dashboard/logs",
    icon: faClockRotateLeft,
    badge: useAuth.totalPending,
  },
];

export const managerSidebar = [
  { id: 1, title: "Guests", link: "/manager-dashboard/guests", icon: faUser },
  {
    id: 2,
    title: "Employees",
    link: "/manager-dashboard/employees",
    icon: faUser,
  },
  {
    id: 3,
    title: "Reservations",
    link: "/manager-dashboard/reservations",
    icon: faCalendarCheck,
    badge: useAuth.totalPending,
  },
  { id: 4, title: "Rooms", link: "/manager-dashboard/rooms", icon: faBuilding },
  {
    id: 5,
    title: "Prices",
    link: "/manager-dashboard/prices",
    icon: faPesoSign,
  },

  {
    id: 6,
    title: "Reports",
    link: "/manager-dashboard/reports",
    icon: faClipboardList,
  },
  {
    id: 7,
    title: "Activity Logs",
    link: "/manager-dashboard/logs",
    icon: faClockRotateLeft,
  },
];

export const receptionistSidebar = [
  {
    id: 1,
    title: "Guests",
    link: "/receptionist-dashboard/guests",
    icon: faUser,
  },
  {
    id: 2,
    title: "Receptionists",
    link: "/receptionist-dashboard/receptionists",
    icon: faUser,
  },
  {
    id: 3,
    title: "Reservations",
    link: "/receptionist-dashboard/reservations",
    icon: faCalendarCheck,
    badge: useAuth.totalPending,
  },
  {
    id: 4,
    title: "Rooms",
    link: "/receptionist-dashboard/rooms",
    icon: faBuilding,
  },

  {
    id: 5,
    title: "Reports",
    link: "/receptionist-dashboard/reports",
    icon: faClipboardList,
  },
];
