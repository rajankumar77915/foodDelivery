import Item from '../models/Item.js'; 
import Category from '../models/Category.js';
import { uploadImageCloudinary } from '../utils/uploadImageCloudinary.js';
import RatingReview from '../models/ratingReview.js';
import Restaurant from '../models/Restaurant.js';

// Create a new item
export const createItem = async (req, res) => {
    //get all data
    const {
        itemName,
        description,
        price,
        tax,
        category_id,
        isVeg,
        quantity,
    } = req.body;

    //find category
    const category = await Category.findById(category_id)
    if(!category){
        return res.status(404).json({
            succes:false,
            message:"category not found"
        })
    }
    // upload image to cloudinary
    const image=req.files.image;
    const filelImage = await uploadImageCloudinary(
        image,
        process.env.FOLDER_NAME
    );
    
    //create Iteam/dish
    try {
        const newItem = new Item({
            itemName,
            description,
            price,
            tax,
            image:filelImage.secure_url,
            category:category_id,
            isVeg,
            quantity,
        });

     

        const savedItem = await newItem.save();

        if (!savedItem) {
            return res.status(404).json({
                success: false,
                message: "Item not created",
            });
        }
        
        //add that item in restaurant
        const userRestrunt  = await Restaurant.findById(req.user.restaurantId);
        userRestrunt.menu.push(savedItem._id);
        await userRestrunt.save();
        return res.status(200).json({
            data: savedItem,
            success: true,
            message: "Successfully created item",
        });
    } catch (error) {
        console.error("Error creating item:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

// Get all items
export const getAllItems = async (req, res) => {
    try {
        const items = await Item.find();
        return res.status(200).json({
            data: items,
            success: true,
            message: "Successfully retrieved items",
        });
    } catch (error) {
        console.error("Error getting items:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

// Get item by ID
export const getItemById = async (req, res) => {
    const itemId = req.params.id;

    try {
        const item = await Item.findById(itemId);

        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Item not found",
            });
        }

        
        //now send type type of items
        const relatedData=await Item.find({category:item.category})
        const filteredData = relatedData.filter(item1 => item1.id !== item.id);

        return res.status(200).json({
            data: item,
            relatedData:filteredData,
            success: true,
            message: "Successfully retrieved item",
        });
    } catch (error) {
        console.error("Error getting item by ID:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

// Update item by ID
export const updateItemById = async (req, res) => {
    const itemId = req.params.id;
    const updatedItemData = req.body;

    try {
        const updatedItem = await Item.findByIdAndUpdate(itemId, updatedItemData, { new: true });

        if (!updatedItem) {
            return res.status(404).json({
                success: false,
                message: "Item not found",
            });
        }

        return res.status(200).json({
            data: updatedItem,
            success: true,
            message: "Successfully updated item",
        });
    } catch (error) {
        console.error("Error updating item by ID:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

// Delete item by ID
export const deleteItemById = async (req, res) => {
    const itemId = req.params.id;

    try {
        const deletedItem = await Item.findByIdAndDelete(itemId);

        if (!deletedItem) {
            return res.status(404).json({
                success: false,
                message: "Item not found",
            });
        }

        return res.status(200).json({
            data: deletedItem,
            success: true,
            message: "Successfully deleted item",
        });
    } catch (error) {
        console.error("Error deleting item by ID:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

// Add rating and review to an item
export const addItemRatingReview = async (req, res) => {
    const itemId = req.params.id;
    const { rating, review } = req.body;
    const user_id = req.user.id

    
    if(!itemId){
        return res.status(404).json({
            succes:false,
            message:"iteam id not found"
        })
    }
    try {
        const item = await Item.findById(itemId);

        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Item not found",
            });
        }
        //if already  reating and review done then not againg able to submit
        const ratingAndReview= await RatingReview.findOne({user:user_id})
        if(ratingAndReview){
            ratingAndReview.user=null;
            return res.status(409).json({
                success:false,
                message:"you have already ",
                data:ratingAndReview
            })
        }
        //  rating review object create
        const newRatingReview = new RatingReview({
            user: user_id,
            rating,
            review,
        });
        //store in db
        await newRatingReview.save();
        //store rating review object id in item model
        item.ratingsAndReviews.push(newRatingReview._id);
        //save in dataBase
        await item.save();

        return res.status(200).json({
            data: item,
            success: true,
            message: "Rating and review added to the item",
        });
    } catch (error) {
        console.error("Error adding rating and review to the item:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const getItemRatingReview = async (req, res) => {
    const itemId = req.params.id;
    try {
        const item = await Item.findById(itemId).populate("ratingsAndReviews");
        if(!item){
            return res.status(404).json({
                success:false,
                message:"item not found"
            })
        }
        return res.status(200).json({
            data: item.ratingsAndReviews,
            success: true,
            message: "Successfully retrieved rating and review for the item",
        });
    } catch (error) {
        console.error("Error getting rating and review for the item:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
