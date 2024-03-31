"use client"
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { updateProfile } from "../../../services/functions/profileAPI";
import Footer from "../../componant/layout/Footer";
import RatingCard from "../../componant/RatingCard";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile);
  const token = useSelector((state) => state?.auth.token);
   // Define state for currentRating
   const [currentRating, setCurrentRating] = useState(null);
   const [isClient, setIsClient] = useState(false)
  const [userName, setUserName] = useState(user?.firstName + " " + user?.lastName);
  const [image, setImage] = useState("");
  const [saved, setSaved] = useState(false);
  const [IsSaving, setIsSaving] = useState(false);
  const [mobileNo, setMobileNo] = useState(user?.mobileNo);
  const [email, setEmail] = useState(user?.email);
  const [streetAddress, setStreetAddress] = useState(user?.profile?.address?.street);
  const [postalCode, setPostalCode] = useState(user?.profile?.address?.pincode);
  const [city, setCity] = useState(user?.profile?.address?.city);
  const [country, setCountry] = useState(user?.profile?.address?.country);
  const [state, setState] = useState(user?.profile?.address?.state);
  const [isEdit, setIsEdit] = useState(false);

  // Dummy rating reviews data
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
    // Add more reviews as needed
  ]);

  useEffect(() => {
    setImage(user?.profile?.image);
    setIsClient(true)
  }, [user?.image]);

  const handleProfileInfoUpdate = async (ev) => {
    ev.preventDefault();
    setIsSaving(true);
    const [firstName, lastName] = userName.split(" ");
    const profileData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      address: {
        street: streetAddress,
        city: city,
        state: state,
        country: country,
        pincode: postalCode
      }
    };

    try {
      await dispatch(updateProfile(token, profileData));
      setSaved(true);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Could not update profile");
    }

    setIsSaving(false);
  };

  return (
    <>
    {isClient &&
      <section className=" pb-2 pt-20 mt-15 ">
        <div className="max-w-xl   mx-auto  shadow-xl p-6">
          <div className="flex gap-4 w-32">
            <form className="flex flex-col font-poppins justify-between mt-2" onSubmit={handleProfileInfoUpdate}>
              <img
                className="rounded-full w-16 mx-auto mb-5"
                src={image}
                width={20}
                height={25}
                alt="avatar"
              />
              <div className="sm:flex gap-3">
              <div className="relative mb-2">
                <label htmlFor="userName" className="">
                  Name:
                </label><br></br>
                <input
                  id="userName"
                  className="rounded-lg border border-gray-300  p-2 pl-8"
                  type="text"
                  placeholder="First and last name"
                  value={userName}
                  onChange={(ev) => setUserName(ev.target.value)}
                />
              </div>
              <div className="relative mb-2">
                <label htmlFor="userName" className="">
                  Email:
                </label><br></br>
              <input
                 className="rounded-lg border border-gray-300  p-2 pl-8"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
              />
              </div>
              </div>

              <div className="relative mb-2 mx-auto">
                <label htmlFor="userName" className="">
                  Mobile:
                </label><br></br>
              <input
                className="rounded-lg border border-gray-300 p-2 mb-2"
                type="tel"
                placeholder="Mobile number"
                value={mobileNo}
                onChange={(ev) => setMobileNo(ev.target.value)}
              />
              </div>
              <div className="relative mb-2 ">
                <label htmlFor="address" className="">
                  Addresh:
                </label><br></br>
              <input
                className="rounded-lg border border-gray-300 p-2 mb-2 w-full"
                id="address"
                type="text"
                placeholder="Street address"
                value={streetAddress}
                onChange={(ev) => setStreetAddress(ev.target.value)}
              />
              </div>
              <div className="flex gap-4 justify-between">
                <input
                  className="rounded-lg border border-gray-300 p-2 mb-2"
                  type="text"
                  placeholder="Postal code"
                  value={postalCode}
                  onChange={(ev) => setPostalCode(ev.target.value)}
                />
                <input
                  className="rounded-lg border border-gray-300 p-2 mb-2"
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(ev) => setCity(ev.target.value)}
                />
              </div>
              
              {isEdit ? (
                <div className="flex justify-between">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full mr-5" type="submit">
                    Confirm Update
                  </button>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full mr-5" type="button" onClick={() => setIsEdit(false)}>
                    Cancel
                  </button>
                </div>
              ) : (
                <button className="bg-richblack-800 text-white px-4 py-2 w-full rounded-lg" type="button" onClick={() => setIsEdit(true)}>
                  Edit
                </button>
              )}
            </form>
          </div>
        </div>

        <div className=" mb-6  ">
          <h2 className="text-2xl font-semibold font-poppins mt-5 ml-5 mb-2">Rating Reviews</h2>
          <div className="flex flex-wrap">
            {ratingReviews.map((ratingData, index) => (
              <RatingCard key={index} ratingData={ratingData} currentRating={currentRating} setCurrentRating={setCurrentRating} />
            ))}
          </div>
        </div>
      </section>
}
    </>
  );
};

export default ProfilePage;
