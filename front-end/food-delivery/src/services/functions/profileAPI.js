import { toast } from "react-hot-toast"

import { Setuser ,Setloading} from "../../lib/profileSlice"
import { apiConnector } from "../apiconnector"
import { endpoints } from "../apis"
import { logout } from "./logout"

const {  UPDATE_PROFILE_API} = endpoints

// export function getUserDetails(token, navigate) {
//   return async (dispatch) => {
    
//     const toastId = toast.loading("Loading...")
//     dispatch(Setloading(true))
//     try {
//       const response = await apiConnector("GET", GET_USER_DETAILS_API, null, {
//         Authorization: `Bearer ${token}`,
//       })
//       console.log("GET_USER_DETAILS API RESPONSE............", response)

//       if (!response.data.success) {
//         throw new Error(response.data.message)
//       }
//       const userImage = response.data.data.image
//         ? response.data.data.image
//         : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`
//       dispatch(Setuser({ ...response.data.data, image: userImage }))
//     } catch (error) {
//       dispatch(logout(navigate))
//       console.log("GET_USER_DETAILS API ERROR............", error)
//       toast.error("Could Not Get User Details")
//     }
//     toast.dismiss(toastId)
//     dispatch(Setloading(false))
//   }
// }

// export async function getUserEnrolledCourses(token) {
  // const toastId = toast.loading("Loading...")
  // let result = []
  // try {
  //   console.log("BEFORE Calling BACKEND API FOR ENROLLED COURSES");
  //   const response = await apiConnector(
  //     "GET",
  //     GET_USER_ENROLLED_COURSES_API,
  //     null,
  //     {
  //       Authorization: `Bearer ${token}`,
  //     }
  //   )
  //   console.log("AFTER Calling BACKEND API FOR ENROLLED COURSES");
  //   // console.log(
  //   //   "GET_USER_ENROLLED_COURSES_API API RESPONSE............",
  //   //   response
  //   // )

  //   if (!response.data.success) {
  //     throw new Error(response.data.message)
  //   }
  //   result = response.data.data
  // } catch (error) {
  //   console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
  //   toast.error("Could Not Get Enrolled Courses")
  // }
  // toast.dismiss(toastId)
  // return result
// }


export function updateProfile(token, profileData) {
  return async (dispatch) => {
    const toastId = toast.loading("Updating Profile...");
    dispatch(Setloading(true));
    try {
      const response = await apiConnector("PUT", UPDATE_PROFILE_API, profileData, {
        Authorization: `Bearer ${token}`,
      });
      console.log("UPDATE_PROFILE_API RESPONSE:", response);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      let updatedUser = response.data.user;
      
      dispatch(Setuser(updatedUser));
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("UPDATE_PROFILE_API ERROR:", error);
      toast.error("Could not update profile");
    }
    toast.dismiss(toastId);
    dispatch(Setloading(false));
  };
}