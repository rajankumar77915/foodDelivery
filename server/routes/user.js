// Import the required modules
import express from "express";
const router = express.Router()
import stripe from 'stripe';

const stripeSecretKey = 'sk_test_51OiV6DSE4ou3ybiqIfrwKdJrAzCdtUZ8ODFjDwjznEsNOILMFztIJJS3nT5xslrZd6C2vgVirooFhwKOm2XLanxr00LOKwfXyc';
const stripeInstance = stripe(stripeSecretKey);// Import the required controllers and middleware functions
import {login ,signup, sendotp, changePassword} from "../controller/Auth.js";

import {
  resetPasswordToken,
  resetPassword,
} from "../controller/ResetPassword.js";

import  {auth}  from "../middlewares/auth.js";
import Item from "../models/Item.js";


// Routes for Login, Signup, and Authentication

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

// Route for user login
router.post("/login", login)
// Route for user signup
router.post("/signup", signup)

// Route for sending OTP to the user's email
router.post("/sendotp", sendotp)

// Route for Changing the password
router.post("/changepassword", auth, changePassword)

// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken)

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword)

router.post("/payment", async (req, res) => {
  try {
    const foodDetail=req?.body?.foods;
    const foods = await Promise.all(foodDetail?.map(async (food) => {
      
      const itemm = await Item.findById(food._id);
      if(!itemm){
        return res.status(500).json({
          sucess:false,
          message:"something went wrong !please logout or try  again"
        })
      }
      return {name:itemm.itemName,price:itemm.price};
    }));

      const lineItems =foods.map(food => ({
        price_data: {
            currency: 'usd',
            product_data: {
                name: food.name, // Use the food item as the product name
            },
            unit_amount: Number(food.price)*10, // $10 in cents (adjust according to your pricing)
        },
        quantity: 1, // Quantity of this food item
    }));

    const session = await stripeInstance.checkout.sessions.create({
        payment_method_types: ['card'],
        mode:"payment",
        line_items: lineItems,
        // Add other necessary parameters here
        success_url: 'http://localhost:3000?sucess=true', // Redirect URL after successful payment
        cancel_url: 'http://localhost:3000/error', // Redirect URL after canceled payment
    });
    console.log("seesion:",session)

    res.json({ sessionId: session.id });
  } catch (error) {
      console.error('Error creating Checkout Session:', error);
      res.status(500).json({ error: 'Failed to create Checkout Session' });
  }
});

// Export the router for use in the main application
export default router;