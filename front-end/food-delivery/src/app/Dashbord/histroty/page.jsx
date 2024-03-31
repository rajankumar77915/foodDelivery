'use client'
import { useSelector } from "react-redux"
import { FaHistory, FaShoppingCart } from "react-icons/fa";
import { useState } from "react"
import History from "./componant/History";

export default function Cart() {
  const totalItems = useSelector((state) => state?.cart?.totalItems)
  const total = useSelector((state) => state?.cart?.total)


  // console.log("cart is caleed",totalItems1)
  return (
    <div className="p-10  mt-20">
      <h1 className="mb-14 text-3xl font-medium text-richblack-800 flex gap-3 items-center font-poppins"><FaHistory />My History</h1>
      <p className="border-b border-b-richblack-400 pb-2 font-semibold text-richblack-400 font-poppins">
        {totalItems} foods in History
      </p>
      {total > 0 ? (
        <div className="mt-8 flex flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row ">
          <History />
        </div>
      ) : (
        <p className="mt-14 text-center text-3xl text-richblack-100">
          Your cart is empty
        </p>
      )}
    </div>
  )
}