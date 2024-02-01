import { useDispatch, useSelector } from "react-redux"
// import { useNavigate } from "react-router-dom"

import IconBtn from "../IconBtn"
// import { Buyfood } from "../../../services/functions/studentFeaturesAPI"
import { useRouter } from "next/navigation"

export default function RenderTotalAmount() {
  const cart  = useSelector((state) => state?.cart)
  const total= useSelector((state) => state?.cart?.total)
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const navigate = useRouter()
  const dispatch = useDispatch()

  const handleBuyfood = () => {
    const foods = cart?.map((food) => food._id)
    // Buyfood(token, foods, user, navigate.push, dispatch)
  }

  return (
    <div className="min-w-[280px] rounded-md border-[1px] border-rich-700 bg-richblack-800 p-6">
      <p className="mb-1 text-sm font-medium text-richblack-300">Total:</p>
      <p className="mb-6 text-3xl font-medium text-yellow-900">₹ {total}</p>
      <IconBtn
        text="Buy Now"
        onclick={handleBuyfood}
        customClasses="w-full justify-center"
      />
    </div>
  )
}