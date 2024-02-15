"use client";
import Image from "next/image";
// import { useProfile } from "../componant/layout/UseProfile";
import UserTabs from "../componant/layout/UserTabs";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { IoCloseSharp } from "react-icons/io5";

const categories = () => {

  const [categories, setCategories] = useState([]);
  const { loading: profileLoading, data: profileData } ={loading:true,profileData:{}};
  const [editedCategory, setEditedCCategory] = useState(null);
  const [categoryName, setCategoryName] = useState('');

  // useEffect(() => {
  //   fetchCategories();
  // }, []);

  function fetchCategories() {
    // fetch("api/categories").then((res) => {
    //   res.json().then((categories) => {
    //     setCategories(categories);
    //   });
    // });
  }

  async function handleCategory(ev) {
    ev.preventDefault();
    const creatingPromise = new Promise(async (resolve, reject) => {
      // const data = { name: CategoryName };
      // if (editedCategory) {
      //   data._id = editedCategory._id;
      // }
      // const response = await fetch("/api/categories", {
      //   method: editedCategory ? "PUT" : "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(data),
      // });
      // setCategoryName("");
      // fetchCategories();
      // setEditedCCategory(null);
      // if (response.ok) {
      //   resolve();
      // } else {
      //   reject();
      // }
    });

    // await toast.promise(creatingPromise, {
    //   loading: editedCategory
    //     ? "updating your category"
    //     : "creating your new category",
    //   success: editedCategory ? "Category updated" : "Category created",
    //   error: "Error, sorry...",
    // });
  }

  // if (profileLoading) {
  //   return "loading user info...";
  // }
  //   if (!profileData.isAdmin) {
  //     return "not an admin";
  //   }
  function handleInputChange(){

  }
  return (
    <div className="flex flex-col">
      <Image src={"https://www.adameshandbook.com/wp-content/uploads/2022/05/pexels-ovidiu-creanga-1495534-1536x1021.jpg"} alt="q" fill={true} className="blur-sm"></Image>
      <div className="flex justify-center items-center h-screen relative ">
        <div className="w-1/3 h-auto p-4 rounded-lg flex-col items-center">
          <div className="flex justify-between items-center">
            <h1 className="font-serif text-lg">Signup</h1>
            <div className="w-7 hover:bg-slate-200" onClick={()=>{router.push('/')}}><IoCloseSharp className="w-full h-full" /></div>
          </div>

          <div className="p-5">
            <div className="flex gap-3">
              <input name="firstName" className="w-1/2 p-2 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-sky-500 block focus:ring-1" type="text" placeholder="First Name" required={true} onChange={handleInputChange} />
              <input name="lastName" className="w-1/2 p-2 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-sky-500 block focus:ring-1"  type="text" placeholder="Last Name" required={true} onChange={handleInputChange} />
            </div>
            <input name="email" className="w-full p-2 rounded-lg mt-5 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block focus:ring-1"  type="email" placeholder="Email" onChange={handleInputChange} />
            <input name="password" className="w-full p-2 rounded-lg mt-5 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block focus:ring-1"  type="password" placeholder="Password" required={true} onChange={handleInputChange} />
            <input name="mobileNo" className="w-full p-2 rounded-lg mt-5 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block focus:ring-1" type="number" placeholder="Mobile Number" required={true} onChange={handleInputChange} />
            <button className="w-full text-center bg-gradient-to-r from-red-400 to-red-500 rounded-lg mt-5 p-3 text-white hover:to-red-400 focus:outline-none" >Send OTP</button>
          </div>
          {/* <p className={`${AllStatisfy ? "hidden" : "text-blue-900"}`}>All fields are required</p> */}
        </div>
      </div>
    </div>
  );
  }
export default categories;
