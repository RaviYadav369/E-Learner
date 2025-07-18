'use client'
import { LucideIcon } from "lucide-react";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface props {
  icon: LucideIcon;
  label: string;
  href: string;
}

const Sidebaritem = ({ icon: Icon, label, href }: props) => {
  
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/}`);
  const onClick = () => {
    router.push(href);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-slate-500 text-md font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
        isActive &&
          "text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-900"
      )}
    >
      <Icon
        size={26}
        className={cn("text-slate-500", isActive && "text-sky-700")}
      />
      {label}
      <div className={cn('ml-auto opacity-0 border-2 border-sky-700 h-full transition-all', isActive && 'opacity-100')} />
    </button>
  );
};

export default Sidebaritem;
