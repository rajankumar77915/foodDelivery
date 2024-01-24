const SubsectionOrder = require("../models/SubsectionOrder")
const Order = require("../models/Order")

export const createOrder = async (req, res) => {
    try {
        const { user } = req.user;
        const { itemsWithqunitity = [], deliveryAddress = user.deliveryAddress } = req.body;

        

        if(!itemsWithqunitity || !deliveryAddress || !user){
            return   res.status(404).json({
                success: false,
                message: "all field require  too createorder",
            });
        }
        // Create subsections
        let subsectionArray = [];
        for (const item of itemsWithqunitity) {
            const tempSubOrder = await SubsectionOrder.create({
                items: item.items,
                available: true,
                qunitity: item.qunitity,
                orderStatus: "pending_orderReq"
            });
            subsectionArray.push(tempSubOrder._id);
        }

        // Create order
        const newOrder = await Order.create({
            user: user,
            SubsectionOrder: subsectionArray,
            deliveryAddress: deliveryAddress,
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
