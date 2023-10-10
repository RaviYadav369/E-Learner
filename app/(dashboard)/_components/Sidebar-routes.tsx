'use client'
import React from "react";
import {Layout, Compass, List, BarChart} from "../../../node_modules/lucide-react";

import Sidebaritem from "./Sidebar-item";

import {usePathname} from "next/navigation";


const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: Compass,
    label: "Browse",
    href: "/search",
  },
];
const teacherRoutes =[
  {
    icon: List,
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics",
  },
]

const Sidebarroutes = () => {

  const pathname = usePathname();
  const isTeacherPage = pathname?.includes('/teacher')
  const routes = isTeacherPage ? teacherRoutes : guestRoutes;

  return (
    <div className="flex flex-col w-full">
     
      {routes.map((route) => (
        <Sidebaritem 
        key={route.label}
        icon={route?.icon}
        label={route.label}
        href={route.href}
        />
      ))}
    </div>
  );
};

export default Sidebarroutes;
