'use client'
import { IoCloseSharp } from "react-icons/io5";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { setCookie } from "cookies-next";
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from "react-redux";
import { login } from '../../services/functions/login'
import IconBtn from '../componant/IconBtn'
import { FaGoogle } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginInProgress, setLoginInProgress] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const token = useSelector((state) => state?.auth?.token);
  const videoRef = useRef(null);

  useEffect(() => {
    // Start video playback when component mounts
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      switch (e.target.name) {
        case "email":
          document?.getElementById("password")?.focus();
          break;
        case "password":
          handleLogin();
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
    } catch (error) {
      console.error('Error during login:', error);
    }
    setLoginInProgress(false);
  };


  return (
    <>
      <div className="w-full  flex justify-between border border-none bg-richblack-200">
        <div className="mt-8 w-full flex flex-col justify-center items-center">
          <div className="rounded-lg">
            <img
              className="rounded-md h-auto mb-2"
              alt="logo"
              src="./4.png"
              width={200}
              height={10}
            />
          </div>

          <h1 className="text-center text-primary text-4xl mb-4">Login</h1>
          <form className="w-10/12 mx-auto " onSubmit={handleFormSubmit}>
            <div className="ml-16">

              <label htmlFor="email">Email:</label><br></br>
              <input
                className="h-10  rounded-md border-r-2 pl-2 w-10/12 mb-3"
                type="text"
                name="email"
                id="email"
                placeholder="Email/Mobile"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
              />
              <br></br><label htmlFor="password">Password:</label><br></br>
              <input
                className="h-10 rounded-md border-r-2 pl-2 w-10/12 mb-6"
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
              />
              <IconBtn text={"Login"} customClasses={"justify-center w-10/12"}></IconBtn>
            </div>
            <div className="my-4 text-center text-gray-500 ">or login with provider</div>
            <div className="flex justify-center">
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
                className="flex items-center gap-2 justify-center mb-6 bg-blue-500  text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                <FaGoogle />
                <span>Login with Google</span>
              </button>
            </div>
          </form>
        </div>

        <div className="w-10/12 border border-none p-0">
          <video ref={videoRef} width={300} height={200} className="border border-none w-full" loop muted>
            <source className="border border-none" src="./login.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </>
  );
}
