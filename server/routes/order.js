import express  from "express";
import { createOrder ,findAllorderForuser} from "../controller/Order.js";
import { auth } from "../middlewares/auth.js";
const router = express.Router();


router.post("/createOrder",auth ,createOrder);
router.get("/findAllorderForuser",auth ,findAllorderForuser);
export default router;  