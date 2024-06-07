import express  from "express";
import { createOrder ,findAllorderForuser,changeOrderStatus, getAllOrderTrack, getHistory} from "../controller/Order.js";
import { auth } from "../middlewares/auth.js";
const router = express.Router();


router.post("/createOrder",auth ,createOrder);
router.get("/findAllorderForuser",auth ,findAllorderForuser);
router.get("/getHistory",auth ,getHistory);
router.get("/getAllOrderTrack",auth ,getAllOrderTrack);//for one user
router.put("/changeOrderStatus/:orderId/:subSectionId" ,changeOrderStatus);
export default router;  