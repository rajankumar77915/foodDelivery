"use client"
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
  const [itemId, setitemId] = useState("");

  const token = useSelector((state) => state?.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await apiConnector(
          "GET",
          "http://localhost:4000/api/v1/order/getHistory",
          null,
          {
            Authorization: `Bearer ${token}`,
          }
        );
        console.log(response.data)
        setOrders(response.data);
        // setIsClient(true);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchHistory();
  }, []);

  const addRating = async () => {
    try {
      const response = await apiConnector(
        "POST",
        "http://localhost:4000/api/v1/auth/add-rating-review",
        {
          rating: inputValues[food._id],
          review: inputValues[food._id],
          itemId: food._id,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      );
      console.log("my res:", response?.data?.data);
      setIsClient(true);
    } catch (error) {
      console.error("Error adding rating and review:", error);
    }
  }

  const handleInputChange = (foodId, value) => {
    setInputValues({ ...inputValues, [foodId]: value });
  }

  return (
    <div className="flex flex-1 flex-col">
      {orders?.orders?.map((xfood, indx) => (
        <div key={indx}>
          {/* <h1>{xfood?.orderDate}</h1> */}
          {xfood?.SubsectionOrder?.map((food, index) => {
            return <div key={index}>


<div
              key={index}
              className={`flex w-full flex-wrap items-start justify-between gap-6 ${indx !== orders.length - 1 && "border-b border-b-richblack-400 pb-6"
              } ${indx !== 0 && "mt-6"} `}
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
                  {/* <p className="text-sm text-richblack-900">
                    {food?.category?.name}
                  </p> */}
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-25">4.5</span>
                    <ReactStars
                      count={5}
                      value={4.5}
                      size={20}
                      edit={false}
                      emptyIcon={<FaStar />}
                      fullIcon={<FaStar />}
                    />
                    <span className="text-richblack-400">
                      {food?.ratingAndReview?.length}
                    </span>
                  </div>
                  <p>this is my review</p>
                </div>
              </div>
            </div>
            </div>; // Need to explicitly return JSX
          })}
        </div>
      ))}
      {/* <h1 className="text-yellow-5">mijijijijijijijiji  Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci aperiam odio obcaecati expedita reprehenderit unde ad! Placeat incidunt, eveniet, error eius nam, voluptas temporibus minus ratione aperiam perferendis neque cumque. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur blanditiis corporis unde, pariatur eum in dolor, aspernatur quam neque laboriosam fugit facilis laudantium ut totam illo. Illo nostrum aut quaerat. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus explicabo facere tenetur labore ea minima optio modi. Nihil ut dolorum impedit vel incidunt illo ea, rem natus accusantium nemo quos? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni eum maiores, in distinctio fugit ad modi magnam assumenda nemo eius quaerat qui mollitia doloribus tempore debitis omnis molestias rem ipsam.</h1> */}
    </div>
  );
}
