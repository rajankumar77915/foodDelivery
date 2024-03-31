import { FaStar } from "react-icons/fa"
import { RiDeleteBin6Line } from "react-icons/ri"
import ReactStars from "react-rating-stars-component"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { apiConnector } from "@/services/apiconnector"

export default function History() {
  const [inputValues, setInputValues] = useState({});
  const [orders, setOrders] = useState([]);
  const [activeInput, setActiveInput] = useState("");
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");
  const [itemId, setItemId] = useState("");
  const [showReviewInput, setShowReviewInput] = useState(false); // State to toggle review input
  const token = useSelector((state) => state?.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const orderResponse = await apiConnector(
          "GET",
          "http://localhost:4000/api/v1/order/getHistory",
          null,
          {
            Authorization: `Bearer ${token}`,
          }
        );

        // Fetch rating reviews
        const ratingResponse = await apiConnector(
          "GET",
          "http://localhost:4000/api/v1/auth/get-rating-review", // Adjust endpoint as needed
          null,
          {
            Authorization: `Bearer ${token}`,
          }
        );

        // Match orders with ratings
        const matchedOrders = orderResponse.data.orders.map(order => {
          const matchedSubsectionOrders = order.SubsectionOrder.map(subsectionOrder => {
            const matchedRating = ratingResponse.data.find(rating => rating.item === subsectionOrder.item._id);
            return { ...subsectionOrder, rating: matchedRating };
          });
          return { ...order, SubsectionOrder: matchedSubsectionOrders };
        });

        setOrders(matchedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchHistory();
  }, []);

  const addRating = async (itemId) => {
    try {
      console.log("Adding rating and review for item:", itemId,inputValues[itemId]?.rating, inputValues[itemId]?.review);
      const response = await apiConnector(
        "POST",
        "http://localhost:4000/api/v1/auth/add-rating-review",
        {
          rating: inputValues[itemId]?.rating,
          review: inputValues[itemId]?.review,
          itemId: itemId,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      );
        
  
      window.location.reload();

    } catch (error) {
      console.error("Error adding rating and review:", error);
    }
  };

  const handleInputChange = (itemId, value, type) => {
    setInputValues(prevInputValues => ({
      ...prevInputValues,
      [itemId]: {
        ...prevInputValues[itemId],
        [type]: value,
      },
    }));
  };

  return (
    <div className="flex flex-1 flex-col">
      {orders?.map((order, orderIndex) => (
        <div key={orderIndex}>
          {order?.SubsectionOrder?.map((food, foodIndex) => (
            <div key={foodIndex}>
              <div
                className={`flex w-full flex-wrap items-start justify-between gap-6 ${orderIndex !== orders.length - 1 && "border-b border-b-richblack-400 pb-6"
                  } ${orderIndex !== 0 && "mt-6"} `}
              >
                <div className="flex flex-1 flex-col gap-4 xl:flex-row">
                  <img
                    src={food?.item?.image}
                    alt={food?.item?.itemName}
                    className="h-[148px] w-[220px] rounded-lg object-cover"
                  />
                  <div className="flex flex-col space-y-1">
                    <p className="text-lg font-medium text-richblack-900">
                      {food?.item?.itemName}
                    </p>
                    <div className=" gap-2">
                      <span className="text-richblack-400">
                        {food?.rating ? (
                          <p>
                            <div className="flex items-center gap-2">
                              <span className="text-yellow-25">{food?.rating?.rating}</span>
                              <ReactStars
                                count={5}
                                value={food?.rating?.rating}
                                size={20}
                                edit={false}
                                emptyIcon={<FaStar />}
                                fullIcon={<FaStar />}
                              />
                            </div>
                            Review:  <span className="font-poppins">{food?.rating?.review}</span>
                          </p>
                        ) : (
                          <button onClick={() => setShowReviewInput(food?.item?._id)}>Leave a Review</button>
                        )}
                        {/* Show review input if corresponding itemId matches */}
                        {showReviewInput === food.item._id && (
                          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-filter backdrop-blur-sm bg-blue-500 bg-opacity-40">
                            <div className="bg-white p-6 rounded-lg shadow-md">
                              <input
                                type="number"
                                className="w-full mb-4 px-3 py-2 border rounded-md"
                                value={inputValues[food.item._id]?.rating || ""}
                                onChange={(e) => handleInputChange(food.item._id, e.target.value, "rating")}
                                placeholder="Enter Rating"
                              />
                              <input
                                type="text"
                                className="w-full mb-4 px-3 py-2 border rounded-md"
                                value={inputValues[food.item._id]?.review || ""}
                                onChange={(e) => handleInputChange(food.item._id, e.target.value, "review")}
                                placeholder="Enter Review"
                              />
                              <div className="flex justify-between">
                                <button
                                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                  onClick={() => addRating(food.item._id)}
                                >
                                  Submit Rating and Review
                                </button>
                                <button
                                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                                  onClick={() => setShowReviewInput(null)} // Cancel button
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </div>
                        )}

                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
