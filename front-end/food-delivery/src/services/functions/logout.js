import toast from "react-hot-toast"
import {Settoken } from "../../lib/authSlice"
import {Setuser } from "../../lib/profileSlice"
// import {resetCart} from "../../slics/cartSlice"
  export function logout(navigate) {
    return (dispatch) => {
      dispatch(Settoken(null))
      dispatch(Setuser(null))
      // dispatch(resetCart())
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      toast.success("Logged Out")
      navigate("/")
    }
  }