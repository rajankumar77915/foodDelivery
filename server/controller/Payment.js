import Item from "../models/Item.js";
import Order from "../models/Order.js";
import { instance } from '../config/razorpay.js';
import User from '../models/User.js';

// import { paymentSuccessEmail } from "../mail/templates/paymentSucessEmaill";
import crypto from 'crypto';
import SubsectionOrder from "../models/SubsectionOrder.js";
import Payment from "../models/Payment.js";
import Restaurant from "../models/Restaurant.js";
//initiate the razorpay order
export const capturePayment = async(req, res) => {
    console.log("------------------------------------------- sucess cap")
    const {items} = req.body;
    // xonsole.log("gello",)
    const userId = req.user.id;
    
    if(items.length === 0) {
        return res.json({success:false, message:"Please provide order Id"});
    }
    

    
    //find user
    const userinServer=await User.findById(userId)
    if(!userinServer){
        return res.status(404).json({success:false,message:"use not found"})
    }
    let totalAmount = 0;

        // create new order
        const newOrder=await Order.create({user:userinServer._id})
        console.log("neworder: ",newOrder)
       for(const items_id of items) {
        let item;
        try{
            
            console.log("----------------------------",req.body,req.user)
            item = await Item.findById(items_id._id);
            if(!item) {
                return res.status(200).json({success:false, message:"Could not find the order"});
            }
            //create subsection order
            const subse=await SubsectionOrder.create({item:items_id._id,qunitity:items_id._quantity})
            newOrder.SubsectionOrder.push(subse._id);
            const restrunt=await Restaurant.findById(item.restaurantId);
          
            restrunt.orders.push(subse._id)
            await restrunt.save()
           await newOrder.save()

            totalAmount += (item.price*items_id.quantity);
        }
        catch(error) {
            console.log(error);
            return res.status(500).json({success:false, message:error.message});
        }
    }
     userinServer.orders.push(newOrder._id)
    userinServer.save()
// without cart
    
    const currency = "INR";
    const options = {
        amount: totalAmount * 100,
        currency,
        receipt: Math.random(Date.now()).toString(),
    }

    try{
        const paymentResponse = await instance.orders.create(options);
        res.json({
            success:true,
            message:paymentResponse,
        })
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({success:false, mesage:"Could not Initiate Order"});
    }

}


//verify the payment
export const verifySignature = async(req, res) => {
    console.log("------------------------------------------- sucess step:1")
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    
    console.log("at verify signature:",req.body)
    console.log("at verify signature:",req?.user)
    const orders = req.body?.items;
    const userId = req.user.id;
    if(!razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature || !orders || !userId) {
            return res.status(200).json({success:false, message:"Payment Failed"});
        }
        
        console.log("------------------------------------------- sucess step:2")
        let body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex");
        
        if(expectedSignature === razorpay_signature) {
            console.log("------------------------------------------- sucess step:3")
            //create payment 
            const Newpayment= await Payment.create({user:userId,currency:"INR",razorpayOrderId:razorpay_order_id,razorpaySignature:expectedSignature,razorpayPaymentId:razorpay_payment_id})
            const userUpdatedPay = await User.findByIdAndUpdate(userId, { $push: { payments: Newpayment._id } }).populate("profile");
            console.log("omomomomomomomomomom",userUpdatedPay)
            const latestOrder = await Order.findOne().sort({ orderDate: -1 });
            latestOrder.paymentStatus=true;
            latestOrder.deliveryAddress=userUpdatedPay?.profile?.address;
            latestOrder.save();
            
            //order payment status
            // await orderPaystatus(orders);
           
            return res.status(200).json({success:true, message:"Payment Verified"});
        }
        console.log("------------------------------------------- unsucess step:4")
        return res.status(200).json({success:"false", message:"Payment Failed"});

}


const orderPaystatus = async(orders) => {

    if(!orders) {
        return res.status(400).json({success:false,message:"Please Provide data for Courses or UserId"});
    }
    await Order.findByIdAndUpdate(orders._id, { $set: { paymentStatus: true } });
    console.log("------------------------------------------- sucess step e:1")


    // const emailResponse = await mailSender(
    //     enrolledStudent.email,
    //     `Successfully Enrolled into ${enrolledCourse.orderName}`,
    //     orderEnrollmentEmail(enrolledCourse.orderName, `${enrolledStudent.firstName}`)
    // )



    // if(typeof(orders)===typeof([])){
    //     for(const orderId of orders) {
    //         try{
    //             //find the order and enroll the student in it
    //         SubEnrollStudent(orderId,userId ,res);
    //         //console.log("Email Sent Successfully", emailResponse.response);
    //     }
    //     catch(error) {
    //         console.log(error);
    //         return res.status(500).json({success:false, message:error.message});
    //     }
    // }
// }
// else{
//     console.log("------------------------------------------- sucess step e:2")
//     // without cart
//     SubEnrollStudent(orders,userId,res);
// }
}



export const sendPaymentSuccessEmail = async(req, res) => {
    const {orderId, paymentId, amount} = req.body;
    console.log("at mail signature:",req.body)
    console.log("at m signature:",req.user,req.order)
    const userId = req.user.id;

    if(!orderId || !paymentId || !amount || !userId) {
        return res.status(400).json({success:false, message:"Please provide all the fields"});
    }

    try{
        //student ko dhundo
        const enrolledStudent = await User.findById(userId);
        // await mailSender(
        //     enrolledStudent.email,
        //     `Payment Recieved`,
        //      paymentSuccessEmail(`${enrolledStudent.firstName}`,
        //      amount/100,orderId, paymentId)
        // )
    }
    catch(error) {
        console.log("error in sending mail", error)
        return res.status(500).json({success:false, message:"Could not send email"})
    }
}









