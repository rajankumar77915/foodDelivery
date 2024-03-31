import { useEffect, useState } from "react";
import Link from "next/link";
import { FaCartPlus, FaBars, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../services/functions/logout";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { IoFastFood } from "react-icons/io5";

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
        <Link className="p-2 font-semibold transition duration-300 hover:text-pink-5" href={"/login"}>
          Login
        </Link>
        <Link href={"/register"} className=" rounded-full font-semibold py-1 transition duration-300 hover:text-pink-5">
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
  const [isNavOpen, setIsNavOpen] = useState(false);

  async function fetchSearched(e) {
    setSearch(e.target.value);
  }

  useEffect(() => {
    console.log("search", search);
  }, [search]);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div className="bg-richblack-800 py-2 text-white font-poppins">
      <header className={`h-full   mx-auto flex items-center  justify-between `}>
        
        

        <div className="md:hidden">
          {isNavOpen ? (
            <FaTimes className="text-3xl mr-4" onClick={toggleNav} />
          ) : (
            <FaBars className="text-3xl mr-4" onClick={toggleNav} />
          )}
        </div>
        <Link className=" font-semibold font-poppins text-2xl px-4 flex gap-3" href="">
         <span className="ml-5"><IoFastFood/></span> BiteBlitz
        </Link>

        <div className={`md:flex  items-center gap-6 text-xl font-inter ${isNavOpen ? "block" : "hidden"}`}>
        
          <nav className="flex flex-col md:flex-row items-center gap-6 text-xl font-inter">
            {/* <Link className="transition duration-300 hover:bg-white hover:text-black p-2 rounded-2xl" href={"/"}>Home</Link>
            <Link className="transition duration-300 hover:bg-white hover:text-black  p-2 rounded-2xl" href={"/about"}>About</Link>
            <Link className="transition duration-300 hover:bg-white  hover:text-black  p-2 rounded-2xl" href={"Dashbord/profile"}>Profile</Link> */}
          </nav>
        </div>
          <nav className={`flex items-center  gap-6 text-white font-normal text-2xl mr-11 mt-1  ${isNavOpen&& "hidden"}`}>
          <Link className="transition duration-300 hover:bg-white hover:text-black p-2 rounded-2xl" href={"/"}>Home</Link>
            <Link className="transition duration-300 hover:bg-white hover:text-black  p-2 rounded-2xl" href={"/about"}>About</Link>
            
            <AuthLinks status={user?.firstName ? "authenticated" : "unauthenticated"} image={image} />
            <Link href={"/cart"} className={`bg-pink-25 transition duration-300 hover:bg-pink-5 rounded-full p-2`}>
              <FaCartPlus />
            </Link>
          </nav>
      </header>
    </div>
  );
};

export default Header;
