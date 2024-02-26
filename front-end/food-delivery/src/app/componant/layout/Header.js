import { useEffect, useState } from "react";
import Link from "next/link";
import { FaCartPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../services/functions/logout";
import { useRouter } from "next/navigation";
import Image from "next/image";

function AuthLinks({ status, image }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const signOut = () => {
    dispatch(logout(router.push));
  };

  if (status === "authenticated") {
    return (
      <>
        <Link href={"Dashbord/profile"} className="whitespace-nowrap">
          <img className="rounded-full" src={image} alt="" height={40} width={40} />
        </Link>
      </>
    );
  } else if (status === "unauthenticated") {
    return (
      <>
        <Link className="p-2" href={"/login"}>
          Login
        </Link>
        <Link href={"/register"} className="bg-red-400 rounded-full text-white px-7 py-1">
          Register
        </Link>
      </>
    );
  }
}

const Header = () => {
  const { user } = useSelector((state) => state.profile);
  let image = user?.profile?.image;
  if (image && image.includes(" ")) {
    image = image.split(" ")[0];
  }

  const [search, setSearch] = useState("");
  async function fetchSearched(e) {
    setSearch(e.target.value);
  }
  useEffect(() => {
    console.log("search", search);
  }, [search]);

  return (
    <div className="bg-richblack-5">
      <header className="bg-richblack-5 h-full w-3/4 mx-auto flex items-center justify-between">
        <Link className=" font-semibold text-2xl ml-11" href="">
          BiteBlitz
        </Link>

        <div className="flex justify-between">
          <nav className="flex items-center gap-6 text-xl font-inter">
            <Link className="transition duration-300 hover:bg-pink-25 p-1 rounded-3xl" href={"/"}>Home</Link>
            <Link className="transition duration-300 hover:bg-pink-25 p-1 rounded-3xl"  href={"/about"}>About</Link>
            <Link className="transition duration-300 hover:bg-pink-25 p-1 rounded-3xl"  href={"Dashbord/profile"}>Profile</Link>
          </nav>
        </div>
        <nav className="flex items-center gap-6 text-pink-700 font-normal text-2xl mr-11 mt-1">
          <AuthLinks status={user?.firstName ? "authenticated" : "unauthenticated"} image={image} />
          <Link href={"/cart"} className="transition duration-300 hover:bg-pink-25 rounded-full p-2">
            <FaCartPlus />
          </Link>
        </nav>
      </header>
    </div>
  );
};

export default Header;