/************************************** */
// below can use only one order payment//
/************************************* */

// // capture the payment and initiate the Razorpay order
// export const capturePayment=async(req,res)=>{
//     //get orderId and UserId
//     const orderId=req.body.orders;
//     const {userId}=req.user.id;
//     console.log(req.body.orders)
//     //validation
//     //valid CourseId
//     if(!orderId){
//         return res.json({
//             sucess:false,
//             message:"please provide valid orderId"
//         })
//     };
    
//     //valid orderDetail
//     let order;
//     try{
//          order=await  Course.findById(orderId);
//         if(!order){
//             return res.json({
//                 sucess:false,
//                 message:"could not find the order"
//             }) 
//         }


//         //user already pay for the same order
//         const uid=new mongoose.Types.ObjectId(userId);
//         if(order.studentEnrolled .includes(uid)){
//             return res.status(200).json({
//                 sucess:false,
//                 message:"student is already enrolled"
//             })
//         }
//     }catch(error){
//         return res.json({
//             sucess:true,
//             message:`error at capturePayment  when validate orderDetail :${error}`
//         })
//     }
    


        
//         //order create
//         const amount=order.price;
//         const currency="INR";
        
//         const options={
//             amount: amount*100,
//             currency,
//             receipt:Math.random(Date.now()).toString(),
//             notes:{
//                 orderId:orderId,
//                 userId
//             }
//         }
//         console.log("razopay sucess")
//         try{
//             //initiate the payment using razorpay
//             const paymentResponse = await instance.orders.create(options);
//             console.log("paymentResponse",paymentResponse);

//             //return response
//             return res.status(200).json({
//                 success:true,
//                 orderName:order.orderName,
//                 orderDescribtion:order.orderDescribtion ,
//                 thumbnail:order.thumbnail,
//                 orderId:paymentResponse.id,
//                 currency:paymentResponse.currency,
//                 amount:paymentResponse.amount
//             })
//         }catch(error){
//             console.log("error occure at  apture payment fun");

//             return res.json({
//                 success:false,
//                 message:`Could not initiate  order :${error}`
//             })
//         }
    
// }


// //verify the payment
// export const verifySignature = async(req, res) => {
//     const razorpay_order_id = req.body?.razorpay_order_id;
//     const razorpay_payment_id = req.body?.razorpay_payment_id;
//     const razorpay_signature = req.body?.razorpay_signature;
//     const orders = req.body?.orders;
//     console.log("inside body:",req.body)
//     const userId = req.user.id;

//     if(!razorpay_order_id ||
//         !razorpay_payment_id ||
//         !razorpay_signature || !orders || !userId) {
//             return res.status(200).json({success:false, message:"Payment Failed"});
//     }

//     let body = razorpay_order_id + "|" + razorpay_payment_id;
//     const expectedSignature = crypto
//         .createHmac("sha256", process.env.RAZORPAY_SECRET)
//         .update(body.toString())
//         .digest("hex");

//         if(expectedSignature === razorpay_signature) {
//             //enroll karwao student ko
//             await orderPaystatus(orders, userId, res);
//             //return res
//             return res.status(200).json({success:true, message:"Payment Verified"});
//         }
//         return res.status(200).json({success:"false", message:"Payment Failed"});

// }

// //verify Signature of the razorPay and server          (simple:server Secrect and razorpay sent Secret matching)
// export const verifySignature= async(req,res)=>{
//     const webhookSecrect="omNamahshivay"; //my signature
//     console.log("heares:",req.headers)
//     const signature =req.headers("x-razorpay-signature"); //razorpay's signature hash form got
    
//     console.log("razoSign:", signature)
//      const shasum=crypto.createHmac("sha256",webhookSecrect);

//      shasum.update(JSON.stringify(req.body));
//      const digest=shasum.digest("hex");

//      if(signature===digest){
//         console.log("payment is authorized",res.body);
//         const {orderId,userId}=req.body.payload.payment.entity.notes;
//         try{
//             //find order and enroll student
//             const enrolledCourse=await Course.findByIdAndUpdate({_id:orderId},{$push:{studentEnrolled:{userId}}},{new:true});
//             if(!enrolledCourse){
//                 return res.status(500).json({
//                     sucess:false,
//                     message:'order did not found'
//                 })
//             }
//             console.log(enrolledCourse);

//             //find the student and add inside courese list  which enrolledCourse
//             const enrolledStudent=await User.findByIdAndUpdate({_id:userId},{$push:{Courses:orderId}},{new:true});
            
//             console.log(enrolledStudent);
            
//             //send confirmation mail
//             const emailResponse=await mailSender(enrolledStudent.email,"Succesfully enrolled",`congratulation u have suceesfully enrolled ${enrolledCourse.orderName}`);
//             console.log(emailResponse);
            
//             return res.status(200).json({
//                 sucess:true,
//                 message:"signature verified AND order added"
//             })
//         }catch(error){
//             console.log("error occured",error);
//             return res.status(500).json({
//                 sucess:false,
//                 message: `error at verifySignature function : ${error.message}`
//             });
//         }
//     }
//     else{
//         return res.status(400).json({
//             sucess:false,
//             message:"signature are diffrent"
//         })
//      }
// }