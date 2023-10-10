'use client'
import Logo from "./Logo";
import Sidebarroutes from "./Sidebar-routes";

export const Sidebar = () => {

  return (
    <h2 className="h-full border-r flex flex-col overflow-auto bg-white shadow-sm">
      
      <Logo />
      <Sidebarroutes />
    </h2>
  );
};
