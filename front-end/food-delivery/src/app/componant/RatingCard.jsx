import React from "react";
import { HiOutlineStar } from "react-icons/hi";

const RatingCard = ({ ratingData, currentRating, setCurrentRating }) => {
  return (
    <div
      className={`m-2 w-[360px] lg:w-[30%] ${currentRating === ratingData?.restaurantName
        ? "bg-white shadow-[12px_12px_0_0] shadow-yellow-50"
        : "bg-richblack-800"
      } text-richblack-25 min-h-[300px] box-border cursor-pointer`}
      onClick={() => setCurrentRating(ratingData?.restaurantName)}
    >
      <div className="border-b-[2px] border-richblack-400 border-dashed h-[80%] p-6 flex flex-col gap-3">
        <div
          className={`${currentRating === ratingData?.restaurantName && "text-richblack-800"
          } font-semibold text-[20px]`}
        >
          {ratingData?.restaurantName}
        </div>

        <div className="text-richblack-400 overflow-auto h-36">{ratingData?.review}</div>
      </div>

      <div
        className={`flex justify-between ${currentRating === ratingData?.restaurantName ? "text-blue-300" : "text-richblack-300"
        } px-6 py-3 font-medium`}
      >
        {/* Rating */}
        <div className="flex items-center gap-2 text-[16px]">
          <HiOutlineStar />
          <p>{ratingData?.rating}</p>
        </div>

        {/* Number of Reviews */}
        <div className="flex items-center gap-2 text-[16px]">
          <p>{ratingData?.numberOfReviews} Reviews</p>
        </div>
      </div>
    </div>
  );
};

export default RatingCard;
