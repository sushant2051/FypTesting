import type { NavigationProps } from "./types";

export const MenuList: NavigationProps[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "dashboard",
    routekey: "",
  },
  {
    id: "contacts",
    label: "Contacts",
    icon: "contact",
    routekey: "/contacts",
  },
  {
    id: "reminders",
    label: "Reminders",
    icon: "reminder",
    routekey: "/reminder",
  },
  {
    id: "notes",
    label: "Notes",
    icon: "note",
    routekey: "/notes",
  },
  {
    id: "emergency",
    label: "Emergency",
    icon: "emergency",
    routekey: "/emergency",
  },
  {
    id: "setting",
    label: "Settings",
    icon: "setting",
    routekey: "/settings",
  },
];
