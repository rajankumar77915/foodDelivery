import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "@/services/functions/profileAPI"
import { useRouter } from "next/navigation";
import IconBtn from "../IconBtn";

export default function Addresh() {
    const token = useSelector((state) => state?.auth?.token) || "";
    const userAddress = (useSelector((state) => state?.profile?.user))?.profile?.address
    console.log("the addresh is ", userAddress)
    const dispatch = useDispatch()
    const navigate = useRouter()
    const [loading, setLoading] = useState(false);
    const [address, setAddress] = useState({
        street: userAddress?.street || "",
        city: userAddress?.city || "",
        state: userAddress?.state || "",
        country: userAddress?.country || "",
        pincode: userAddress?.pincode || ""
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editedAddress, setEditedAddress] = useState({
        street: "",
        city: "",
        state: "",
        country: "",
        pincode: ""
    });

    const handleEditClick = () => {
        setEditedAddress(address);
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        setLoading(true)
        setAddress(editedAddress);
        const profileData = { address: editedAddress }
        dispatch(updateProfile(token, profileData, navigate.push))
        setIsEditing(false);
        setLoading(false)
    };

    const handleCancelClick = () => {
        setIsEditing(false);
    };

    const handleInputChange = (e, field) => {
        setEditedAddress({
            ...editedAddress,
            [field]: e.target.value
        });
    };
    return (
        <div className="flex flex-col items-start border-b border-b-richblack-400 ml-0.5 p-4 bg-white rounded shadow">
            {isEditing || userAddress == null ? (
                <>
                    <label className="font-bold mb-1">Street:</label>
                    <input
                        className="w-full border-2 rounded p-2 mb-4"
                        value={editedAddress.street}
                        maxLength={150}
                        onChange={(e) => handleInputChange(e, 'street')}
                    />
                    <div className="w-full flex  gap-5 font-poppins">
                        <div className="flex items-center gap-3">
                            <label className="font-bold mb-4 gap-1 font-poppins">City:</label>
                            <input
                                className="w-full border-2 rounded p-2 mb-4"
                                value={editedAddress.city}
                                onChange={(e) => handleInputChange(e, 'city')}
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <label className="font-bold mb-4 gap-1">State:</label>
                            <input
                                className="w-full border-2 rounded p-2 mb-4"
                                value={editedAddress.state}
                                onChange={(e) => handleInputChange(e, 'state')}
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <label className="font-bold mb-4 gap-1">Country:</label>
                            <input
                                className="w-full border-2 rounded p-2 mb-4"
                                value={editedAddress.country}
                                onChange={(e) => handleInputChange(e, 'country')}
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <label className="font-bold mb-4 gap-1">Pincode:</label>
                            <input
                                type="number"
                                className="w-full border-2 rounded p-2 mb-4"
                                value={editedAddress.pincode}
                                onChange={(e) => handleInputChange(e, 'pincode')}
                            />
                        </div>
                    </div>




                    <div className="flex gap-3 m-2">
                        <IconBtn disabled={loading} onclick={() => handleSaveClick()} text="Saved" />
                        <IconBtn onclick={handleCancelClick}>Cancel</IconBtn>
                    </div>
                </>
            ) : (
                <>
                    <p className="font-extralight mb-4">{` ${address.street} ,${address.city},  ${address.state},${address.country},${address.pincode}`}</p>

                    <button className="text-base text-blue-100 hover:text-blue-10" onClick={handleEditClick}>Edit</button>
                </>
            )}
        </div>
    )
}