import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {updateProfile} from "@/services/functions/profileAPI"
import { useRouter } from "next/navigation";
import IconBtn from "../IconBtn";

export default function Addresh() {
    const  token  = useSelector((state) => state?.auth?.token)  ||"";
    const userAddress=(useSelector((state)=> state?.profile?.user)) ?.profile?.address
    console.log("the addresh is ",userAddress)
    const dispatch = useDispatch()
    const navigate = useRouter()
    const [loading, setLoading] = useState(false);
    const [address, setAddress] = useState({
        street: userAddress?.street ||"",
        city: userAddress?.city || "",
        state: userAddress?.state || "",
        country: userAddress?.country || "",
        pincode: userAddress?.pincode  || ""
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
        const profileData={address:editedAddress}
        dispatch(updateProfile(token,profileData,navigate.push))
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
    
   
    <div className="border-b border-b-richblack-400 ml-0.5">
            {isEditing || userAddress==null ? (
                <>
                    <label>street:</label><br></br>
                    <input
                        className="w-11/12 border-2  ml-2 mr-2 border-yellow-25  mb-2 p-1 "
                        value={editedAddress.street}
                        maxLength={150}
                        onChange={(e) => handleInputChange(e, 'street')}
                    />

                    <br></br><label>city:</label><br></br>
                    <input
                       className="w-11/12 border-2  ml-2 mr-2 border-yellow-25  mb-2 p-1 "
                        value={editedAddress.city}
                        onChange={(e) => handleInputChange(e, 'city')}
                    />
                     <br></br><label>state:</label><br></br>
                    <input
                         className="w-11/12 border-2  ml-2 mr-2 border-yellow-25  mb-2 p-1 "
                        value={editedAddress.state}
                        onChange={(e) => handleInputChange(e, 'state')}
                    />
                     <br></br><label>country:</label><br></br>
                    <input
                         className="w-11/12 border-2  ml-2 mr-2 border-yellow-25  mb-2 p-1 "
                        value={editedAddress.country}
                        onChange={(e) => handleInputChange(e, 'country')}
                    />
                     <br></br><label>pincode:</label><br></br>
                    <input type="number"
                          className="w-11/12 border-2  ml-2 mr-2 border-yellow-25  mb-2 p-1 "
                        value={editedAddress.pincode}
                        onChange={(e) => handleInputChange(e, 'pincode')}
                    />
                    <div className="flex gap-3 m-2">
                    <IconBtn disabled={loading} onclick={() => handleSaveClick()} text="Saved" />         
                    <IconBtn  onclick={handleCancelClick}>Cancel</IconBtn>
                    </div>
                </>
            ) : (
                <>
                    <p className="font-extralight">{` ${address.street} ,${address.city},  ${address.state},${address.country},${address.pincode}`}</p>

                    <button className="text-base text-blue-100 hover:text-blue-10" onClick={handleEditClick}>Edit</button>
                </>
            )}
        </div>

  )
}
