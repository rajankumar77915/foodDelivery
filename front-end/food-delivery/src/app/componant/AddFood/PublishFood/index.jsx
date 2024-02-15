import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/navigation" 

import { editFoodDetails } from "../../../../services/functions/foodDetailsAPI"
import { resetFoodState, setStep } from "../../../../lib/foodSlice"
import { FOOD_STATUS } from  "../../../../util/constants"
import IconBtn from "../../IconBtn"

export default function PublishFood() {
  const { register, handleSubmit, setValue, getValues } = useForm()

  const dispatch = useDispatch()
  const navigate = useRouter()
  const { token } = useSelector((state) => state.auth)
  const { food } = useSelector((state) => state.food)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (food?.status === FOOD_STATUS.PUBLISHED) {
      setValue("public", true)
    }
  }, [])

  const goBack = () => {
    dispatch(setStep(2))
  }

  const goToFoods = () => {
    dispatch(resetFoodState())
    navigate.push("/dashboard/my-foods")
  }

  const handleFoodPublish = async () => {
    // check if form has been updated or not
    if (
      (food?.status === FOOD_STATUS.PUBLISHED &&
        getValues("public") === true) ||
      (food?.status === FOOD_STATUS.DRAFT && getValues("public") === false)
    ) {
      // form has not been updated
      // no need to make api call
      goToFoods()
      return
    }
    const formData = new FormData()
    formData.append("foodId", food._id)
    const foodStatus = getValues("public")
      ? FOOD_STATUS.PUBLISHED
      : FOOD_STATUS.DRAFT
    formData.append("status", foodStatus)
    setLoading(true)
    const result = await editFoodDetails(formData, token)
    if (result) {
      goToFoods()
    }
    setLoading(false)
  }

  const onSubmit = (data) => {
    // console.log(data)
    handleFoodPublish()
  }

  return (
    <div className="rounded-md border-[1px] border-richblack-700 bg-richblack-700 p-6">
      <p className="text-2xl font-semibold text-richblack-5">
        Publish Settings
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Checkbox */}
        <div className="my-6 mb-8">
          <label htmlFor="public" className="inline-flex items-center text-lg">
            <input
              type="checkbox"
              id="public"
              {...register("public")}
              className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
            />
            <span className="ml-2 text-richblack-400">
              Make this food as public
            </span>
          </label>
        </div>

        {/* Next Prev Button */}
        <div className="ml-auto flex max-w-max items-center gap-x-4">
          <button
            disabled={loading}
            type="button"
            onClick={goBack}
            className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
          >
            Back
          </button>
          <IconBtn disabled={loading} text="Save Changes" />
        </div>
      </form>
    </div>
  )
}