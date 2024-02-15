"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const UserTabs = () => {
  const path = usePathname();

  return (
    <>
      <div className="flex mx-auto gap-2 tabs justify-center">
        <Link className={path === "/profile" ? "active" : ""} href={"/profile"}>
          Profile
        </Link>
        {/* {isAdmin && ( */}
        <>
          <Link
            className={path === "/categories" ? "active" : ""}
            href={"/categories"}
          >
            Categories
          </Link>
          <Link
            className={path === "/menu-items" ? "active" : ""}
            href={"/addFood"}
          >
            Menu
          </Link>
          <Link className={path === "/users" ? "active" : ""} href={"/users"}>
            Users
          </Link>
        </>
        {/* )} */}
      </div>
    </>
  );
};

export default UserTabs;
