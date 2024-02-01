import Image from "next/image";
import React from "react";
import RatingStarts from '../RatingStars'
import {addToCart} from '../../../lib/cartSlice'
import { useDispatch } from "react-redux";

const MenuItem = ({_id, image, itemName, description, price }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({_id, image, itemName, description, price }));
  };
  return (

    <div
      className="w-96  bg-gray-50 p-4 rounded-lg text-center group hover:bg-white hover:shadow-md
       hover:shadow-black/50 transition-all relative"
    >

      {/* <div className="h-64 object-fill relative">
        <Image

          src={image}
          alt="bugger"
          className="h-30  mx-auto rounded-xl"
          height={100}
          width={300}
          // layout="fill" 
        /> */}
        <div className="text-center relative">
        <Image

          src={image}
          alt="bugger"
          className="mx-h-auto max-h-48 block mx-auto rounded-lg"
          height={100}
          width={300}
          // layout="fill" 
        />
        <div className="flex  right-0 absolute w-36 bottom-0 mr-9 text-white p-0.5 bg-slate-900 ">
          <RatingStarts Review_Count={4.2} Star_Size={19} />
          4.2
        </div>
      </div>
      <h4 className="font-semibold text-xl my-3">{itemName}</h4>

      <div>

        <p className="text-gray-500 text-sm">
          {description}
        </p>
      </div>
      <button className="mt-4 bg-red-500 text-white rounded-full px-8 py-2" onClick={handleAddToCart}>
        add to cart ${price}.
      </button>
    </div>


  );
};

export default MenuItem;
