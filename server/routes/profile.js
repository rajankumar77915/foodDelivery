import express  from "express";
const router = express.Router();
const { auth, isAdmin, isStudent, isInstructor } = require("../middlewares/auth")
import {
  deleteAccount,
  updateProfile,
  getAllUserDetails,
  updateDisplayPicture,
  getEnrolledCourses,
  instructorDashboard
} from "../controller/profile.js"

// ********************************************************************************************************
//                                      Profile,user routes
// ********************************************************************************************************
// Delete User Account
router.delete("/deleteProfile",auth, deleteAccount)
//update user Account
router.put("/updateProfile", auth, updateProfile)
router.get("/getUserDetails", auth, getAllUserDetails)
//update user image
router.put("/updateDisplayPicture", auth, updateDisplayPicture)
export default router