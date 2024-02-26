import express  from "express";
const router = express.Router()

import { capturePayment, verifySignature } from "../controller/Payment.js"
import { auth } from "../middlewares/auth.js";
router.post("/capturePayment", auth, capturePayment)
router.post("/verifySignature",auth, verifySignature)
// router.post("/sendPaymentSuccessEmail",auth, sendPaymentSuccessEmail)

export default router;  