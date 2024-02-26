import Order from "../models/Order.js";
import SubsectionOrder from "../models/SubsectionOrder.js";
import User from "../models/User.js";



export const createOrder = async (req, res) => {
    try {
        console.log("oomomomomomomomomom",req.user)
        const  user = req.user;
        const { subSection = [],order } = req.body;
        
        const findUser=await  User.findById(user.id).populate("profile")
        if(!subSection || !findUser){
            return   res.status(404).json({
                success: false,
                message: "all field require  too createorder",
            });
        }
        // Create subsections
        let subsectionArray = []; 
        for (const item of subSection) {
            const tempSubOrder = await SubsectionOrder.create({
                item: item.item,
                available: true,
                qunitity: item.qunitity,
                orderStatus: "pending_orderReq"
            });
            subsectionArray.push(tempSubOrder._id);
        }

        // Create order
        const newOrder = await Order.create({
            user: findUser,
            SubsectionOrder: subsectionArray,
            deliveryAddress: findUser.profile.address,
        });

        return res.status(200).json({
            success: true,
            message: "Successfully order created. Payment type pending",
        });
    } catch (error) {
        console.log("Error creating order:", error.message);
        return res.status(500).json({
            success: false,
            message: "Error creating order",
        });
    }
};


const getOrder=async(req,res)=>{
    const user=req.user;
    //is user exist
    const findUser=await  User.findById(user.id);
    if(!findUser){
        return res.status(500).json({
            success:false,
            message:"use not authicated"
        })
    }
    

}

const changeOrderStatus = async (req, res) => {
    try {
        const { order_id, orderStatus } = req.body;

        // Find order and change status
        const myOrder = await Order.findByIdAndUpdate(order_id, { $set: { orderStatus: orderStatus } }).exec();

        if (!myOrder) {
            return res.status(404).json({
                success: false,
                message: "Order status not changed",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Successfully order status changed",
        });
    } catch (err) {
        console.log("Error changing order status:", err.message);
        return res.status(500).json({
            success: false,
            message: "Error changing order status",
        });
    }
};

const getAllOrder = async (req, res) => {
    try {
        const user = req.user;

        // Find orders
        const orders = await Order.find({ user: user });

        if (!orders) {
            return res.status(404).json({
                success: false,
                message: "Your orders not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Successfully fetched all orders",
            data: orders,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error fetching orders",
        });
    }
};

export const findAllorderForuser=  async(req,res)=>{
    try {
        const userId=req.user.id;
        // Step 1: Find the restaurantId associated with the user
        const RestaurantOwner = await User.findById(userId).populate("restaurantId")
        console.log("rid",RestaurantOwner)
        const RestaurantId=RestaurantOwner.restaurantId;
        const orders = await Order.find({
           
        }).populate({
            path: "SubsectionOrder", 
            populate: { path: 'item', match: { 'restaurantId':  RestaurantId}}
        });
        
        
        const orders1 = await Order.find({
            'SubsectionOrder': "65d1d350b2ed76912923df82"
          }).populate({path:"SubsectionOrder",populate:{path:'item',populate:{path:'restaurantId'}}});
        console.log("jnjdndjndjndjndjdnjdnjndjndjdnjdnjdndjndjndjdnjdnjd ",orders)
        
    
        return res.json(orders);
      } catch (error) {
        console.error('Error finding orders:', error);
        throw error; // You might want to handle this error more gracefully
      }
}