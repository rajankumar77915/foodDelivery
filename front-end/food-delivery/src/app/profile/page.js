"use client";
// import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import UserTabs from "../componant/layout/UserTabs";
import { useSelector } from "react-redux";
import Header from "../componant/layout/Header";
import Footer from "../componant/layout/Footer";

const profilePage = () => {
  const { user } = useSelector((state) => state.profile);
  
//   const session = useSession();
  const [userName, setuserName] = useState(user?.firstName+" "+user?.lastName);
  const [image, setImage] = useState(user?.image);
  const [saved, setSaved] = useState(false);
  const [IsSaving, setIsSaving] = useState(false);
  const [phone, setPhone] = useState(user?.mobileNo);
  const [email, setemail] = useState(user?.email);
  const [streetAddress, setstreetAddress] = useState("");
  const [postalcode, setpostalcode] = useState("");
  const [city, setcity] = useState("");
  const [country, setcountry] = useState("");


  useEffect(()=>{
    setImage(user?.image)
  },[])
//   const { status } = session;

//   useEffect(() => {
//     if (status === "authenticated") {
//       setuserName(session.data.user.name);
//       setImage(session.data.user.image);
//       fetch("/api/profile").then((data) => {
//         setPhone(data.phone);
//         setstreetAddress(data.streetAddress);
//         setpostalcode(data.postalcode);
//         setcity(data.city);
//         setcountry(data.country);
//         setIsAdmin(data.isAdmin);
//       });

//       console.log(session.data.user.name);
//     }
//   }, [session, status]);

  async function handleProfileInfoUpdate(ev) {
    ev.preventDefault();
    setSaved(false);
    setIsSaving(true);
    const response = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: userName,
        userImage,
        phone,
        streetAddress,
        postalcode,
        cxity,
        country,
      }),
    });
    setIsSaving(false);
    if (response.ok) {
      setSaved(true);
    }
  }

  // if (status === "loading") {
  //   return "loading...";
  // }












  

  // if (status === "unauthenticated") {
  //   redirect("/login");
  // }
  return (
    <>
    <Header />
      <section className="mt-8">
        {user?.accountType==="admin"&&<UserTabs />}
        <div className="max-w-md mx-auto mb-6 mt-4">
          {saved && (
            <h2 className="text-center bg-green-100 p-4 rounded-lg border border-green-300">
              Profile saved!
            </h2>
          )}
          {IsSaving && (
            <h2 className="text-center bg-blue-100 p-4 rounded-lg border border-blue-300">
              saving...
            </h2>
          )}

          <div className="flex gap-4">
            <div>
              <div className="p-2 rounded-lg relative">
                <img
                  className="rounded-lg w-full h-full mb-1"
                  src={image}
                  width={250}
                  height={250}
                  alt={"avatar"}
                />
                <button type="button">Edit</button>
              </div>
            </div>
            <form className="grow" onSubmit={handleProfileInfoUpdate}>
              <input
                type="text"
                placeholder="First and last name"
                value={userName}
                onChange={(ev) => setuserName(ev.target.value)}
              />
              <input
                type="email"
                
                value={email}
              />
              <input
                type="tel"
                placeholder="phone number"
                value={phone}
                onChange={(ev) => setPhone(ev.target.value)}
              />
              <input
                type="text"
                placeholder="street address"
                value={streetAddress}
                onChange={(ev) => setstreetAddress(ev.target.value)}
              />
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="postal code"
                  value={postalcode}
                  onChange={(ev) => setpostalcode(ev.target.value)}
                />
                <input
                  type="text"
                  placeholder="city"
                  value={city}
                  onChange={(ev) => setcity(ev.target.value)}
                />
              </div>
              <input
                type="text"
                placeholder="country"
                value={country}
                onChange={(ev) => setcountry(ev.target.value)}
              />
              <button type="submit">Save</button>
            </form>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
};

export default profilePage;
