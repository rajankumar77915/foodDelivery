// import Head from "next/head";
"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaCartPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import {logout} from "../../../services/functions/logout"
// import { signOut, useSession } from "next-auth/react";

import { useRouter } from "next/navigation";

function AuthLinks({ status, userName }) {
  const dispatch = useDispatch();
  const router = useRouter();


  const signOut=()=>{
    dispatch(logout(router.push))
  }
  if (status === "authenticated") {
    return (
      <>
        <Link href={"/profile"} className="whitespace-nowrap">
          Hello, {userName}
        </Link>
        <button
          onClick={() => signOut()}
          className="bg-red-400 rounded-full text-white px-8 py-2"
        >
          Logout
        </button>
      </>
    );
  }
  else if (status === "unauthenticated") {
    return (
      <>
        <Link className="p-2" href={"/login"}>Login</Link>
        <Link
          href={"/register"}
          className="bg-red-400 rounded-full text-white px-7 py-1"
        >
          Register
        </Link>
      </>
    );
  }
}

const Header = () => {
  // const { isLogin, setisLogin } = useState(false);
  // const session = useSession();
  // console.log(session);

  // const status = session?.status;
  // console.log(status);
  const {user} = useSelector((state) => state.profile);
  let userName = user?.firstName || user?.email;
  console.log("user name:",userName)
  if (userName && userName.includes(" ")) {
    userName = userName.split(" ")[0];
  }

  return (
    <>
      <header className="bg-richblack-5 flex items-center justify-between">
        <Link className=" font-semibold text-2xl ml-11" href="">
          BiteBlitz
        </Link>
        <div className="flex justify-between">
          <nav className="flex items-center gap-6  font-medium text-2xl">
            <Link href={"/"}>Home</Link>
            {/* <Link href={"/menu"}>Menu</Link> */}
            <Link href={"/about"}>About</Link>
            
            <Link href={"/profile"}>profile</Link>
          </nav>
        </div>
        <nav className="flex items-center gap-6 text-pink-700 font-normal text-2xl mr-11 mt-1">
        <AuthLinks status={user?.firstName ? "authenticated" : "unauthenticated"} userName={userName} />

          {/* <AuthLinks status={status} userName={userName} /> */}
          
          <Link href={"/cart"}>
            <FaCartPlus />
          </Link>
        </nav>
      </header>
    </>
  );
};

export default Header;
