import { useState } from "react";
import { VscSignOut, VscSettingsGear } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { CgProfile } from "react-icons/cg";
import SidebarLink from "./SidebarLink";
import { logout } from "../../../services/functions/logout";
// import Header from "./layout/Header";
// import ConfirmationModal from "../ConfirmationModal";


const MangerLinks = [
   { id: 1, name: "DashBord", path: "analysis", icon: "VscGraphLine" },
   { id: 2, name: "Add Menu", path: "/addFood", icon: "VscAdd" },
   { id: 3, name: "current Orders", path: "order", icon: "VscLibrary" },
   // { id: 3, name: "Add Menu", path: "/addRestrunt", icon: "VscAdd" },
];

export default function Sidebar() {
   const { user, loading: profileLoading } = useSelector(
      (state) => state.profile
   );
   const { loading: authLoading } = useSelector((state) => state.auth);
   const dispatch = useDispatch();
   const navigate = useRouter();
   // to keep track of confirmation modal
   const [confirmationModal, setConfirmationModal] = useState(null);

   if (profileLoading || authLoading) {
      return (
         <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-white bg-white">
            <div className="spinner"></div>
         </div>
      );
   }

   // Logout function
   const handleLogout = () => {
      dispatch(logout(navigate.push));
      setConfirmationModal(null);
   };

   return (
      <div className="">

         <div className="w-full absolute ">

         </div>
         <div className="flex h-screen min-w-[220px] flex-col border-r-[1px] rounded-xl border-r-pink-25 bg-richblack-800 text-white py-10">
            <div className="flex flex-col  mt-9">
               <div className="flex flex-col justify-center">

                  <SidebarLink
                     link={{ name: "profile", path: "profile" }}
                     iconName="VscAccount"
                  />
                  {
                     
                  <SidebarLink
                     link={{ name: "Track Order", path: "track" }}
                     iconName="VscCompassDot"
                  />
                  }
                  <SidebarLink
                     link={{ name: "History", path: "histroty" }}
                     iconName="VscHistory"
                  />


                 
                  {user?.restaurantId && MangerLinks.map((link) => (
                     (user?.accountType === "admin" || user?.accountType === "restruntManager") && <SidebarLink key={link.id} link={link} iconName={link.icon} />

                  ))}
                  {(user?.accountType === "admin" || user?.accountType === "restruntManager")  && !user?.restaurantId && <SidebarLink link={{ name: "Add Restrunt", path: "addRestrunt" }} iconName="VscAdd" />}
                  {user?.accountType === "admin" &&  <SidebarLink link={{ name: "Approv Restrunts", path: "newRestruntReq" }} iconName="VscAdd" />}
               </div>
            </div>
            <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700" />
            <div className="flex flex-col">
               <SidebarLink
                  link={{ name: "Settings", path: "/dashboard/settings" }}
                  iconName="VscSettingsGear"
               />
               <button
                  onClick={() =>
                     console.log("hello")
                  }
                  className="pl-16 absolute py-10 text-sm font-medium text-richblack-300"
               >
                  <div className="flex items-center gap-x-2" onClick={handleLogout}>
                     <VscSignOut className="text-lg" />
                     <span>Logout</span>
                  </div>
               </button>
            </div>
         </div>

      </div>
   );
}
