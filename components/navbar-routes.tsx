"use client";
import { UserButton } from "@clerk/nextjs";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "../node_modules/lucide-react"
import Link from "next/link";
import { SearchInput } from "@/app/(dashboard)/(routes)/search/_components/search-input";

const NavbarRoutes = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isTeacherPage = pathname?.startsWith("/teacher");
  const isPlayerPage = pathname?.startsWith("/chapter");
  const isSearchPage = pathname === '/search'

  return (
    <>
    {isSearchPage  && (
      <div className="hidden md:block">
      <SearchInput />
      </div>
    )}
    <div className="flex gap-x-2 ml-auto">
      {isTeacherPage || isPlayerPage ? (
        <Link href='/'>
        <Button size="sm" variant="ghost">
          <LogOut className="h-4 w-4 mr-2" />
        </Button>
        </Link>
      ) : (
        <Link href="/teacher/courses">
          <Button size="sm" variant="ghost">
            Teacher Mode
          </Button>
        </Link>
      )}
      <UserButton afterSignOutUrl="/" />
    </div>
    </>

  );
};

export default NavbarRoutes;
