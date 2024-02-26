const BASE_URL ="http://localhost:4000/api/v1"

// AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL+"/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
  CHANGE_PASSWORD_API: BASE_URL + "/profile/changepassword",
  UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile/",
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
  DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
  FOOD_PAYMENT_API:BASE_URL+"/auth/payment" ,
  FOOD_PAYMENT_VERIFY_API:BASE_URL+"/auth/verifyPayment",
  // UPDATE_PROFILE_API: BASE_URL+"/profile/updateProfile",
  FOOD_CATEGORIES_API:BASE_URL+"/iteam/getAllCategories", 
  FOOD_IDCATEGORIES_API:BASE_URL+"/iteam/getItemById", 
  CREATE_FOOD_API:BASE_URL+"/restaurant/menu/add",
  findAllorderForuser_API:BASE_URL+"/order/findAllorderForuser",
}



// customer pay ENDPOINTS
export const paymentEndpoints = {
  FOOD_PAYMENT_API: BASE_URL + "/payment/capturePayment",
  FOOD_VERIFY_API: BASE_URL + "/payment/verifySignature",
  SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail",
}
