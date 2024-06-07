import express  from "express";
const router = express.Router();

//import controller
import {createRestaurant,updateRestaurant,deleteRestaurant,getRestaurant,getDishes, addMenu, getMangerRestaurant, pendingRestrunts, approval, deleteApproval, checkExistence} from "../controller/RestaurantController.js"
import {auth,isAdmin} from "../middlewares/auth.js"
//define api rout
router.post("/createRestaurant", auth,createRestaurant)
router.get("/pendingRestaurants",pendingRestrunts)
router.put("/approv/:id",approval)
router.delete("/deleteApproval/:id",deleteApproval)
router.get("/checkExistence",auth,checkExistence)
router.delete("/deleteRestaurant/:id",auth,isAdmin,deleteRestaurant)
router.put("/updateRestaurant/:id",auth,isAdmin,updateRestaurant)
router.get("/restaurantDetail/:id",getRestaurant)
router.get("/getMangerRestaurant",auth,getMangerRestaurant);
router.get("/getDishes/:id",getDishes)//by customer location fetch dish
router.post("/menu/add",addMenu);
// router.get("/")

export default router