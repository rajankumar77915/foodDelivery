'use client'
import { useSelector } from "react-redux"

import RenderCartCourses from "../componant/Cart/RenderCartCourses"
import RenderTotalAmount from "../componant/Cart/RenderTotalAmount"

export default function Cart() {
  const totalItems = useSelector((state) => state?.cart?.totalItems)
  const totalItems1 = useSelector((state) => state?.cart)
  const total= useSelector((state) => state?.cart?.total)

  // console.log("cart is caleed",totalItems1)
  return (
    <div className="">
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">Cart</h1>
      <p className="border-b border-b-richblack-400 pb-2 font-semibold text-richblack-400">
        {totalItems} Courses in Cart
      </p>
      {total > 0 ? (
        <div className="mt-8 flex flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row ">
          <RenderCartCourses />
          <RenderTotalAmount />
        </div>
      ) : (
        <p className="mt-14 text-center text-3xl text-richblack-100">
          Your cart is empty
        </p>
      )}
    </div>
  )
}