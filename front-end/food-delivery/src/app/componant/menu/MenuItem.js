import Image from "next/image";
import React, { useEffect } from "react";
import RatingStarts from '../RatingStars'
import { addToCart } from '../../../lib/cartSlice'
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { fetchFoodSameCategory} from '../../../services/functions/foodDetailsAPI'
import { setFood } from "@/lib/foodSlice"
const MenuItem = ({item}) => {
  const dispatch = useDispatch();
  const navigate = useRouter()
  const handleAddToCart = () => {
    dispatch(addToCart( item));

    
  };
  
  return (

    <div
      className="w-96  bg-gradient-to-r from-richblack-25 from-10% via-richblack-25 via-30% to-richblack-100 to-90%  p-4 rounded-lg text-black text-center group shadow-md
       shadow-black-50 hover:shadow-richblack-700 transition-all relative"
    >

      <div className="text-center relative" onClick={async() => {
        const myResult=await fetchFoodSameCategory(item?._id)
        dispatch(setFood({myResult}))
       
        
        navigate.push("/particularFood")}}>
        <Image

          src={item.image}
          alt="bugger"
          className="mx-h-auto max-h-48 block mx-auto rounded-lg"
          height={100}
          width={350}
        // layout="fill" 
        />
        <div className="flex  right-0 absolute w-36 bottom-0  text-white p-0.5 bg-richblack-700 ">
          <RatingStarts Review_Count={4.2} Star_Size={19} />
          4.2
        </div>
      </div>
      <h4 className="font-semibold text-xl my-3">{item?.itemName}</h4>

      <div>

        <p className="text-gray-500 text-sm">
          {item?.description}
        </p>
      </div>
      <button className="mt-4  text-white bg-red-400 rounded-full px-8 py-2 w-full" onClick={handleAddToCart}>
        add to cart ₹{item?.price}.
      </button>
    </div>


  );
};

export default MenuItem;
