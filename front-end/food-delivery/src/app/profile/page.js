'use client'
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { updateProfile } from "../../services/functions/profileAPI";
import Header from "../componant/layout/Header";
import Footer from "../componant/layout/Footer";
import UserTabs from "../componant/layout/UserTabs";
import Image from "next/image";
// import { profile } from "console"; 

const ProfilePage = () => {

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile);
  const token = useSelector((state) => state?.auth.token)
  const [userName, setUserName] = useState(user?.firstName + " " + user?.lastName);
  const [image, setImage] = useState("");
  const [saved, setSaved] = useState(false);
  const [IsSaving, setIsSaving] = useState(false);
  const [mobileNo, setmobileNo] = useState(user?.mobileNo);
  const [email, setEmail] = useState(user?.email);
  const [streetAddress, setStreetAddress] = useState(user?.profile?.address?.street);
  const [postalcode, setPostalCode] = useState(user?.profile?.address?.pincode);
  const [city, setCity] = useState(user?.profile?.address?.city);
  const [country, setCountry] = useState(user?.profile?.address?.country);
  const [state, setState] = useState(user?.profile?.address?.state);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    setImage(user?.profile?.image);
    // console.log("image:",user.profile.image)
  }, [user?.image]);

  const handleProfileInfoUpdate = async (ev) => {
    ev.preventDefault();
    setIsSaving(true);
    const [firstName, lastName] = userName.split(" ");
    const profileData = {
      "firstName": firstName,
      "lastName": lastName,
      "email": email,
      "address": {
        "street": streetAddress,
        "city": city,
        "state": state,
        "country": country,
        "pincode": postalcode
      }

    }
    try {
      await dispatch(updateProfile(token, profileData)); // Assuming you have 'profileData' and 'navigate' available
      setSaved(true);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Could not update profile");
    }

    setIsSaving(false);
  };

  return (
    <>
      <Header />
      <section className="mt-8">
        {user?.accountType === "admin" && <UserTabs />}
        <div className="max-w-md mx-auto mb-6 mt-4">
          {/* {saved && (
            <h2 className="text-center bg-green-100 p-4 rounded-lg border border-green-300">
              Profile saved!
            </h2>
          )}
          {IsSaving && (
            <h2 className="text-center bg-blue-100 mb-5 p-4 rounded-lg border border-blue-300">
              Saving...
            </h2>
          )} */}

          <div className="flex gap-4 w-32">
            {/* <div className="relative"> */}
            <img
              className="rounded-lg w-full h-full mb-1"
              src={image}
              width={20}
              height={25}
              alt="avatar"
            />
      
            {/* </div> */}
            <form className="flex flex-col justify-between" onSubmit={handleProfileInfoUpdate}>
              <input
                className="rounded-lg border border-gray-300 p-2 mb-2"
                type="text"
                placeholder="First and last name"
                value={userName}
                onChange={(ev) => setUserName(ev.target.value)}
              />
              <input
                className="rounded-lg border border-gray-300 p-2 mb-2"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
              />
              <input
                className="rounded-lg border border-gray-300 p-2 mb-2"
                type="tel"
                placeholder="mobileNo number"
                value={mobileNo}
                onChange={(ev) => setmobileNo(ev.target.value)}
              />
              <input
                className="rounded-lg border border-gray-300 p-2 mb-2"
                type="text"
                placeholder="Street address"
                value={streetAddress}
                onChange={(ev) => setStreetAddress(ev.target.value)}
              />
              <div className="flex gap-4">
                <input
                  className="rounded-lg border border-gray-300 p-2 mb-2"
                  type="text"
                  placeholder="Postal code"
                  value={postalcode}
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
              <input
                className="rounded-lg border border-gray-300 p-2 mb-2"
                type="text"
                placeholder="Country"
                value={country}
                onChange={(ev) => setCountry(ev.target.value)}
              />
              {isEdit ? (
                <div className="flex justify-between">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full mr-5" type="submit">
                    confirm Update
                  </button>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full mr-5" type="button" onClick={() => setIsEdit(false)}>
                    Cancel
                  </button>
                </div>
              ) : (
                <button className="bg-blue-500 text-white px-4 py-2 w-full rounded-lg" type="button" onClick={() => setIsEdit(true)}>
                  Edit
                </button>
              )}
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ProfilePage;
