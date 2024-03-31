import Item from "../models/Item.js";
import Order from "../models/Order.js";
import Restaurant from "../models/Restaurant.js";
import SubsectionOrder from "../models/SubsectionOrder.js";
import User from "../models/User.js";



export const createOrder = async (req, res) => {
    try {
        console.log("oomomomomomomomomom", req.user)
        const user = req.user;
        const { subSection = [], order } = req.body;

        const findUser = await User.findById(user.id).populate("profile")
        if (!subSection || !findUser) {
            return res.status(404).json({
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
            console.log("kdkdkkdkdkdkdkkdkdkdkdkdkdkdkkdkdkkdkdkdkdkkdkdkd", item)
            const tempItemp = await Item.findById(item.item);
            const restrunt = await Restaurant.findById(tempItemp.restaurantId);

            restrunt.orders.push(tempSubOrder._id)
            await restrunt.save()
            subsectionArray.push(tempSubOrder._id);
        }

        // Create order
        const newOrder = await Order.create({
            user: findUser,
            SubsectionOrder: subsectionArray,
            deliveryAddress: findUser.profile.address,
        });
        findUser.orders.push(newOrder);
        await findUser.save();

        return res.status(200).json({
            success: true,
            message: "Successfully order created. Payment  pending",
        });
    } catch (error) {
        console.log("Error creating order:", error.message);
        return res.status(500).json({
            success: false,
            message: "Error creating order",
        });
    }
};




export const changeOrderStatus = async (req, res) => {
    try {
        const order_id = req.params.orderId.trim();
        const subSectionId = req.params.subSectionId.trim();
        const { orderStatus } = req.body;
        // const orderStatus = req.body.orderStatus.trim();
        console.log("orderStatus", orderStatus)

        // Find the SubsectionOrder by its ID and update the orderStatus field
        const updatedOrder = await SubsectionOrder.findByIdAndUpdate(subSectionId, { orderStatus: orderStatus }, { new: true });
        if (updatedOrder) {
            console.log(`Order status updated successfully: ${updatedOrder}`);
            res.status(200).json({ message: "Order status updated successfully" });

        }
        else
            res.status(400).json({ message: "Order status updated unsuccessfully" });

    } catch (err) {
        console.error("Error changing order status:", err);
        return res.status(500).json({
            success: false,
            message: "Error changing order status",
        });
    }
};


export const getAllOrder = async (req, res) => {
    try {
        const user = req.user;

        // Find orders
        const orders = await User.findById(user.id)
            .populate({
                path: "orders",
                options: { sort: { orderDate: -1 } } // Sorting by orderDate in descending order
            });

        if (!orders) {
            return res.status(404).json({
                success: false,
                message: "Your orders not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Successfully fetched all orders",
            data: orders.orders,
        });
    } catch (err) {
        console.log("Error fetching orders:", err);
        return res.status(500).json({
            success: false,
            message: "Error fetching orders",
        });
    }
};

export const findAllorderForuser = async (req, res) => {
    try {
        const userId = req.user.id;
        // Step 1: Find the restaurantId associated with the user
        const RestaurantOwner = await User.findById(userId).populate("restaurantId")
        console.log("rid", RestaurantOwner)
        const RestaurantId = RestaurantOwner.restaurantId;
        const orders = await Order.find({

        }).populate({
            path: "SubsectionOrder",
            populate: { path: 'item', match: { 'restaurantId': RestaurantId } }
        });


        const orders1 = await Order.find({
            'SubsectionOrder': "65d1d350b2ed76912923df82"
        }).populate({ path: "SubsectionOrder", populate: { path: 'item', populate: { path: 'restaurantId' } } });
        console.log("jnjdndjndjndjndjdnjdnjndjndjdnjdnjdndjndjndjdnjdnjd ", orders)


        return res.json(orders);
    } catch (error) {
        console.error('Error finding orders:', error);
        throw error; // You might want to handle this error more gracefully
    }
}



export const getHistory = async (req, res) => {
    try {
        const userId = req.user.id;
        const history=await User.findById(userId).populate({path:"orders",populate:{path:"SubsectionOrder",populate:{path:"item"}}})
        return res.json(history)
    } catch (error) {
        console.error('Error finding orders:', error);
        throw error; // You might want to handle this error more gracefully
    }
}