import express  from "express";
const router = express.Router();

//import controller
import {createRestaurant,updateRestaurant,deleteRestaurant,getRestaurant,getDishes} from "../controller/RestaurantController.js"
import {auth,isAdmin} from "../middlewares/auth.js"
//define api rout
router.post("/createRestaurant",auth,isAdmin,createRestaurant)
router.delete("/deleteRestaurant/:id",auth,isAdmin,deleteRestaurant)
router.put("/updateRestaurant/:id",auth,isAdmin,updateRestaurant)
router.get("/restaurantDetail/:id",getRestaurant)
router.get("/getDishes/:id",getDishes)
// router.get("/")

export default router