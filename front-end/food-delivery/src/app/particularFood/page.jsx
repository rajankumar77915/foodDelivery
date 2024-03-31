'use client'
import { useEffect, useState } from 'react';
import RatingStars from '../componant/RatingStars';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../lib/cartSlice'
import toast from 'react-hot-toast';
import MenuItem from '../componant/menu/MenuItem';
import RatingCard from '../componant/RatingCard';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function ParticularFood() {
    const dispatch = useDispatch()
    const [isClient, SetisClient] = useState(false);

    const [selectedVarieties, setSelectedVarieties] = useState([]);
    const foodData = useSelector((state) => state?.food?.food);
    console.log("foodData:", foodData?.myResult)
    const relatedData = foodData?.myResult?.relatedData;
    let varityData;
    if (foodData)
        varityData = JSON?.parse(foodData?.myResult?.data?.foodVarity[0]);

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        if (checked) {
            setSelectedVarieties([...selectedVarieties, name]);
        } else {
            setSelectedVarieties(selectedVarieties.filter(variety => variety !== name));
        }
    };
    useEffect(() => {
        SetisClient(true)
    }, [])
    const dummyReviews = [
        { id: 1, rating: 4, comment: "Great food, loved it!" },
        { id: 2, rating: 5, comment: "Amazing taste, will order again! Amazing taste, will order again! Amazing taste, will order again! Amazing taste, will order again!" },
        { id: 3, rating: 3, comment: "Decent food, but could be better." },
        { id: 4, rating: 4.5, comment: "Delicious! Highly recommended." },
        { id: 5, rating: 5, comment: "Best food I've ever had!" }
    ];

    const [ratingReviews] = useState([
        {
            restaurantName: "Restaurant A",
            foodName: "Food X",
            rating: 4.5,
            review: "Great food, loved it! Great food, loved it! Great food, loved it! Great food, loved it! Great food, loved it! Great food, loved it! Great food, loved it! Great food, loved it! Great food, loved it! Great food, loved it! Great food, loved it! Great food, loved it! Great food, loved it! Great food, loved it!Great food, loved it! Great food, loved it! Great food, loved it! Great food, loved it!"
        },
        {
            restaurantName: "Restaurant B",
            foodName: "Food Y",
            rating: 3.8,
            review: "Nice experience, but could be better."
        },
        {
            restaurantName: "Restaurant B",
            foodName: "Food Y",
            rating: 3.8,
            review: "Nice experience, but could be better."
        },
        {
            restaurantName: "Restaurant B",
            foodName: "Food Y",
            rating: 3.8,
            review: "Nice experience, but could be better."
        },
        {
            restaurantName: "Restaurant B",
            foodName: "Food Y",
            rating: 3.8,
            review: "Nice experience, but could be better."
        },
        {
            restaurantName: "Restaurant B",
            foodName: "Food Y",
            rating: 3.8,
            review: "Nice experience, but could be better."
        },
        {
            restaurantName: "Restaurant B",
            foodName: "Food Y",
            rating: 3.8,
            review: "Nice experience, but could be better."
        },
        // Add more reviews as needed
    ]);

    const handleAddToCart = () => {
        // Add your logic for adding the selected item to the cart
        // toast.loading("login");
        const temp = foodData?.myResult?.data
        const updatedItem = {
            ...temp, // Copy existing properties
            selectedVarieties: selectedVarieties // Add new property
        };
        dispatch(addToCart(updatedItem))
        // toast.dismiss("login");
        console.log("Adding to cart:", selectedVarieties);
    };

    const ratingPerPage = 3; // Number of ratings to display per page
    const ratingPageCount = Math.ceil(ratingReviews.length / ratingPerPage);

    const [currentRatingIndex, setCurrentRatingIndex] = useState(0);

    const handleRatingNextClick = () => {
        setCurrentRatingIndex((prevIndex) => (prevIndex + 1) % ratingPageCount);
    };

    const handleRatingBackClick = () => {
        setCurrentRatingIndex((prevIndex) => (prevIndex - 1 + ratingPageCount) % ratingPageCount);
    };

    return (
        <>
            {isClient &&
                <div>
                    <div className="bg-gray-100 mx-3">
                        <div className="container mx-auto flex">
                            <div className="food-image flex-1">
                                <img src={foodData?.myResult?.data?.image} alt="Food Image" className="w-full h-auto" />
                            </div>
                            <div className="info flex-1 p-8">
                                <h1 className="text-3xl font-bold">{foodData?.myResult?.data?.itemName}</h1>
                                <p className="mt-4">{foodData?.myResult?.data?.description}</p>
                                <br></br>
                                <h1 className='text-3xl border-t-2'>customize</h1>
                                <div className="customize mt-1">
                                    {varityData?.map((varity, index) => (
                                        <label key={index} className="inline-flex items-center mr-4">
                                            <input
                                                type="checkbox"
                                                className="form-checkbox text-indigo-600"
                                                name={varity}
                                                checked={selectedVarieties.includes(varity)}
                                                onChange={handleCheckboxChange}
                                            />
                                            <span className="ml-2">{varity}</span>
                                        </label>
                                    ))}
                                </div>
                                <button onClick={handleAddToCart} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                                    Add to Cart
                                </button>
                                <br />
                  

                            </div>
                        </div>
                        <div className="rating mt-4 w-full flex ">
                            <div className="rating mt-4 w-full flex  justify-center items-center mx-auto">
                                {currentRatingIndex > 0 && (
                                    <button className="w-1/6 flex items-center border-none" onClick={handleRatingBackClick}>
                                        <FaChevronLeft />
                                    </button>
                                )}

                                <div className="container mx-auto flex flex-wrap justify-between items-center">
                                    {ratingReviews.slice(currentRatingIndex * ratingPerPage, (currentRatingIndex + 1) * ratingPerPage).map((ratingData, index) => (
                                        <RatingCard key={index} ratingData={ratingData} currentRating={ratingData.rating} />
                                    ))}
                                </div>

                                <button className="w-1/6 flex items-center border-none" onClick={handleRatingNextClick}>
                                    <FaChevronRight />
                                </button>
                            </div>
                        </div>
                    </div>
                    <h1 className='text-3xl mx-3 mt-5'>Releated Items</h1>
                    <div className="mr-2 ml-2 m-4 gap-5 flex flex-wrap justify-around pl-32 pr-32">
                        {
                            relatedData?.map(item => (
                                <MenuItem
                                    key={item._id}
                                    item={item}
                                />
                            ))
                        }
                    </div>
                </div>
            }
        </>

    );
}

export default ParticularFood;
