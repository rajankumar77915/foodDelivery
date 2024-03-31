import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import { MdNavigateNext } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"

import {
  addFoodDetails,
  editFoodDetails,
  fetchFoodCategories,
} from "../../../../services/functions/foodDetailsAPI"
import { setFood, setStep } from "../../../../lib/foodSlice"
import { FOOD_STATUS } from "../../../../util/constants"
import IconBtn from "../../IconBtn"
import Upload from "../Upload"
import ChipInput from "./ChipInput"
import RequirementsField from "./RequirementField"

export default function FoodInformationForm() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm()

  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { food, editFood } = useSelector((state) => state.food)
  const [loading, setLoading] = useState(false)
  const [foodCategories, setFoodCategories] = useState([])

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true)
      const categories = await fetchFoodCategories()
      if (categories.length > 0) {
        // console.log("categories", categories)
        setFoodCategories(categories)
      }
      setLoading(false)
    }
    // if form is in edit mode
    if (editFood) {
      // console.log("data populated", editFood)
      setValue("foodTitle", food.foodName)
      setValue("foodShortDesc", food.foodDescription)
      setValue("foodisVeg", food.foodisVeg)
      setValue("foodPrice", food.price)
      setValue("foodTags", food.tag)
      setValue("foodCategory", food.category)
      setValue("foodVarity", food.FoodType)
      setValue("foodImage", food.thumbnail)
    }
    getCategories()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isFormUpdated = () => {
    const currentValues = getValues()
    // console.log("changes after editing form values:", currentValues)
    if (
      currentValues.foodTitle !== food.foodName ||
      currentValues.foodShortDesc !== food.foodDescription ||
      currentValues.isVeg !== food.foodisVeg ||
      currentValues.foodPrice !== food.price ||
      currentValues.foodTags.toString() !== food.tag.toString() ||
      currentValues.foodCategory._id !== food.category._id ||
      currentValues.foodVarity.toString() !==
        food.FoodType.toString() ||
      currentValues.foodImage !== food.thumbnail
    ) {
      return true
    }
    return false
  }

  //   handle next button click
  const onSubmit = async (data) => {
    // console.log(data)

    if (editFood) {
      // const currentValues = getValues()
      // console.log("changes after editing form values:", currentValues)
      // console.log("now food:", food)
      // console.log("Has Form Changed:", isFormUpdated())
      if (isFormUpdated()) {
        const currentValues = getValues()
        const formData = new FormData()
        // console.log(data)
        formData.append("restaurant_id", "659f7465da09eb38b30d651e")
        formData.append("foodId", food._id)
        if (currentValues.foodTitle !== food.foodName) {
          formData.append("foodName", data.foodTitle)
        }
        if (currentValues.foodShortDesc !== food.foodDescription) {
          formData.append("foodDescription", data.foodShortDesc)
        }
        if (currentValues.foodisVeg !== food.isVeg) {
          formData.append("isVeg", data.isVeg)
        }
        if (currentValues.foodPrice !== food.price) {
          formData.append("price", data.foodPrice)
        }
        if (currentValues.foodTags.toString() !== food.tag.toString()) {
          formData.append("tag", JSON.stringify(data.foodTags))
        }
 
        if (currentValues.foodCategory._id !== food.category._id) {
          formData.append("category", data.foodCategory)
        }
        if (
          currentValues.foodVarity.toString() !==
          food.FoodType.toString()
        ) {
          formData.append(
            "FoodType",
            JSON.stringify(data.foodVarity)
          )
        }
        if (currentValues.foodImage !== food.thumbnail) {
          formData.append("thumbnailImage", data.foodImage)
        }
        // console.log("Edit Form data: ", formData)
        setLoading(true)
        const result = await editFoodDetails(formData, token)
        setLoading(false)
        if (result) {
          dispatch(setStep(2))
          dispatch(setFood(result))
        }
      } else {
        toast.error("No changes made to the form")
      }
      return
    }

    const formData = new FormData()
    formData.append("restaurant_id", "659f7465da09eb38b30d651e")

    formData.append("foodName", data.foodTitle)
    formData.append("foodDescription", data.foodShortDesc)
    formData.append("isVeg", data.isVeg)
    formData.append("price", data.foodPrice)
    formData.append("tag", JSON.stringify(data.foodTags))
    formData.append("category", data.foodCategory)
    formData.append("status", FOOD_STATUS.DRAFT)
    formData.append("FoodType", JSON.stringify(data.foodVarity))
    formData.append("thumbnailImage", data.foodImage)
    
    setLoading(true)
  
    const result = await addFoodDetails(formData, token)
    if (result) {
      dispatch(setStep(2))
      dispatch(setFood(result))
    }
    setLoading(false)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 rounded-md   shadow-xl p-6"
    >
      {/* Food Title */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-800" htmlFor="foodTitle">
          Food Title <sup className="text-pink-200">*</sup>
        </label>
        <input
          id="foodTitle"
          placeholder="Enter Food Title"
          {...register("foodTitle", { required: true })}
          className="form-style w-full py-2 border-solid border-2 border-richblack-300 rounded px-4   "
        />
        {errors.foodTitle && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
           food title is required
          </span>
        )}
      </div>
      {/* Food Short Description */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-800" htmlFor="foodShortDesc">
          Food iteam Short Description <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="foodShortDesc"
          placeholder="Enter Description"
          {...register("foodShortDesc", { required: true })}
          className="form-style w-full py-2 border-solid border-2 border-richblack-300 rounded px-4 "
        />
        {errors.foodShortDesc && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Food Description is required
          </span>
        )}
      </div>
      {/* Food Price */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-800" htmlFor="foodPrice">
          Food Price <sup className="text-pink-200">*</sup>
        </label>
        <div className="relative">
          <input
            id="foodPrice"
            type="number"
            min={0}
            placeholder="Enter Food Price"
            {...register("foodPrice", {
              required: true,
              valueAsNumber: true,
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
              },
            })}
            className="form-style w-full py-2 border-solid border-2 border-richblack-300 rounded px-4 !pl-12"
          />
          <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
        </div>
        {errors.foodPrice && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Food Price is required
          </span>
        )}
      </div>
      {/* Food Category */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-800" htmlFor="foodCategory">
          Food Category <sup className="text-pink-200">*</sup>
        </label>
        <select
          {...register("foodCategory", { required: true })}
          defaultValue=""
          id="foodCategory"
          className="form-style w-full"
        >
          <option value="" disabled>
            Choose a Category
          </option>
          {!loading &&
            foodCategories?.map((category, indx) => (
              <option key={indx} value={category?._id}>
                {category?.name}
              </option>
            ))}
        </select>
        {errors.foodCategory && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Food Category is required
          </span>
        )}
      </div>
      {/* Food Tags */}
      <ChipInput
        label="Tags"
        name="foodTags"
        placeholder="Enter Tags and press Enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />
      {/* Food Thumbnail Image */}
      <Upload
        name="foodImage"
        label="Food Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editFood ? food?.thumbnail : null}
      />
      {/* isveg */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-800" htmlFor="isVeg">
          Food isVeg <sup className="text-pink-200">*</sup>
        </label>
        <select
          {...register("isVeg", { required: true })}
          defaultValue=""
          id="isVeg"
          className="form-style w-full"
        >
          <option value="" disabled>
            Choose a vegitarion or non-vegitarian
          </option>
          {!loading &&
            <>
            <option>veg</option>
            <option>non-veg</option>
            </>
            }
        </select>
        {errors.foodCategory && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Food Category is required
          </span>
        )}
      </div>
      
      {/* Requirements/FoodType */}
      <RequirementsField
        name="foodVarity"
        label="foodVarity / FoodType"
        register={register}
        setValue={setValue}
        errors={errors}
        getValues={getValues}
      />
      {/* Next Button */}
      <div className="flex justify-end gap-x-2">
        {editFood && (
          <button
            onClick={() => dispatch(setStep(2))}
            disabled={loading}
            className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
          >
            Continue Wihout Saving
          </button>
        )}
        <IconBtn
          disabled={loading}
          text={!editFood ? "Next" : "Save Changes"}
        >
          <MdNavigateNext />
        </IconBtn>
      </div>
    </form>
  )
}