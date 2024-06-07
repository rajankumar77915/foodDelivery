"use client";
import { IoCloseSharp } from "react-icons/io5";
import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { sendOtp } from "../../services/functions/sendOtp"
import {SetsignupData} from "../../lib/authSlice"
import { useRouter } from "next/navigation";
export default function Signup() {
  const [AllStatisfy, setAllStatisfy] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobileNo: ""
  });

  const dispatch = useDispatch();
  const router = useRouter();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = () => {
    if (formData.firstName === "" || formData.lastName === "" || formData.password === "" || formData.mobileNo === "") {
      setAllStatisfy(false);
    } else {
      setAllStatisfy(true);
      //store auth slice  data
      dispatch(SetsignupData(formData))
      // Go to the OTP page
      dispatch(sendOtp(formData.mobileNo,router.push))
    }
  };

  return (
    <div className="flex flex-col">
      <Image src={"https://www.adameshandbook.com/wp-content/uploads/2022/05/pexels-ovidiu-creanga-1495534-1536x1021.jpg"} alt="q" fill={true} className="blur-sm"></Image>
      <div className="flex justify-center items-center h-screen relative ">
        <div className="w-1/3 h-auto p-4 rounded-lg flex-col items-center">
          <div className="flex justify-between items-center">
            <h1 className="font-serif text-lg">Signup</h1>
            <div className="w-7 hover:bg-slate-200" onClick={()=>{router.push("/")}}><IoCloseSharp className="w-full h-full" /></div>
          </div>

          <div className="p-5">
            <div className="flex gap-3">
              <input name="firstName" className="w-1/2 p-2 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-sky-500 block focus:ring-1" value={formData.firstName} type="text" placeholder="First Name" required={true} onChange={handleInputChange} />
              <input name="lastName" className="w-1/2 p-2 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-sky-500 block focus:ring-1" value={formData.lastName} type="text" placeholder="Last Name" required={true} onChange={handleInputChange} />
            </div>
            <input name="email" className="w-full p-2 rounded-lg mt-5 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block focus:ring-1" value={formData.email} type="email" placeholder="Email" onChange={handleInputChange} />
            <input name="password" className="w-full p-2 rounded-lg mt-5 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block focus:ring-1" value={formData.password} type="password" placeholder="Password" required={true} onChange={handleInputChange} />
            <input name="mobileNo" className="w-full p-2 rounded-lg mt-5 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block focus:ring-1" value={formData.mobileNo} type="number" placeholder="Mobile Number" required={true} onChange={handleInputChange} />
            <button className="w-full text-center bg-gradient-to-r from-red-400 to-red-500 rounded-lg mt-5 p-3 text-white hover:to-red-400 focus:outline-none" onClick={onSubmit}>Send OTP</button>
          </div>
          <p className={`${AllStatisfy ? "hidden" : "text-blue-900"}`}>All fields are required</p>
        </div>
      </div>
    </div>
  );
}
