import { toast } from "react-hot-toast"
// import { setLoading } from "../../slices/profileSlice";
import { apiConnector } from "../apiconnector"
import { endpoints } from "../apis"

const {
  FOOD_DETAILS_API,
  FOOD_CATEGORIES_API,
  GET_ALL_FOOD_API,
  CREATE_FOOD_API,
  EDIT_FOOD_API,
  CREATE_Category_API,
  UPDATE_Category_API,
  GET_ALL_Restrant_FOODS_API,
  DELETE_FOOD_API,
  GET_FULL_FOOD_DETAILS_AUTHENTICATED,
  CREATE_RATING_API,
  FOOD_IDCATEGORIES_API
} = endpoints

export const getAllFoods = async () => {
  const toastId = toast.loading("Loading...")
  let result = []
  try {
    const response = await apiConnector("GET", GET_ALL_FOOD_API)
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Food Categories")
    }
    result = response?.data?.data
  } catch (error) {
    console.log("GET_ALL_FOOD_API API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

export const fetchFoodDetails = async (courseId) => {
  const toastId = toast.loading("Loading...")
  //   dispatch(setLoading(true));
  let result = null
  try {
    const response = await apiConnector("POST", FOOD_DETAILS_API, {
      courseId,
    })
    console.log("FOOD_DETAILS_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response.data
  } catch (error) {
    console.log("FOOD_DETAILS_API API ERROR............", error)
    result = error.response.data
    // toast.error(error.response.data.message);
  }
  toast.dismiss(toastId)
  //   dispatch(setLoading(false));
  return result
}

// fetching the available course categories
export const fetchFoodCategories = async () => {
  let result = []
  try {
    const response = await apiConnector("GET", FOOD_CATEGORIES_API)
    console.log("FOOD_CATEGORIES_API API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Food Categories")
    }
    result = response?.data?.data
  } catch (error) {
    console.log("FOOD_CATEGORY_API API ERROR............", error)
    toast.error(error.message)
  }
  return result
}

// add the course details
export const addFoodDetails = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", CREATE_FOOD_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    })
    console.log("CREATE FOOD API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Add Food Details")
    }
    toast.success("Food Details Added Successfully")
    result = response?.data?.data
  } catch (error) {
    console.log("CREATE FOOD API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// edit the course details
export const editFoodDetails = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", EDIT_FOOD_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    })
    console.log("EDIT FOOD API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Update Food Details")
    }
    toast.success("Food Details Updated Successfully")
    result = response?.data?.data
  } catch (error) {
    console.log("EDIT FOOD API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// create a Category
export const createCategory = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", CREATE_Category_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("CREATE Category API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Create Category")
    }
    toast.success("Food Category Created")
    result = response?.data?.updatedFood
  } catch (error) {
    console.log("CREATE Category API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}



// update a Category
export const updateCategory = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", UPDATE_Category_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("UPDATE Category API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Update Category")
    }
    toast.success("Food Category Updated")
    result = response?.data?.data
  } catch (error) {
    console.log("UPDATE Category API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}



// fetching all courses under a specific Restrant
export const fetchRestrantFoods = async (token) => {
  let result = []
  const toastId = toast.loading("Loading...")
  // console.log("token: ",)
  try {
    const response = await apiConnector(
      "GET",
      GET_ALL_Restrant_FOODS_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )
    console.log("Restrant FOODS API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Restrant Foods")
    }
    result = response?.data?.data
  } catch (error) {
    console.log("Restrant FOODS API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// delete a course
export const deleteFood = async (data, token) => {
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("DELETE", DELETE_FOOD_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("DELETE FOOD API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Food")
    }
    toast.success("Food Deleted")
  } catch (error) {
    console.log("DELETE FOOD API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
}

// get full details of a course
export const getFullDetailsOfFood = async (courseId, token) => {
  const toastId = toast.loading("Loading...")
  //   dispatch(setLoading(true));
  let result = null
  try {
    const response = await apiConnector(
      "POST",
      GET_FULL_FOOD_DETAILS_AUTHENTICATED,
      {
        courseId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    )
    console.log("FOOD_FULL_DETAILS_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response?.data?.data
  } catch (error) {
    console.log("FOOD_FULL_DETAILS_API API ERROR............", error)
    result = error.response.data
    // toast.error(error.response.data.message);
  }
  toast.dismiss(toastId)
  //   dispatch(setLoading(false));
  return result
}



// create a rating for course
export const createRating = async (data, token) => {
  const toastId = toast.loading("Loading...")
  let success = false
  try {
    const response = await apiConnector("POST", CREATE_RATING_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("CREATE RATING API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Create Rating")
    }
    toast.success("Rating Created")
    success = true
  } catch (error) {
    success = false
    console.log("CREATE RATING API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return success
}


// fetching the available course categories
export const fetchFoodSameCategory = async (id) => {
  let result = []
  try {
    const response = await apiConnector("GET", FOOD_IDCATEGORIES_API+'/'+id)
    console.log("FOOD_CATEGORIES_API API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Food Categories")
    }
    result = response?.data
  } catch (error) {
    console.log("FOOD_CATEGORY_API API ERROR............", error)
    toast.error(error.message)
  }
  return result
}