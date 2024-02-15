'use client'
import React, { useState } from 'react';
import RatingStars from '../componant/RatingStars';
import { useDispatch, useSelector } from 'react-redux';
import {addToCart} from '../../lib/cartSlice'
import toast from 'react-hot-toast';
import MenuItem from '../componant/menu/MenuItem';

function ParticularFood() {
    const dispatch=useDispatch()
    const [selectedVarieties, setSelectedVarieties] = useState([]);
    const foodData = useSelector((state) => state?.food?.food);
    console.log("foodData:",foodData?.myResult)
    const relatedData=foodData?.myResult?.relatedData;
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

    const handleAddToCart = () => {
        // Add your logic for adding the selected item to the cart
        // toast.loading("login");
        const temp=foodData?.myResult?.data
        const updatedItem = {
            ...temp, // Copy existing properties
            selectedVarieties: selectedVarieties // Add new property
        };
        dispatch(addToCart(updatedItem))
        // toast.dismiss("login");
        console.log("Adding to cart:", selectedVarieties);
    };

    return (

        <>
        <div className="bg-gray-100 mx-3">
            <div className="container mx-auto flex">
                <div className="food-image flex-1">
                    <img src={foodData?.myResult?.data?.image } alt="Food Image" className="w-full h-auto" />
                </div>
                <div className="info flex-1 p-8">
                    <h1 className="text-3xl font-bold">{foodData?.myResult?.data?.itemName}</h1>
                    <p className="mt-4">{foodData?.myResult?.data?.description}</p>
                    <div className="rating mt-4 w-36">
                        Rating:
                        <RatingStars Review_Count={3.2} Star_Size="fa-lg" />
                    </div>
                    <br />
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
        </>
    );
}

export default ParticularFood;
