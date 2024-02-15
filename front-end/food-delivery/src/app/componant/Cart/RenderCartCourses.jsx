import { FaStar } from "react-icons/fa"
import { RiDeleteBin6Line } from "react-icons/ri"
import ReactStars from "react-rating-stars-component"
import { useDispatch, useSelector } from "react-redux"
import { removeFromCart, updateCartItemQuantity } from "../../../lib/cartSlice"
import { useState } from "react"

export default function RenderCartfoods() {
  const [inputValues, setInputValues] = useState({}); // Object to store input values for each food item
  const [activeInput, setActiveInput] = useState(""); // ID of the currently active input field
  const cart = useSelector((state) => state?.cart?.cart);
  const dispatch = useDispatch();

  const handleIncrement = (foodId, quantity) => {
    dispatch(updateCartItemQuantity({ foodId, quantity: Number(quantity) + 1 }));
  }

  const handleDecrement = (foodId, quantity) => {
    dispatch(updateCartItemQuantity({ foodId, quantity: quantity - 1 }));
  }

  const handleQuantityChange = (foodId) => {
    dispatch(updateCartItemQuantity({ foodId, quantity: inputValues[foodId] }));
    setActiveInput(""); // Reset active input field
  }

  const handleInputChange = (foodId, value) => {
    setInputValues({ ...inputValues, [foodId]: value });
  }

  return (
    <div className="flex flex-1 flex-col">
      {cart?.map((food, indx) => (
        <div
          key={food._id}
          className={`flex w-full flex-wrap items-start justify-between gap-6 ${indx !== cart.length - 1 && "border-b border-b-richblack-400 pb-6"
            } ${indx !== 0 && "mt-6"} `}
        >
          <div className="flex flex-1 flex-col gap-4 xl:flex-row">
            <img
              src={food?.image}
              alt={food?.itemName}
              className="h-[148px] w-[220px] rounded-lg object-cover"
            />
            <div className="flex flex-col space-y-1">
              <p className="text-lg font-medium text-richblack-900">
                {food?.itemName}
              </p>
              <p className="text-sm text-richblack-900">
                {food?.category?.name}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-yellow-100">4.5</span>
                <ReactStars
                  count={5}
                  value={food?.ratingAndReview?.length}
                  size={20}
                  edit={false}
                  // activeColor="#FF646A"
                  emptyIcon={<FaStar />}
                  fullIcon={<FaStar />}
                />
                <span className="text-richblack-400">
                  {food?.ratingAndReview?.length} Ratings
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            {activeInput === food._id ? (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={inputValues[food._id] || ""}
                  onChange={(e) => handleInputChange(food._id, e.target.value)}
                  className="border-b border-pink-500 focus:outline-none"
                />
                <button
                  onClick={() => handleQuantityChange(food._id)}
                  className="px-2 py-1 bg-pink-500 text-white rounded-md"
                >
                  Enter
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDecrement(food._id, food.quantity)}
                  className="text-lg font-semibold text-pink-200 focus:outline-none border border-richblack-100 py-1 px-3 rounded-md"
                >
                  -
                </button>
                <span
                  className="text-lg font-semibold text-pink-200  cursor-pointer"
                  onClick={() => {
                    setActiveInput(food._id);
                    setInputValues({ ...inputValues, [food._id]: food.quantity });
                  }}
                >
                  {food.quantity}
                </span>
                <button
                  onClick={() => handleIncrement(food._id, food.quantity)}
                  className="text-lg font-semibold text-pink-200 focus:outline-none border border-richblack-100 px-3 py-1 rounded-md"
                >
                  +
                </button>
              </div>
            )}
            <button
              onClick={() => dispatch(removeFromCart(food._id))}
              className="flex items-center gap-x-1 rounded-md border border-richblack-100  py-3 px-[12px] text-pink-200 font-bold"
            >
              <RiDeleteBin6Line />
              <span>Remove</span>
            </button>
            <p className="mb-6 text-3xl font-medium text-yellow-100">
              ₹ {food?.price}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}