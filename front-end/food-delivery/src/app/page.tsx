'use client'
import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from 'react';
import dynamic from "next/dynamic";
import Hero from "./componant/layout/Hero"
import Homemenu from "./componant/layout/Homemenu"
import Header from "./componant/layout/Header";
import Footer from "./componant/layout/Footer";
import { Toaster } from "react-hot-toast";

function Home() {



  //useSelector gets the state from store
  const count = useSelector((state: any) => state?.auth?.token); // Access the counter state

  //useDispatch updates the store with the state from a component, as defined by your logic inside the counterslice.js
  const dispatch = useDispatch();
  return (
    <>
      <Header />
      <Hero />
      <Homemenu />
      <Footer/>
      
    </>
  )
};
export default dynamic(() => Promise.resolve(Home), { ssr: false })
