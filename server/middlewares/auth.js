const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

//auth
exports.auth = async (req, res, next) => {
    try{

        //extract token
        const token = req.cookies.token 
        || req.body.token 
        || req.header("Authorization").replace("Bearer ", "");
        
        console.log("token--------------- : ",token)
        //if token missing, then return response
        if(!token) {
            return res.status(401).json({
                success:false,
                message:'TOken is missing',
            });
        }

        //verify the token
        try{
            const decode =  jwt.verify(token, process.env.JWT_SECRET);
            console.log("token decode:",decode);
            req.user = decode;
        }
        catch(err) {
            //verification - issue
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            });
        }
        next();
    }
    catch(error) {  
        return res.status(401).json({
            success:false,
            message:`Something went wrong while validating the token ${error.message}`,
        });
    }
}

//isCustomer
exports.isCustomer = async (req, res, next) => {
 try{
        if(req.user.accountType !== "customer") {
            return res.status(401).json({
                success:false,
                message:'This is a protected route for customer only',
            });
        }
        next();
 }
 catch(error) {
    return res.status(500).json({
        success:false,
        message:'User role cannot be verified, please try again'
    })
 }
}


//isDeliveryBoy
exports.isDeliveryBoy = async (req, res, next) => {
    try{
           if(req.user.accountType !== "deliveryBoy") {
               return res.status(401).json({
                   success:false,
                   message:'This is a protected route for deliveryBoy only',
               });
           }
           next();
    }
    catch(error) {
       return res.status(500).json({
           success:false,
           message:'User role cannot be verified, please try again'
       })
    }
   }


//isAdmin
exports.isAdmin = async (req, res, next) => {
    try{
           if(req.user.accountType !== "admin") {
               return res.status(401).json({
                   success:false,
                   message:'This is a protected route for Admin only',
                   data:req.user
               });
           }
           next();
    }
    catch(error) {
       return res.status(500).json({
           success:false,
           message:'User role cannot be verified, please try again'
       })
    }
   }