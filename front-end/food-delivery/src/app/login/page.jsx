'use client'
import { IoCloseSharp } from "react-icons/io5";
import Image from "next/image";
import { useState } from "react";
import { setCookie } from "cookies-next";
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from "react-redux";
import { login } from '../../services/functions/login'
import { FaGoogle } from "react-icons/fa";
// import { RootState } from "@reduxjs/toolkit/query";
// import { Settoken } from "../../lib/authSlice"
// import { cookies } from 'next/headers'
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginInProgress, setLoginInProgress] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const token = useSelector((state) => state?.auth?.token);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      // If Enter key is pressed, focus on the next input field
      switch (e.target.name) {
        case "email":
          document?.getElementById("password")?.focus();
          break;
        case "password":
          handleLogin();// Trigger login when Enter is pressed in the password field
          document?.getElementById("password")?.blur()
          break;
        default:
          break;
      }
    }
  };

  const handleFormSubmit = async (ev) => {
    ev.preventDefault();
    setLoginInProgress(true);
    try {
      dispatch(login(email, password, router.push));
      // await login(email, password, navigate).;
    } catch (error) {
      console.error('Error during login:', error);
    }
    setLoginInProgress(false);
  };


  return (
    <>
      <section className="mt-8">
        <h1 className="text-center text-primary text-4xl mb-4">Login</h1>
        <form className="max-w-xs mx-auto" onSubmit={handleFormSubmit}>
          <input
            type="text"
            name="email"
            placeholder="email/mobile"
            value={email}
            
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            value={password}
            
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button  type="submit">
            Login
          </button>
          <div className="my-4 text-center text-gray-500">
            or login with provider
          </div>
          <button
            type="button"
            onClick={async () => {
              try {
                const result = await signIn("google", { callbackUrl: "/" });
                console.log("Google login result:", result);
              } catch (error) {
                console.error("Google login error:", error);
              }

            }}

            className="flex items-center gap-4 justify-center mb-6"
          >
            {/* <Image src={"/google.png"} alt={""} width={24} height={24} /> */}
            <FaGoogle />
            Login with google
          </button>
        </form>
      </section>
    </>
  );

}